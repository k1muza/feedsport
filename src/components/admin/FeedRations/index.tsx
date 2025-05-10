'use client';

import { Ingredient as DataIngredient, getIngredients, RatioIngredient } from '@/data/ingredients';
import { getNutrients } from '@/data/nutrients';
import { TargetNutrient } from '@/types';
import { useCallback, useMemo, useState } from 'react';
import { BatchCalculation } from './BatchCalculation';
import { Header } from './Header';
import { IngredientModal } from './IngredientModal';
import { IngredientPanel } from './IngredientPanel';
import { LeftPanel } from './LeftPanel';
import { TargetModal } from './TargetModal';

export const FeedRatios = () => {
  const [ingredients, setIngredients] = useState<RatioIngredient[]>([]);
  const [showIngredientModal, setShowIngredientModal] = useState(false);
  const [showTargetModal, setShowTargetModal] = useState(false);
  const [newTargetId, setNewTargetId] = useState('');
  const [newTargetValue, setNewTargetValue] = useState(0);
  const [showLeftPanel, setShowLeftPanel] = useState<'targets' | 'results'>('targets');
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<any>(null);

  const allIngredients = useMemo(() => getIngredients(), []);
  const allNutrients = useMemo(() => getNutrients(), []);

  const initialTargets = useMemo(
    () => [
      { id: allNutrients.find(n => n.name === 'Crude Protein')!.id, name: 'Crude Protein', value: 18 },
      { id: allNutrients.find(n => n.name === 'Fat (Ether Extract)')!.id, name: 'Fat (Ether Extract)', value: 5 },
      { id: allNutrients.find(n => n.name === 'Crude Fiber')!.id, name: 'Crude Fiber', value: 8 },
    ],
    [allNutrients]
  );

  const [targets, setTargets] = useState<TargetNutrient[]>(initialTargets);

  const addIngredient = useCallback(
    (ing: DataIngredient) => {
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

  const totalRatio = useMemo(() => ingredients.reduce((sum, i) => sum + i.ratio, 0), [ingredients]);
  const totalPercentage = useMemo(
    () => ingredients.reduce((sum, i) => sum + (i.ratio / totalRatio * 100), 0),
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

  const addTarget = useCallback(() => {
    if (!newTargetId || newTargetValue <= 0) return;
    if (targets.find(t => t.id === newTargetId)) return;
    const nut = allNutrients.find(n => n.id === newTargetId)!;
    setTargets(curr => [...curr, { id: nut.id, name: nut.name, value: newTargetValue }]);
    setNewTargetId('');
    setNewTargetValue(0);
    setShowTargetModal(false);
  }, [newTargetId, newTargetValue, targets, allNutrients]);

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

  const optimizeRatios = useCallback(async () => {
    if (ingredients.length === 0 || targets.length === 0) return;

    setOptimizing(true);

    try {
      const GLPK = await import('glpk.js');
      const glpk = await GLPK.default();

      const variables = ingredients.map(ing => ({
        name: `x${ing.id.replace(/-/g, '')}`,
        coef: ing.costPerKg || 0, // Minimize total cost
      }));

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
      };

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
        onAddIng={() => setShowIngredientModal(true)}
        onAddTgt={() => setShowTargetModal(true)}
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
        show={showIngredientModal}
        onClose={() => setShowIngredientModal(false)}
        allIngredients={allIngredients}
        existingIngredients={ingredients}
        onAdd={addIngredient}
      />

      <TargetModal
        show={showTargetModal}
        onClose={() => setShowTargetModal(false)}
        allNutrients={allNutrients}
        existingTargets={targets}
        onAdd={addTarget}
        newId={newTargetId}
        setNewId={setNewTargetId}
        newValue={newTargetValue}
        setNewValue={setNewTargetValue}
      />
    </div>
  );
};
