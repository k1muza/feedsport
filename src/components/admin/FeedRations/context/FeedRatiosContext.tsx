import { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';

import { 
  Ingredient as DataIngredient, 
  Nutrient, 
  TargetNutrient, 
  RatioIngredient, 
  Formulation 
} from '@/types';
import { getIngredients } from '@/data/ingredients';
import { getNutrients } from '@/data/nutrients';

type FeedRatiosContextType = {
  ingredients: RatioIngredient[];
  setIngredients: React.Dispatch<React.SetStateAction<RatioIngredient[]>>;
  targets: TargetNutrient[];
  setTargets: React.Dispatch<React.SetStateAction<TargetNutrient[]>>;
  visibleColumns: string[];
  setVisibleColumns: React.Dispatch<React.SetStateAction<string[]>>;
  savedFormulations: Formulation[];
  setSavedFormulations: React.Dispatch<React.SetStateAction<Formulation[]>>;
  addIngredient: (ing: DataIngredient) => void;
  removeIngredient: (id: string) => void;
  handleRatioChange: (id: string, val: string) => void;
  addTargets: (newTargets: TargetNutrient[]) => void;
  removeTarget: (id: string) => void;
  updateTarget: (id: string, v: number) => void;
  totalRatio: number;
  totalPercentage: number;
  computedValues: Record<string, number>;
  allIngredients: DataIngredient[];
  allNutrients: Nutrient[];
};

const FeedRatiosContext = createContext<FeedRatiosContextType | null>(null);

export const FeedRatiosProvider = ({ children }: { children: React.ReactNode }) => {
  const [ingredients, setIngredients] = useState<RatioIngredient[]>([]);
  const [targets, setTargets] = useState<TargetNutrient[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [savedFormulations, setSavedFormulations] = useState<Formulation[]>([]);

  const allIngredients = useMemo(() => getIngredients(), []);
  const allNutrients = useMemo(() => getNutrients(), []);

  const addIngredient = useCallback((ing: DataIngredient) => {
    setIngredients(curr => [...curr, { ...ing, ratio: 1 }]);
  }, []);

  const removeIngredient = useCallback((id: string) => {
    setIngredients(curr => curr.filter(i => i.id !== id));
  }, []);

  const handleRatioChange = useCallback((id: string, val: string) => {
    const n = Math.max(0, parseFloat(val) || 0);
    setIngredients(curr => curr.map(i => (i.id === id ? { ...i, ratio: n } : i)));
  }, []);

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

  const addTargets = useCallback((newTargets: TargetNutrient[]) => {
    const updatedTargets = [...targets];
    newTargets.forEach(newTarget => {
      if (!updatedTargets.some(t => t.id === newTarget.id)) {
        updatedTargets.push(newTarget);
      }
    });
    setTargets(updatedTargets);
  }, [targets]);

  const removeTarget = useCallback((id: string) => {
    setTargets(curr => curr.filter(t => t.id !== id));
  }, []);

  const updateTarget = useCallback((id: string, v: number) => {
    setTargets(curr => curr.map(t => (t.id === id ? { ...t, value: v } : t)));
  }, []);

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

  useEffect(() => {
    localStorage.setItem('savedFormulations', JSON.stringify(savedFormulations));
  }, [savedFormulations]);

  const value = {
    ingredients,
    setIngredients,
    targets,
    setTargets,
    visibleColumns,
    setVisibleColumns,
    savedFormulations,
    setSavedFormulations,
    addIngredient,
    removeIngredient,
    handleRatioChange,
    addTargets,
    removeTarget,
    updateTarget,
    totalRatio,
    totalPercentage,
    computedValues,
    allIngredients,
    allNutrients
  };

  return (
    <FeedRatiosContext.Provider value={value}>
      {children}
    </FeedRatiosContext.Provider>
  );
};

export const useFeedRatios = () => {
  const context = useContext(FeedRatiosContext);
  if (!context) {
    throw new Error('useFeedRatios must be used within a FeedRatiosProvider');
  }
  return context;
};
