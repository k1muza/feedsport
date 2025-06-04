import { showErrorToast } from "@/components/common/ErrorToast";
import { showSuccessToast } from "@/components/common/SuccessToast";
import { getIngredients } from "@/data/ingredients";
import { getNutrients } from "@/data/nutrients";
import { IngredientAnalyser } from "@/services/coordinate-decent";
import { RatioOptimizer } from "@/services/simplex";
import { Formulation, Ingredient, IngredientSuggestion, OptimizationResult, RatioIngredient, TargetNutrient } from "@/types";
import { Animal, AnimalNutrientRequirement, AnimalProgram, AnimalProgramStage } from "@/types/animals";
import { Result } from "glpk.js";
import { AlertTriangle, Calculator, Edit3, Eye, History, Lightbulb, Plus, PlusCircle, Rabbit, Save, Search, Settings, Wand, X, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimalSelectionModal } from "./AnimalSelectionModal";
import { ColumnConfigModal } from "./ColumnConfigModal";
import { HistoryPanel } from "./HistoryPanel";
import { ResultItem } from "./ResultItem";
import { SaveFormulationModal } from "./SaveFormulationModal";
import { TargetItem } from "./TargetItem";

type PanelView = 'targets' | 'results';


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

  // Convenience helpers – avoids creating a new fn on every render
  const openAnimalModal = useCallback(() => setShowAnimalModal(true), []);
  const closeAnimalModal = useCallback(() => setShowAnimalModal(false), []);

  // Initialize targets
  const initialTargets = useMemo(() => {
  // Define nutrient targets with their default values
  const nutrientTargets = [
    { name: 'Crude protein' as const, value: 18 },
    { name: 'Crude fat' as const, value: 5 },
    { name: 'Crude fibre' as const, value: 8 },
  ];

  return nutrientTargets.map(({ name, value }) => {
    // Find nutrient by name
    const nutrient = allNutrients.find(n => n.name === name);
    if (!nutrient) {
      // Handle missing nutrient (adjust based on your needs)
      console.error(`Nutrient "${name}" not found in allNutrients`);
      return null;
    }
    // Merge into TargetNutrient
    return { ...nutrient, value };
  }).filter(Boolean) as TargetNutrient[]; // Filter out nulls and assert type
}, [allNutrients]);

  const [targets, setTargets] = useState<TargetNutrient[]>(initialTargets);

  // Initialize visible columns
  useEffect(() => {
    setVisibleColumns(targets.map(t => t.id));
  }, [targets]);

  // Load saved formulations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedFormulations');
    if (saved) {
      try {
        setSavedFormulations(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved formulations', e);
      }
    }
  }, []);

  // Save formulations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('savedFormulations', JSON.stringify(savedFormulations));
  }, [savedFormulations]);

  // Helper functions
  const addIngredient = useCallback(
    (ing: Ingredient) => {
      setIngredients(curr => [...curr, { ...ing, ratio: 1 }]);
      setShowIngredientModal(false);
    },
    []
  );

  const removeIngredient = useCallback(
    (id: string) => {
      setIngredients(curr => curr.filter(i => i.id !== id));
    },
    []
  );

  const handleRatioChange = useCallback(
    (id: string, val: string) => {
      const n = Math.max(0, parseFloat(val) || 0);
      setIngredients(curr => curr.map(i => (i.id === id ? { ...i, ratio: n } : i)));
    },
    []
  );

  const totalRatio = useMemo(() =>
    ingredients.reduce((sum, i) => sum + i.ratio, 0),
    [ingredients]
  );

  const totalPercentage = useMemo(() =>
    ingredients.reduce((sum, i) => sum + (i.ratio / totalRatio * 100), 0),
    [ingredients, totalRatio]
  );

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

  const addTargets = useCallback(
    (newTargets: TargetNutrient[]) => {
      const updatedTargets = [...targets];
      newTargets.forEach(newTarget => {
        if (!updatedTargets.some(t => t.id === newTarget.id)) {
          updatedTargets.push(newTarget);
        }
      });
      setTargets(updatedTargets);
      setShowTargetModal(false);
    },
    [targets]
  );

  const removeTarget = useCallback(
    (id: string) => {
      setTargets(curr => curr.filter(t => t.id !== id));
    },
    []
  );

  const updateTarget = useCallback(
    (id: string, v: number) => {
      setTargets(curr => curr.map(t => (t.id === id ? { ...t, value: v } : t)));
    },
    []
  );

  // Save current formulation
  const saveFormulation = (name: string) => {
    const newSaved: Formulation = {
      id: Date.now().toString(),
      name: name,
      date: new Date().toLocaleDateString(),
      ingredients: ingredients.map(i => ({ ...i })),
      targets: targets.map(t => ({ ...t }))
    };

    const updated = [...savedFormulations, newSaved];
    setSavedFormulations(updated);
    showSuccessToast({ message: 'Formulation saved!' });
  };

  // Load saved formulation
  const loadFormulation = (formulation: Formulation) => {
    setIngredients(formulation.ingredients);
    setTargets(formulation.targets);
    setShowHistory(false);
    showSuccessToast({ message: `Loaded: ${formulation.name}` });
  };

  // Delete saved formulation
  const deleteFormulation = (id: string) => {
    const updated = savedFormulations.filter(f => f.id !== id);
    setSavedFormulations(updated);
    showSuccessToast({ message: 'Formulation deleted' });
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
        showSuccessToast({ message: 'Ratios optimized!' });
      } else if (result.suggestions) {
        setSuggestedIngredients(result.suggestions.slice(0, 3));
      }

      if (!result.success) {
        showErrorToast({ message: 'Failed to optimize ratios' });
      }

      setOptimizationResult(result.rawResult || null);
    } finally {
      setOptimizing(false);
    }
  }, [ingredients, targets]);

  // Filtered targets for results view
  const metTargets = useMemo(() => {
    return targets.filter(target => {
      const value = computedValues[target.name] || 0;
      return value > target.value * 0.95;
    });
  }, [targets, computedValues]);

  const unmetTargets = useMemo(() => {
    return targets.filter(target => {
      const value = computedValues[target.name] || 0;
      return value < target.value * 0.95;
    });
  }, [targets, computedValues]);

  // Handle animal selection
  const handleAnimalSelection = (animal: Animal | null, program: AnimalProgram | null, stage: AnimalProgramStage | null) => {
    if (animal && program && stage) {
      setTargets(stage.requirements.map((req: AnimalNutrientRequirement) => (
        {
          id: req.nutrientId,
          name: req.nutrient?.name || '',
          value: req.value,
          unit: req.nutrient?.unit || '',
          description: req.nutrient?.description || '',
        }
      )));
    }
  };


  // ============ Render ============
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Calculator className="w-6 h-6 text-indigo-400" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Feed Ratio Calculator
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowHistory(true)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center space-x-2"
          >
            <History className="w-4 h-4" />
            <span>Formulations</span>
          </button>
          
          <button
            onClick={optimizeRatios}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg flex items-center space-x-2"
          >
            <Wand className="w-4 h-4" />
            <span>{optimizing ? 'Optimizing...' : 'Optimize'}</span>
          </button>
          <button
            onClick={analyzeRatios}
            className="px-4 py-2 bg-purple-600 hover:bg-magenta-500 text-white rounded-lg flex items-center space-x-2"
          >
            <ZoomIn className="w-4 h-4" />
            <span>{analysing ? 'Analyzing...' : 'Analyze'}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 justify-between">
        {/* Left Panel - Targets/Results */}
        <div className="w-full lg:w-96">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-100">Nutrient Targets</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={openAnimalModal}
                  className="p-2 text-white hover:bg-gray-700 rounded-md"
                  title="Select animal program"
                  type="button"
                >
                  <Rabbit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowLeftPanel('targets')}
                  className={`p-2 rounded-md ${showLeftPanel === 'targets' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                >
                  <Edit3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowLeftPanel('results')}
                  className={`p-2 rounded-md ${showLeftPanel === 'results' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowTargetModal(true)}
                  className="p-2 text-gray-400 hover:bg-gray-700 rounded-md"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {showLeftPanel === 'targets' ? (
                targets.map(target => (
                  <TargetItem
                    key={target.id}
                    target={target}
                    onUpdate={(v) => updateTarget(target.id, v)}
                    onRemove={() => removeTarget(target.id)}
                  />
                ))
              ) : (
                (showMetTargets ? targets : unmetTargets).map(target => (
                  <ResultItem
                    key={target.id}
                    target={target}
                    value={computedValues[target.name] || 0}
                  />
                ))
              )}
              {showLeftPanel === 'results' && (
                <div className="flex justify-between">
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="checkbox"
                      id="showMetTargets"
                      checked={showMetTargets}
                      onChange={(e) => setShowMetTargets(e.target.checked)}
                      className="form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="showMetTargets" className="text-sm text-gray-400">
                      Show met targets
                    </label>
                  </div>
                  <div className="flex">
                    <p className='text-sm text-gray-400'>{metTargets.length} met targes</p>
                  </div>
                </div>

              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Ingredients */}
        <div className="flex-1">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Ingredient Composition</h3>
              <div className="flex items-center gap-2">
                {totalPercentage !== 100 && (
                  <div className="flex items-center text-yellow-400 text-sm mr-2">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    <span>Total: {totalPercentage.toFixed(1)}%</span>
                  </div>
                )}
                <button
                  onClick={() => setShowSaveModal(true)}
                  className="p-2 text-gray-400 hover:bg-gray-700 rounded-md"
                  title="Save formulation"
                >
                  <Save className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowColumnConfig(true)}
                  className="p-2 text-gray-400 hover:bg-gray-700 rounded-md"
                >
                  <Settings className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowIngredientModal(true)}
                  className="p-2 text-gray-400 hover:bg-gray-700 rounded-md"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {ingredients.length === 0 ? (
              <div className="text-center py-8 text-gray-400">No ingredients added yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Ingredient</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Ratio</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">%</th>
                      {targets
                        .filter(t => visibleColumns.includes(t.id))
                        .map(t => (
                          <th key={t.id} className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            {t.name}
                          </th>
                        ))}
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {ingredients.map(ingredient => {
                      const pct = totalRatio ? (ingredient.ratio / totalRatio) * 100 : 0;
                      return (
                        <tr key={ingredient.id} className="hover:bg-gray-700/50">
                          <td className="px-4 py-3 text-gray-200">{ingredient.name}</td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              min={0}
                              value={ingredient.ratio}
                              onChange={e => handleRatioChange(ingredient.id, e.target.value)}
                              className="w-20 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-gray-200"
                            />
                          </td>
                          <td className="px-4 py-3 text-gray-200">{pct.toFixed(1)}%</td>
                          {targets
                            .filter(t => visibleColumns.includes(t.id))
                            .map(target => {
                              const comp = ingredient.compositions.find(c => c.nutrient?.name === target.name)?.value || 0;
                              return (
                                <td key={`${ingredient.id}-${target.id}`} className="px-4 py-3 text-gray-400">
                                  {((comp * pct) / 100).toFixed(2)}%
                                </td>
                              );
                            })}
                          <td className="px-4 py-3">
                            <button onClick={() => removeIngredient(ingredient.id)} className="text-red-400 hover:text-red-300">
                              <X className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Suggested Ingredients */}
      {suggestedIngredients.length > 0 && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-yellow-400" />
            <h3 className="text-lg font-medium">Suggested Ingredients</h3>
          </div>

          <div className="space-y-4">
            {suggestedIngredients
              .filter(s => !ingredients.some(i => i.id === s.ingredient?.id))
              .map((suggestion, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-100">{suggestion.ingredient?.name}</h4>
                    </div>
                    <button
                      onClick={() => suggestion.ingredient && addIngredient(suggestion.ingredient)}
                      className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium transition-colors"
                    >
                      <PlusCircle className="h-4 w-4" />
                      Add
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Batch Calculation */}
      {ingredients.length > 0 && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-medium mb-4">Batch Calculation (1000kg)</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ingredients.map(ingredient => {
              const pct = totalRatio ? (ingredient.ratio / totalRatio) * 100 : 0;
              return (
                <div key={ingredient.id} className="bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-sm text-gray-400">{ingredient.name}</p>
                  <p className="text-lg font-medium">
                    {((pct / 100) * 1000).toFixed(0)}kg
                    <span className="text-sm text-gray-400 ml-1">({pct.toFixed(1)}%)</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Optimization Results */}
      {optimizationResult && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-medium mb-4">Optimization Results</h3>
          <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm text-gray-100 overflow-x-auto">
            <pre>{JSON.stringify(optimizationResult, null, 2)}</pre>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {analysisResult && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-medium mb-4">Analysis Results</h3>
          <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm text-gray-100 overflow-x-auto">
            <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
          </div>
        </div>
      )}

      {/* Column Configuration Modal */}
      <ColumnConfigModal
        isOpen={showColumnConfig}
        onClose={() => setShowColumnConfig(false)}
        allTargets={targets}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
      />

      {/* History Panel */}
      <HistoryPanel
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        formulations={savedFormulations}
        onLoad={loadFormulation}
        onDelete={deleteFormulation}
      />

      {/* Save Formulation Modal */}
      <SaveFormulationModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={saveFormulation}
      />

      {/* Animal Selection Modal */}
      <AnimalSelectionModal
        isOpen={showAnimalModal}
        onClose={closeAnimalModal}
        onSelect={handleAnimalSelection}
      />

      {/* Ingredient Modal */}
      {showIngredientModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-4xl max-h-[80vh] flex flex-col">
            <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-100">Select Ingredients</h3>
                <button onClick={() => setShowIngredientModal(false)} className="text-gray-400 hover:text-gray-200 p-1">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filter ingredients..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-900 rounded-lg text-gray-200 focus:ring-2 focus:ring-indigo-500 border border-gray-700"
                />
              </div>

              <div className="grid grid-cols-12 gap-4 mt-2 items-center">
                <div className="col-span-4 flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-400">Ingredient</span>
                </div>
                {targets.map(target => (
                  <div
                    key={target.id}
                    className="col-span-2 flex items-center justify-end space-x-1 cursor-pointer hover:bg-gray-700/30 p-1 rounded"
                  >
                    <span className="text-sm font-medium text-gray-400">
                      {target.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-y-auto flex-1 p-1">
              <div className="space-y-1">
                {allIngredients
                  .filter(ing => !ingredients.some(i => i.id === ing.id))
                  .map(ingredient => (
                    <div
                      key={ingredient.id}
                      className="grid grid-cols-12 gap-4 items-center p-3 rounded-lg hover:bg-gray-700/30 cursor-pointer"
                      onClick={() => addIngredient(ingredient)}
                    >
                      <div className="col-span-4">
                        <span className="text-gray-100 font-medium truncate">
                          {ingredient.name}
                        </span>
                      </div>
                      {targets.map(target => {
                        const value = ingredient.compositions.find(c => c.nutrient?.id === target.id)?.value || 0;
                        const unit = ingredient.compositions.find(c => c.nutrient?.id === target.id)?.nutrient?.unit || '';
                        return (
                          <div
                            key={target.id}
                            className="col-span-2 text-right text-sm text-gray-300"
                          >
                            <span className="font-mono">{value.toFixed(2)}</span>
                            <span className="text-gray-500 ml-1 text-xs">{unit}</span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 p-4">
              <div className="flex justify-between items-center space-x-4">
                <button
                  onClick={() => setShowIngredientModal(false)}
                  className="px-6 py-2.5 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Target Modal */}
      {showTargetModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-md flex flex-col max-h-[90vh]">
            <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-100">
                  Add Nutrient Targets
                </h3>
                <button
                  onClick={() => setShowTargetModal(false)}
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search nutrients..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {allNutrients
                .filter(n => !targets.some(t => t.id === n.id))
                .map((nutrient) => (
                  <div
                    key={nutrient.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/30 cursor-pointer"
                    onClick={() => addTargets([{ id: nutrient.id, name: nutrient.name, value: 0, unit: nutrient.unit, description: nutrient.description || '' }])}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-200 truncate">{nutrient.name}</span>
                    </div>
                  </div>
                ))}
            </div>

            <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 p-4">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setShowTargetModal(false)}
                  className="px-4 py-2.5 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
