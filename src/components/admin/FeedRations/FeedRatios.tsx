import { useCallback, useEffect, useMemo, useState } from "react";

import { AnimalSelectionModal } from "./AnimalSelectionModal";
import { ColumnConfigModal } from "./ColumnConfigModal";
import { HistoryPanel } from "./HistoryPanel";
import { SaveFormulationModal } from "./SaveFormulationModal";
import { Formulation, Ingredient, IngredientSuggestion, OptimizationResult, RatioIngredient, TargetNutrient } from "@/types";
import { getIngredients } from "@/data/ingredients";
import { getNutrients } from "@/data/nutrients";
import { IngredientAnalyser } from "@/services/coordinate-decent";
import { RatioOptimizer } from "@/services/simplex";
import { Animal, AnimalProgram, AnimalProgramStage, AnimalNutrientRequirement } from "@/types/animals";
import { Result } from "glpk.js";
import { AnalysisResults } from "./AnalysisResults";
import { BatchCalculation } from "./BatchCalculation";
import { FeedRatiosHeader } from "./FeedRatiosHeader";
import { IngredientSelectionModal } from "./IngredientSelectionModal";
import { IngredientsPanel } from "./IngredientsPanel";
import { OptimizationResults } from "./OptimizationResults";
import { SuggestedIngredients } from "./SuggestedIngredients";
import { TargetSelectionModal } from "./TargetSelectionModal";
import { TargetsPanel } from "./TargetsPanel";

export type PanelView = 'targets' | 'results';

