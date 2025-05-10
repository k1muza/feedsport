'use client';

import { useState, useCallback, useMemo } from 'react';
import { Ingredient as DataIngredient, getIngredients } from '@/data/ingredients';
import { getNutrients, Nutrient } from '@/data/nutrients';
import {
  AlertTriangle,
  Calculator,
  ChevronLeft,
  ChevronRight,
  Droplet,
  Plus,
  Scissors,
  Sliders,
  X,
  Zap,
} from 'lucide-react';

// Types
interface RatioIngredient extends DataIngredient {
  ratio: number;
  costPerKg?: number;
}

interface TargetNutrient {
  id: string;
  name: string;
  value: number;
  icon: React.ReactNode;
}

// Header Component
const Header = ({ onAddIng, onAddTgt }: { onAddIng: () => void; onAddTgt: () => void }) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div className="flex items-center space-x-3">
      <Calculator className="w-6 h-6 text-indigo-400" />
      <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
        Feed Ratio Calculator
      </h2>
    </div>
    <div className="flex space-x-2">
      <button onClick={onAddIng} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center space-x-2">
        <Plus className="w-4 h-4" /> <span>Add Ingredient</span>
      </button>
      <button onClick={onAddTgt} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg flex items-center space-x-2">
        <Zap className="w-4 h-4" /> <span>Add Target</span>
      </button>
    </div>
  </div>
);

