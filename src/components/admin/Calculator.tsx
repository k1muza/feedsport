'use client';

import { Ingredient as DataIngredient, getIngredients } from '@/data/ingredients';
import { getNutrients } from '@/data/nutrients';
import { AlertTriangle, Calculator, ChevronLeft, ChevronRight, Droplet, Plus, Scissors, Sliders, X, Zap } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

interface RatioIngredient extends DataIngredient {
  ratio: number;
}
interface TargetNutrient {
  id: string;
  name: string;
  value: number;
  icon: React.ReactNode;
}

export const FeedRatios = () => {
  // State management
  const [ingredients, setIngredients] = useState<RatioIngredient[]>([]);
  const [showLeftPanel, setShowLeftPanel] = useState<'targets' | 'results'>('targets');
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);

  // Fetch data lists
  const allIngredients = useMemo(() => getIngredients(), []);
  const allNutrients = useMemo(() => getNutrients(), []);

  // Initialize targets to core nutrients
  const initialTargets = useMemo<TargetNutrient[]>(() => {
    const find = (name: string) => allNutrients.find(n => n.name === name)?.id || '';
    return [
      { id: find('Crude Protein'),      name: 'Crude Protein',      value: 18, icon: <Droplet className="w-5 h-5 text-indigo-400"/> },
      { id: find('Fat (Ether Extract)'), name: 'Fat (Ether Extract)', value: 5,  icon: <Zap     className="w-5 h-5 text-indigo-400"/> },
      { id: find('Crude Fiber'),         name: 'Crude Fiber',         value: 8,  icon: <Scissors className="w-5 h-5 text-indigo-400"/> },
    ];
  }, [allNutrients]);
  const [targets, setTargets] = useState<TargetNutrient[]>(initialTargets);

  // Modals and new-target state
  const [showIngModal, setShowIngModal] = useState(false);
  const [showTgtModal, setShowTgtModal] = useState(false);
  const [newTgtId, setNewTgtId] = useState('');
  const [newTgtValue, setNewTgtValue] = useState(0);

  // Add/Remove ingredient
  const addIngredient = useCallback((ing: DataIngredient) => {
    setIngredients(curr => [...curr, { ...ing, ratio: 1 }]);
    setShowIngModal(false);
  }, []);
  const removeIngredient = useCallback((id: string) => {
    setIngredients(curr => curr.filter(i => i.id !== id));
  }, []);

  // Update ratio
  const handleRatioChange = useCallback((id: string, val: string) => {
    const n = Math.max(0, parseFloat(val) || 0);
    setIngredients(curr => curr.map(i => i.id === id ? { ...i, ratio: n } : i));
  }, []);

  // Compute totals
  const totalRatio = useMemo(() => ingredients.reduce((s,i) => s + i.ratio, 0), [ingredients]);
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

  // Add/Remove/Update target
  const addTarget = () => {
    if (!newTgtId || newTgtValue <= 0) return;
    if (targets.find(t => t.id === newTgtId)) return;
    const nut = allNutrients.find(n => n.id === newTgtId)!;
    setTargets(curr => [...curr, {
      id: nut.id, name: nut.name, value: newTgtValue,
      icon: <Sliders className="w-5 h-5 text-indigo-400"/>
    }]);
    setNewTgtId(''); setNewTgtValue(0); setShowTgtModal(false);
  };
  const removeTarget = useCallback((id: string) => {
    setTargets(curr => curr.filter(t => t.id !== id));
  }, []);
  const updateTarget = useCallback((id: string, v: number) => {
    setTargets(curr => curr.map(t => t.id===id ? {...t,value:v} : t));
  }, []);

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
        <div className="flex space-x-2">
          <button onClick={()=>setShowIngModal(true)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center space-x-2">
            <Plus className="w-4 h-4" /><span>Add Ingredient</span>
          </button>
          <button onClick={()=>setShowTgtModal(true)} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg flex items-center space-x-2">
            <Zap className="w-4 h-4" /><span>Add Target</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - Toggleable Panel */}
        <div className={`lg:w-1/3 space-y-4 ${leftPanelCollapsed ? 'lg:w-16' : ''}`}>
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <button 
                onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
                className="text-gray-400 hover:text-gray-200"
              >
                {leftPanelCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>
              
              {!leftPanelCollapsed && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowLeftPanel('targets')}
                    className={`px-3 py-1 rounded-lg text-sm ${showLeftPanel === 'targets' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                  >
                    Targets
                  </button>
                  <button
                    onClick={() => setShowLeftPanel('results')}
                    className={`px-3 py-1 rounded-lg text-sm ${showLeftPanel === 'results' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                  >
                    Results
                  </button>
                </div>
              )}
            </div>

            {!leftPanelCollapsed && (
              <>
                {showLeftPanel === 'targets' ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Nutritional Targets</h3>
                    <div className="space-y-4">
                      {targets.map(t => (
                        <div key={t.id} className="space-y-2">
                          <div className="flex items-center space-x-2">
                            {t.icon}<label className="text-sm text-gray-400">{t.name} (%)</label>
                          </div>
                          <div className="relative">
                            <input type="number" min="0" max="100" value={t.value}
                              onChange={e=>updateTarget(t.id,Number(e.target.value))}
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"/>
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
                          </div>
                          <button onClick={()=>removeTarget(t.id)} className="text-red-400 hover:text-red-300 text-sm flex items-center">
                            <X className="w-3 h-3 mr-1"/>Remove target
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Results Summary</h3>
                    <div className="space-y-4">
                      {targets.map(t => {
                        const comp = computedValues[t.name]||0;
                        const met = comp>=t.value*0.95;
                        return (
                          <div key={t.id} className={`p-3 rounded-lg border ${met?'border-green-500/30 bg-green-500/10':'border-red-500/30 bg-red-500/10'}`}>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-2">
                                {t.icon}
                                <span className="font-medium">{t.name}</span>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs ${met?'bg-green-500/20 text-green-400':'bg-red-500/20 text-red-400'}`}>
                                {met?'Target Met':'Below Target'}
                              </span>
                            </div>
                            <div className="mt-2 text-xl font-bold">
                              {comp.toFixed(2)}% / {t.value}%
                            </div>
                            <div className="text-sm text-gray-400 mt-1">
                              Difference: {(comp-t.value).toFixed(2)}%
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Right Column - Ingredients */}
        <div className={`${leftPanelCollapsed ? 'lg:w-[calc(100%-4rem)]' : 'lg:w-2/3'} space-y-4`}>
          {/* Ingredients Panel */}
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
            {ingredients.length===0 ? (
              <div className="text-center py-8 text-gray-400">No ingredients added yet. Click "Add Ingredient".</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Ingredient</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Ratio</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">%</th>
                      {targets.map(t=><th key={t.id} className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t.name}</th>)}
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {ingredients.map(i=>{
                      const pct = totalRatio? (i.ratio/totalRatio)*100 : 0;
                      return (
                        <tr key={i.id} className="hover:bg-gray-700/50">
                          <td className="px-4 py-3 text-gray-200">{i.name}</td>
                          <td className="px-4 py-3">
                            <input 
                              type="number" 
                              min="0" 
                              value={i.ratio}
                              onChange={e=>handleRatioChange(i.id,e.target.value)}
                              className="w-20 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-gray-200"
                            />
                          </td>
                          <td className="px-4 py-3 text-gray-200">{pct.toFixed(1)}%</td>
                          {targets.map(t=>{
                            const comp = i.compositions.find(c=>c.nutrient?.name===t.name)?.value||0;
                            return <td key={`${i.id}-${t.id}`} className="px-4 py-3 text-gray-400">{(comp*pct/100).toFixed(2)}%</td>;
                          })}
                          <td className="px-4 py-3">
                            <button onClick={()=>removeIngredient(i.id)} className="text-red-400 hover:text-red-300">
                              <X className="w-4 h-4"/>
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

          {/* Batch Calculation */}
          {ingredients.length > 0 && (
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-medium mb-4">Batch Calculation (1000kg)</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {ingredients.map(ing => (
                  <div key={ing.id} className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-sm text-gray-400">{ing.name}</p>
                    <p className="text-lg font-medium">
                      {((ing.ratio / totalRatio) * 1000).toFixed(0)}kg
                      <span className="text-sm text-gray-400 ml-1">
                        ({((ing.ratio / totalRatio) * 100).toFixed(1)}%)
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showIngModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-200">Select Ingredient</h3>
              <button 
                onClick={() => setShowIngModal(false)} 
                className="text-gray-400 hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {allIngredients
                .filter(ing => !ingredients.some(i => i.id === ing.id))
                .map(ingredient => (
                  <button
                    key={ingredient.id}
                    onClick={() => addIngredient(ingredient)}
                    className="w-full py-2 px-3 flex justify-between items-center hover:bg-gray-700/50 rounded transition-colors text-left text-gray-200"
                  >
                    <span>{ingredient.name}</span>
                    <Plus className="w-4 h-4 text-indigo-400" />
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      {showTgtModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-200">Add Nutrient Target</h3>
              <button 
                onClick={() => setShowTgtModal(false)} 
                className="text-gray-400 hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <select
                value={newTgtId}
                onChange={e => setNewTgtId(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-200"
              >
                <option value="">Select Nutrient</option>
                {allNutrients
                  .filter(n => !targets.some(t => t.id === n.id))
                  .map(nutrient => (
                    <option key={nutrient.id} value={nutrient.id}>
                      {nutrient.name}
                    </option>
                  ))}
              </select>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newTgtValue}
                  onChange={e => setNewTgtValue(Number(e.target.value))}
                  placeholder="Target %"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-200"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
              </div>
              <button
                onClick={addTarget}
                className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded text-white"
              >
                Add Target
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};