export const FeedRatios = () => {
  // State management
  const [ingredients, setIngredients] = useState<RatioIngredient[]>([]);
  const [showIngredientModal, setShowIngredientModal] = useState(false);
  const [showTargetModal, setShowTargetModal] = useState(false);
  const [showLeftPanel, setShowLeftPanel] = useState<PanelView>('targets');
  const [optimizing, setOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<Result | null>(null);
  const [analysing, setAnalysing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<OptimizationResult | null>(null);
  const [suggestedIngredients, setSuggestedIngredients] = useState<IngredientSuggestion[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [showColumnConfig, setShowColumnConfig] = useState(false);
  const [showMetTargets, setShowMetTargets] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [savedFormulations, setSavedFormulations] = useState<Formulation[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showAnimalModal, setShowAnimalModal] = useState(false);

  // Data from API
  const allIngredients = useMemo(() => getIngredients(), []);
  const allNutrients = useMemo(() => getNutrients(), []);

  // Initialize targets
  const initialTargets = useMemo(() => {
    const nutrientTargets = [
      { name: 'Crude protein' as const, value: 18 },
      { name: 'Crude fat' as const, value: 5 },
      { name: 'Crude fibre' as const, value: 8 },
    ];

    return nutrientTargets.map(({ name, value }) => {
      const nutrient = allNutrients.find(n => n.name === name);
      return nutrient ? { ...nutrient, value } : null;
    }).filter(Boolean) as TargetNutrient[];
  }, [allNutrients]);

  const [targets, setTargets] = useState<TargetNutrient[]>(initialTargets);

  // Initialize visible columns
  useEffect(() => {
    setVisibleColumns(targets.map(t => t.id));
  }, [targets]);

  // Load/save formulations
  useEffect(() => {
    const saved = localStorage.getItem('savedFormulations');
    if (saved) setSavedFormulations(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('savedFormulations', JSON.stringify(savedFormulations));
  }, [savedFormulations]);

  // Helper functions
  const addIngredient = useCallback((ing: Ingredient) => {
    setIngredients(curr => [...curr, { ...ing, ratio: 1 }]);
    setShowIngredientModal(false);
  }, []);

  const removeIngredient = useCallback((id: string) => {
    setIngredients(curr => curr.filter(i => i.id !== id));
  }, []);

  const handleRatioChange = useCallback((id: string, val: string) => {
    const n = Math.max(0, parseFloat(val) || 0);
    setIngredients(curr => curr.map(i => (i.id === id ? { ...i, ratio: n } : i)));
  }, []);

  const totalRatio = useMemo(() => ingredients.reduce((sum, i) => sum + i.ratio, 0), [ingredients]);
  const totalPercentage = useMemo(() => ingredients.reduce((sum, i) => sum + (i.ratio / totalRatio * 100), 0), [ingredients, totalRatio]);

  const computedValues = useMemo(() => {
    const res: Record<string, number> = {};
    ingredients.forEach(i => {
      const frac = i.ratio / (totalRatio || 1);
      i.compositions.forEach(c => {
        const nm = c.nutrient?.name || '';
        res[nm] = (res[nm] || 0) + c.value * frac;
      });
    });
    return res;
  }, [ingredients, totalRatio]);

  const addTargets = useCallback((newTargets: TargetNutrient[]) => {
    const updatedTargets = [...targets];
    newTargets.forEach(newTarget => {
      if (!updatedTargets.some(t => t.id === newTarget.id)) {
        updatedTargets.push(newTarget);
      }
    });
    setTargets(updatedTargets);
    setShowTargetModal(false);
  }, [targets]);

  const removeTarget = useCallback((id: string) => {
    setTargets(curr => curr.filter(t => t.id !== id));
  }, []);

  const updateTarget = useCallback((id: string, v: number) => {
    setTargets(curr => curr.map(t => (t.id === id ? { ...t, value: v } : t)));
  }, []);

  // Formulation management
  const saveFormulation = (name: string) => {
    const newSaved: Formulation = {
      id: Date.now().toString(),
      name,
      date: new Date().toLocaleDateString(),
      ingredients: [...ingredients],
      targets: [...targets]
    };
    setSavedFormulations(prev => [...prev, newSaved]);
  };

  const loadFormulation = (formulation: Formulation) => {
    setIngredients(formulation.ingredients);
    setTargets(formulation.targets);
    setShowHistory(false);
  };

  const deleteFormulation = (id: string) => {
    setSavedFormulations(prev => prev.filter(f => f.id !== id));
  };

  // Analysis and optimization
  const analyzeRatios = useCallback(async () => {
    if (ingredients.length === 0) return;
    setAnalysisResult(null);
    setAnalysing(true);
    
    try {
      const ratioAnalyzer = await IngredientAnalyser.getInstance();
      const result = await ratioAnalyzer.analyze(ingredients, targets);
      setAnalysisResult(result);
    } finally {
      setAnalysing(false);
    }
  }, [ingredients, targets]);

  const optimizeRatios = useCallback(async () => {
    if (ingredients.length === 0 || targets.length === 0) return;
    setOptimizationResult(null);
    setSuggestedIngredients([]);
    setOptimizing(true);
    
    try {
      const ratioOptimizer = await RatioOptimizer.getInstance();
      const result = await ratioOptimizer.optimize(ingredients, targets);
      
      if (result.success && result.updatedIngredients) {
        setIngredients(result.updatedIngredients);
      } else if (result.suggestions) {
        setSuggestedIngredients(result.suggestions.slice(0, 3));
      }
      
      setOptimizationResult(result.rawResult || null);
    } finally {
      setOptimizing(false);
    }
  }, [ingredients, targets]);

  // Filtered targets
  const metTargets = useMemo(() => targets.filter(target => {
    const value = computedValues[target.name] || 0;
    return value > target.value * 0.95;
  }), [targets, computedValues]);

  const unmetTargets = useMemo(() => targets.filter(target => {
    const value = computedValues[target.name] || 0;
    return value < target.value * 0.95;
  }), [targets, computedValues]);

  // Handle animal selection
  const handleAnimalSelection = (animal: Animal | null, program: AnimalProgram | null, stage: AnimalProgramStage | null) => {
    if (animal && program && stage) {
      setTargets(stage.requirements.map((req: AnimalNutrientRequirement) => ({
        id: req.nutrientId,
        name: req.nutrient?.name || '',
        value: req.value,
        unit: req.nutrient?.unit || '',
        description: req.nutrient?.description || '',
      })));
    }
  };

  return (
    <div className="space-y-6">
      <FeedRatiosHeader 
        onShowHistory={() => setShowHistory(true)}
        onOptimize={optimizeRatios}
        onAnalyze={analyzeRatios}
        optimizing={optimizing}
        analysing={analysing}
      />
      
      <div className="flex flex-col lg:flex-row gap-6 justify-between">
        <TargetsPanel
          targets={targets}
          showLeftPanel={showLeftPanel}
          setShowLeftPanel={setShowLeftPanel}
          showMetTargets={showMetTargets}
          setShowMetTargets={setShowMetTargets}
          metTargets={metTargets}
          unmetTargets={unmetTargets}
          computedValues={computedValues}
          updateTarget={updateTarget}
          removeTarget={removeTarget}
          onOpenAnimalModal={() => setShowAnimalModal(true)}
          onOpenTargetModal={() => setShowTargetModal(true)}
        />
        
        <IngredientsPanel
          ingredients={ingredients}
          targets={targets}
          visibleColumns={visibleColumns}
          totalPercentage={totalPercentage}
          totalRatio={totalRatio}
          handleRatioChange={handleRatioChange}
          removeIngredient={removeIngredient}
          computedValues={computedValues}
          onOpenSaveModal={() => setShowSaveModal(true)}
          onOpenColumnConfig={() => setShowColumnConfig(true)}
          onOpenIngredientModal={() => setShowIngredientModal(true)}
        />
      </div>
      
      {suggestedIngredients.length > 0 && (
        <SuggestedIngredients 
          suggestions={suggestedIngredients}
          ingredients={ingredients}
          addIngredient={addIngredient}
        />
      )}
      
      {ingredients.length > 0 && (
        <BatchCalculation 
          ingredients={ingredients}
          totalRatio={totalRatio}
        />
      )}
      
      {optimizationResult && <OptimizationResults result={optimizationResult} />}
      {analysisResult && <AnalysisResults result={analysisResult} />}

      {/* Modals */}
      <AnimalSelectionModal
        isOpen={showAnimalModal}
        onClose={() => setShowAnimalModal(false)}
        onSelect={handleAnimalSelection}
      />
      
      <ColumnConfigModal
        isOpen={showColumnConfig}
        onClose={() => setShowColumnConfig(false)}
        allTargets={targets}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
      />
      
      <HistoryPanel
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        formulations={savedFormulations}
        onLoad={loadFormulation}
        onDelete={deleteFormulation}
      />
      
      <SaveFormulationModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={saveFormulation}
      />
      
      <IngredientSelectionModal
        isOpen={showIngredientModal}
        onClose={() => setShowIngredientModal(false)}
        allIngredients={allIngredients}
        ingredients={ingredients}
        targets={targets}
        addIngredient={addIngredient}
      />
      
      <TargetSelectionModal
        isOpen={showTargetModal}
        onClose={() => setShowTargetModal(false)}
        allNutrients={allNutrients}
        targets={targets}
        addTargets={addTargets}
      />
    </div>
  );
};
