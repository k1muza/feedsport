import { useCallback, useEffect, useMemo, useState } from "react";

import { getIngredients } from "@/data/ingredients";
import { getNutrients } from "@/data/nutrients";
import { IngredientAnalyser } from "@/services/coordinate-decent";
import { RatioOptimizer } from "@/services/simplex";
import { Formulation, Ingredient, IngredientSuggestion, RatioIngredient, TargetNutrient } from "@/types";
import { Animal, AnimalNutrientRequirement, AnimalProgram, AnimalProgramStage } from "@/types/animals";
import { AnimalSelectionModal } from "./AnimalSelectionModal";
import { BatchCalculation } from "./BatchCalculation";
import { ColumnConfigModal } from "./ColumnConfigModal";
import { FeedRatiosHeader } from "./FeedRatiosHeader";
import { HistoryPanel } from "./HistoryPanel";
import { IngredientSelectionModal } from "./IngredientSelectionModal";
import { IngredientsPanel } from "./IngredientsPanel";
import { SaveFormulationModal } from "./SaveFormulationModal";
import { SuggestedIngredients } from "./SuggestedIngredients";
import { TargetSelectionModal } from "./TargetSelectionModal";
import { TargetsPanel } from "./TargetsPanel";
import { ContributionChart } from "./ContributionChart";

export type PanelView = 'targets' | 'results';

const TOLERANCE = 0.02;