// Left Panel Component
const LeftPanel = ({
  showPanel,
  isCollapsed,
  targets,
  computedValues,
  onToggleCollapse,
  onSwitchPanel,
  onUpdateTarget,
  onRemoveTarget,
  onOptimize,
  optimizing,
}: {
  showPanel: 'targets' | 'results';
  isCollapsed: boolean;
  targets: TargetNutrient[];
  computedValues: Record<string, number>;
  onToggleCollapse: () => void;
  onSwitchPanel: (panel: 'targets' | 'results') => void;
  onUpdateTarget: (id: string, v: number) => void;
  onRemoveTarget: (id: string) => void;
  onOptimize: () => void;
  optimizing: boolean;
}) => (
  <div className={`lg:w-1/3 space-y-4 ${isCollapsed ? 'lg:w-16' : ''}`}>
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
      <div className="flex justify-between items-center mb-2">
        <button onClick={onToggleCollapse} className="text-gray-400 hover:text-gray-200">
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>

        {!isCollapsed && (
          <div className="flex space-x-2">
            <button
              onClick={() => onSwitchPanel('targets')}
              className={`px-3 py-1 rounded-lg text-sm ${showPanel === 'targets' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Targets
            </button>
            <button
              onClick={() => onSwitchPanel('results')}
              className={`px-3 py-1 rounded-lg text-sm ${showPanel === 'results' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Results
            </button>
          </div>
        )}
      </div>

      {!isCollapsed && (
        <>
          {showPanel === 'targets' ? (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Nutritional Targets</h3>
              <div className="space-y-4">
                {targets.map(target => (
                  <div key={target.id} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      {target.icon}
                      <label className="text-sm text-gray-400">{target.name} (%)</label>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={target.value}
                        onChange={e => onUpdateTarget(target.id, Number(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
                    </div>
                    <button onClick={() => onRemoveTarget(target.id)} className="text-red-400 hover:text-red-300 text-sm flex items-center">
                      <X className="w-3 h-3 mr-1" /> Remove target
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Results Summary</h3>
              </div>
              <div className="space-y-4">
                {targets.map(target => {
                  const comp = computedValues[target.name] || 0;
                  const met = comp >= target.value * 0.95;
                  return (
                    <div
                      key={target.id}
                      className={`p-3 rounded-lg border ${met ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-400">{target.name}</p>
                          <p className="text-2xl font-bold mt-1">
                            {comp.toFixed(2)}%
                            <span className="text-sm font-normal ml-2 text-gray-400">
                              (Target: {target.value}%)
                            </span>
                          </p>
                        </div>
                        {met ? (
                          <div className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                            Target Met
                          </div>
                        ) : (
                          <div className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
                            Below Target
                          </div>
                        )}
                      </div>
                      <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min(100, (comp / target.value) * 100)}%`,
                            backgroundColor: met ? '#10B981' : '#EF4444'
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={onOptimize}
                disabled={optimizing}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm flex items-center space-x-2"
              >
                {optimizing ? 'Optimizing...' : 'Optimize Ratios'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  </div>
);

// Ingredient Panel Component
const IngredientPanel = ({
  ingredients,
  targets,
  totalRatio,
  totalPercentage,
  onRatioChange,
  onRemoveIngredient,
  isExpanded,
}: {
  ingredients: RatioIngredient[];
  targets: TargetNutrient[];
  totalRatio: number;
  totalPercentage: number;
  onRatioChange: (id: string, val: string) => void;
  onRemoveIngredient: (id: string) => void;
  isExpanded: boolean;
}) => (
  <div className={`${isExpanded ? 'lg:w-[calc(100%-4rem)]' : 'lg:w-2/3'} space-y-4`}>
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Ingredient Composition</h3>
        {totalPercentage !== 100 && (
          <div className="flex items-center text-yellow-400 text-sm">
            <AlertTriangle className="w-4 h-4 mr-1" />
            <span>Total: {totalPercentage.toFixed(1)}% (should be 100%)</span>
          </div>
        )}
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
                {targets.map(t => (
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
                        onChange={e => onRatioChange(ingredient.id, e.target.value)}
                        className="w-20 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-gray-200"
                      />
                    </td>
                    <td className="px-4 py-3 text-gray-200">{pct.toFixed(1)}%</td>
                    {targets.map(target => {
                      const comp = ingredient.compositions.find(c => c.nutrient?.name === target.name)?.value || 0;
                      return (
                        <td key={`${ingredient.id}-${target.id}`} className="px-4 py-3 text-gray-400">
                          {((comp * pct) / 100).toFixed(2)}%
                        </td>
                      );
                    })}
                    <td className="px-4 py-3">
                      <button onClick={() => onRemoveIngredient(ingredient.id)} className="text-red-400 hover:text-red-300">
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
);

// Batch Calculation Component
const BatchCalculation = ({ ingredients, totalRatio }: { ingredients: RatioIngredient[]; totalRatio: number }) => (
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
);

// Ingredient Modal Component
const IngredientModal = ({
  show,
  onClose,
  allIngredients,
  existingIngredients,
  onAdd,
}: {
  show: boolean;
  onClose: () => void;
  allIngredients: DataIngredient[];
  existingIngredients: RatioIngredient[];
  onAdd: (ing: DataIngredient) => void;
}) => (
  show ? (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-200">Select Ingredient</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2">
          {allIngredients
            .filter(ing => !existingIngredients.some(i => i.id === ing.id))
            .map(ingredient => (
              <button
                key={ingredient.id}
                onClick={() => onAdd(ingredient)}
                className="w-full py-2 px-3 flex justify-between items-center hover:bg-gray-700/50 rounded transition-colors text-left text-gray-200"
              >
                <span>{ingredient.name}</span>
                <Plus className="w-4 h-4 text-indigo-400" />
              </button>
            ))}
        </div>
      </div>
    </div>
  ) : null
);

// Target Modal Component
const TargetModal = ({
  show,
  onClose,
  allNutrients,
  existingTargets,
  onAdd,
  newId,
  setNewId,
  newValue,
  setNewValue,
}: {
  show: boolean;
  onClose: () => void;
  allNutrients: Nutrient[];
  existingTargets: TargetNutrient[];
  onAdd: () => void;
  newId: string;
  setNewId: (id: string) => void;
  newValue: number;
  setNewValue: (value: number) => void;
}) => (
  show ? (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-200">Add Nutrient Target</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          <select
            value={newId}
            onChange={e => setNewId(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-200"
          >
            <option value="">Select Nutrient</option>
            {allNutrients
              .filter(n => !existingTargets.some(t => t.id === n.id))
              .map(nutrient => (
                <option key={nutrient.id} value={nutrient.id}>
                  {nutrient.name}
                </option>
              ))}
          </select>
          <div className="relative">
            <input
              type="number"
              min={0}
              max={100}
              value={newValue}
              onChange={e => setNewValue(Number(e.target.value))}
              placeholder="Target %"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-200"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
          </div>
          <button
            onClick={onAdd}
            className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded text-white"
          >
            Add Target
          </button>
        </div>
      </div>
    </div>
  ) : null
);

// Main Component
export const FeedRatios = () => {
  // State management
  const [ingredients, setIngredients] = useState<RatioIngredient[]>([]);
  const [showIngModal, setShowIngModal] = useState(false);
  const [showTgtModal, setShowTgtModal] = useState(false);
  const [newTgtId, setNewTgtId] = useState('');
  const [newTgtValue, setNewTgtValue] = useState(0);
  const [showLeftPanel, setShowLeftPanel] = useState<'targets' | 'results'>('targets');
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<any>(null);

  // Data sources
  const allIngredients = useMemo(() => getIngredients(), []);
  const allNutrients = useMemo(() => getNutrients(), []);

  // Initialize targets
  const [targets, setTargets] = useState<TargetNutrient[]>(() => {
    const find = (name: string) => allNutrients.find(n => n.name === name)?.id || '';
    return [
      { id: find('Crude Protein'), name: 'Crude Protein', value: 18, icon: <Droplet className="w-5 h-5 text-indigo-400" /> },
      { id: find('Fat (Ether Extract)'), name: 'Fat (Ether Extract)', value: 5, icon: <Zap className="w-5 h-5 text-indigo-400" /> },
      { id: find('Crude Fiber'), name: 'Crude Fiber', value: 8, icon: <Scissors className="w-5 h-5 text-indigo-400" /> },
    ];
  });

  // Ingredient handlers
  const addIngredient = useCallback((ing: DataIngredient) => {
    setIngredients(curr => [...curr, { ...ing, ratio: 1 }]);
    setShowIngModal(false);
  }, []);

  const removeIngredient = useCallback((id: string) => {
    setIngredients(curr => curr.filter(i => i.id !== id));
  }, []);

  const handleRatioChange = useCallback((id: string, val: string) => {
    const n = Math.max(0, parseFloat(val) || 0);
    setIngredients(curr => curr.map(i => (i.id === id ? { ...i, ratio: n } : i)));
  }, []);

  // Calculations
  const totalRatio = useMemo(() => ingredients.reduce((sum, i) => sum + i.ratio, 0), [ingredients]);
  const totalPercentage = useMemo(() => {
    return ingredients.reduce((sum, i) => sum + (i.ratio / totalRatio * 100), 0);
  }, [ingredients, totalRatio]);

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

  // Target handlers
  const addTarget = useCallback(() => {
    if (!newTgtId || newTgtValue <= 0) return;
    if (targets.find(t => t.id === newTgtId)) return;
    const nut = allNutrients.find(n => n.id === newTgtId)!;
    setTargets(curr => [...curr, {
      id: nut.id,
      name: nut.name,
      value: newTgtValue,
      icon: <Sliders className="w-5 h-5 text-indigo-400" />,
    }]);
    setNewTgtId('');
    setNewTgtValue(0);
    setShowTgtModal(false);
  }, [newTgtId, newTgtValue, targets, allNutrients]);

  const removeTarget = useCallback((id: string) => {
    setTargets(curr => curr.filter(t => t.id !== id));
  }, []);

  const updateTarget = useCallback((id: string, v: number) => {
    setTargets(curr => curr.map(t => (t.id === id ? { ...t, value: v } : t)));
  }, []);

  // Optimization function
  const optimizeRatios = useCallback(async () => {
    if (ingredients.length === 0 || targets.length === 0) return;

    setOptimizing(true);

    try {
      const GLPK = await import('glpk.js');
      const glpk = await GLPK.default();

      // Create variables for each ingredient
      const variables = ingredients.map(ing => ({
        name: `x${ing.id.replace(/-/g, '')}`,
        coef: ing.costPerKg || 0, // Minimize total cost
      }));

      // 2) Nutrient constraints: convert percents to fractions
      //    e.g. 8.5% protein ⇒ coef = 8.5/100; target 18% ⇒ lb = 18/100
      const constraints = targets.map(target => {
        const vars = ingredients.map(ing => {
          const comp = ing.compositions.find(c => c.nutrient?.name === target.name);
          return {
            name: `x${ing.id.replace(/-/g, '')}`,
            coef: (comp?.value ?? 0) / 100
          };
        }).filter(v => v.coef > 0); // Only include ingredients that contribute to this nutrient

        return {
          name: target.name.replace(/\s+/g, ''),
          vars,
          bnds: { type: glpk.GLP_LO, lb: target.value, ub: Infinity },
        };
      });

      // Add total constraint (sum of ratios = 100)
      const totalConstraint = {
        name: 'Total',
        vars: ingredients.map(ing => ({
          name: `x${ing.id.replace(/-/g, '')}`,
          coef: 1.0,
        })),
        bnds: { type: glpk.GLP_FX, lb: 100, ub: 100 },
      };

      const lp = {
        name: 'FeedOptimization',
        objective: {
          direction: glpk.GLP_MIN,
          name: 'cost',
          vars: variables,
        },
        subjectTo: [...constraints, totalConstraint],
        bounds: ingredients.map(ing => ({
          name: `x${ing.id.replace(/-/g, '')}`,
          type: glpk.GLP_LO,
          lb: 0,
          ub: 1,
        })),
      };

      const options = {
        msglev: glpk.GLP_MSG_ALL,
        presol: true,
        cb: {
          call: (progress: any) => console.log(progress),
          each: 1
        }
      };
      console.log(lp)

      const res = await glpk.solve(lp, options);
      setOptimizationResult(res);

      if (res.result.status === glpk.GLP_OPT) {
        const sol = ingredients.map(ing => {
          const key = `x${ing.id.replace(/-/g, '')}`;
          const frac = res.result.vars[key] ?? 0;
          return { ...ing, ratio: +(frac * 100).toFixed(2) };
        });
        setIngredients(sol);
      }

    } catch (err) {
      console.error('Optimization error:', err);
    } finally {
      setOptimizing(false);
    }
  }, [ingredients, targets]);

  return (
    <div className="space-y-6">
      <Header
        onAddIng={() => setShowIngModal(true)}
        onAddTgt={() => setShowTgtModal(true)}
      />

      <div className="flex flex-col lg:flex-row gap-6">
        <LeftPanel
          showPanel={showLeftPanel}
          isCollapsed={leftPanelCollapsed}
          targets={targets}
          computedValues={computedValues}
          onToggleCollapse={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
          onSwitchPanel={(panel) => setShowLeftPanel(panel)}
          onUpdateTarget={updateTarget}
          onRemoveTarget={removeTarget}
          onOptimize={optimizeRatios}
          optimizing={optimizing}
        />

        <IngredientPanel
          ingredients={ingredients}
          targets={targets}
          totalRatio={totalRatio}
          totalPercentage={totalPercentage}
          onRatioChange={handleRatioChange}
          onRemoveIngredient={removeIngredient}
          isExpanded={leftPanelCollapsed}
        />
      </div>

      {ingredients.length > 0 && (
        <BatchCalculation
          ingredients={ingredients}
          totalRatio={totalRatio}
        />
      )}

      {optimizationResult && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-medium mb-4">Optimization Results</h3>
          <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm text-gray-100 overflow-x-auto">
            <pre>{JSON.stringify(optimizationResult, null, 2)}</pre>
          </div>
        </div>
      )}

      <IngredientModal
        show={showIngModal}
        onClose={() => setShowIngModal(false)}
        allIngredients={allIngredients}
        existingIngredients={ingredients}
        onAdd={addIngredient}
      />

      <TargetModal
        show={showTgtModal}
        onClose={() => setShowTgtModal(false)}
        allNutrients={allNutrients}
        existingTargets={targets}
        onAdd={addTarget}
        newId={newTgtId}
        setNewId={setNewTgtId}
        newValue={newTgtValue}
        setNewValue={setNewTgtValue}
      />
    </div>
  );
};