export const FeedRatios = () => {
  // State management
  const [ingredients, setIngredients] = useState<RatioIngredient[]>([]);
  const [showIngredientModal, setShowIngredientModal] = useState(false);
  const [showTargetModal, setShowTargetModal] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [analysing, setAnalysing] = useState(false);
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
      return nutrient ? { ...nutrient, target: value } : null;
    }).filter(Boolean) as TargetNutrient[];
  }, [allNutrients]);

  const [targets, setTargets] = useState<TargetNutrient[]>(initialTargets);

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

  const handleCostChange = useCallback((id: string, val: string) => {
    const n = Math.max(0, parseFloat(val) || 0);
    setIngredients(curr => curr.map(i => (i.id === id ? { ...i, costPerKg: n } : i)));
  }, []);

  const handleMinChange = (id: string, val: string) => {
    const n = val === '' ? undefined : Math.max(0, parseFloat(val));
    setIngredients(curr =>
      curr.map(i => i.id === id ? { ...i, min: n } : i)
    );
  };

  const handleMaxChange = (id: string, val: string) => {
    const n = val === '' ? undefined : Math.max(0, parseFloat(val));
    setIngredients(curr =>
      curr.map(i => i.id === id ? { ...i, max: n } : i)
    );
  };

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

  const updateTarget = useCallback((
    id: string,
    field: 'max' | 'target' | 'underPenaltyFactor' | 'overPenaltyFactor',
    v: number
  ) => {
    setTargets(curr => curr.map(t =>
      t.id === id ? { ...t, [field]: v } : t
    ));
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

  // Update analyzeRatios to always update ratios
  const analyzeRatios = useCallback(async () => {
    if (ingredients.length === 0) return;
    setSuggestedIngredients([]);
    setAnalysing(true);

    try {
      const result = IngredientAnalyser.analyze(ingredients, targets);
      // Always update ratios if we have updated ingredients
      if (result.updatedIngredients) {
        // Scale ratios to match original total
        const originalTotal = ingredients.reduce((sum, i) => sum + i.ratio, 0);
        const updatedTotal = result.updatedIngredients.reduce((sum, i) => sum + i.ratio, 0);
        const scalingFactor = originalTotal / updatedTotal;

        const scaledIngredients = result.updatedIngredients.map(i => ({
          ...i,
          ratio: i.ratio * scalingFactor
        }));

        setIngredients(scaledIngredients);
      }

      // Always show suggestions if available
      if (result.suggestions) {
        setSuggestedIngredients(result.suggestions);
      }
    } finally {
      setAnalysing(false);
    }
  }, [ingredients, targets]);


  const optimizeRatios = useCallback(async () => {
    if (ingredients.length === 0 || targets.length === 0) return;
    setSuggestedIngredients([]);
    setOptimizing(true);

    try {
      const ratioOptimizer = await RatioOptimizer.getInstance();
      const result = await ratioOptimizer.optimize(ingredients, targets);

      if (result.success && result.updatedIngredients) {
        setIngredients(result.updatedIngredients);
      }

      // Set suggestions based on unmet targets
      if (result.unmetTargets && result.unmetTargets.length > 0) {
        const suggestions = result.unmetTargets.map(target => ({
          nutrient: target,
          target: target.target,
          current: target.actual,
        }));
        setSuggestedIngredients(suggestions);
      } else {
        setSuggestedIngredients([]);
      }
    } finally {
      setOptimizing(false);
    }
  }, [ingredients, targets]);

  // Filtered targets
  const metTargets = useMemo(() => targets.filter(target => {
    const value = computedValues[target.name] || 0;
    const upper_bound = target.max ? target.max * (1 + TOLERANCE) : Infinity;
    const lower_bound = target.target * (1 - TOLERANCE)

    return value < upper_bound && value > lower_bound;
  }), [targets, computedValues]);

  const unmetTargets = useMemo(() => targets.filter(target => {
    const value = computedValues[target.name] || 0;
    const upper_bound = target.max ? target.max * (1 + TOLERANCE) : Infinity;
    const lower_bound = target.target * (1 - TOLERANCE)

    return value > upper_bound || value < lower_bound;
  }), [targets, computedValues]);

  // Handle animal selection
  const handleAnimalSelection = (animal: Animal | null, program: AnimalProgram | null, stage: AnimalProgramStage | null) => {
    if (animal && program && stage) {
      const newTargets = stage.requirements
        .filter((req: AnimalNutrientRequirement) => !!req.nutrient) // Filter out missing nutrients
        .map((req: AnimalNutrientRequirement) => ({
          id: req.nutrientId,
          name: req.nutrient?.name || '',
          target: req.min || req.value,
          max: req.max,
          unit: req.nutrient?.unit || '',
          description: req.nutrient?.description || '',
        }))
      setTargets(newTargets);
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
        <div className="w-full lg:w-96">
          <TargetsPanel
            targets={targets}
            showMetTargets={showMetTargets}
            setShowMetTargets={setShowMetTargets}
            metTargets={metTargets}
            unmetTargets={unmetTargets}
            computedValues={computedValues}
            updateTarget={(id: string, field: "max" | "target" | "underPenaltyFactor" | "overPenaltyFactor", value: number) => updateTarget(id, field, value)}
            removeTarget={removeTarget}
            onOpenAnimalModal={() => setShowAnimalModal(true)}
            onOpenTargetModal={() => setShowTargetModal(true)}
          />
        </div>

        <div className="flex-1">
          <IngredientsPanel
            ingredients={ingredients}
            targets={targets}
            visibleColumns={visibleColumns}
            totalPercentage={totalPercentage}
            totalRatio={totalRatio}
            handleRatioChange={handleRatioChange}
            handleCostChange={handleCostChange}
            handleMinChange={handleMinChange}
            handleMaxChange={handleMaxChange}
            removeIngredient={removeIngredient}
            onOpenSaveModal={() => setShowSaveModal(true)}
            onOpenColumnConfig={() => setShowColumnConfig(true)}
            onOpenIngredientModal={() => setShowIngredientModal(true)}
          />

          {suggestedIngredients.length > 0 && (
            <SuggestedIngredients
              suggestions={suggestedIngredients}
              allIngredients={allIngredients}
              ingredients={ingredients} // Pass current ingredients
              addIngredient={addIngredient}
            />
          )}

          {ingredients.length > 0 && targets.length > 0 && (
            <ContributionChart
              ingredients={ingredients}
              computedValues={computedValues}
              totalRatio={totalRatio}
              targets={targets}
            />
          )}

          {ingredients.length > 0 && (
            <BatchCalculation
              ingredients={ingredients}
              totalRatio={totalRatio}
            />
          )}
        </div>
      </div>

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
        visibleColumns={visibleColumns}
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
