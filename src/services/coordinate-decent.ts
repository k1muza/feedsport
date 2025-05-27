import { RatioIngredient, TargetNutrient, OptimizationResult } from '@/types';

// Internal profile mapping: nutrient name → concentration per unit ratio
type Profile = Record<string, number>;

export class IngredientAnalyser {
  private static instance: IngredientAnalyser;

  private constructor() {}

  /**
   * Retrieve the singleton instance.
   */
  public static getInstance(): IngredientAnalyser {
    if (!IngredientAnalyser.instance) {
      IngredientAnalyser.instance = new IngredientAnalyser();
    }
    return IngredientAnalyser.instance;
  }

  /**
   * Optimize a blend of RatioIngredients against targets.
   */
  public analyze(
    ingredients: RatioIngredient[],
    targets: TargetNutrient[],
    stepSize = 0.01,
    maxIterations = 100
  ): OptimizationResult {
    // Deep clone inputs so we never mutate original objects
    const working = ingredients.map(ing => ({
      ...ing,
      compositions: ing.compositions.map(comp => ({
        ...comp,
        nutrient: comp.nutrient ? { ...comp.nutrient } : undefined
      })),
      ratio: 1000
    }));
    console.log('Working ingredients:', working);

    let profile = this.computeProfile(working);
    let deficit = this.computeDeficit(profile, targets);

    const result: OptimizationResult = {
      success: false,
      message: '',
      updatedIngredients: undefined,
      rawResult: undefined,
      suggestions: [],
    };

    if (deficit === 0) {
      result.success = true;
      result.message = 'Already meets all targets.';
      result.updatedIngredients = working;
      return result;
    }

    for (let iter = 0; iter < maxIterations; iter++) {
      let anyChange = false;
      const order = working.map((_, i) => i);
      this.shuffle(order);

      for (const idx of order) {
        if (this.reduceIngredient(working, idx, targets, stepSize)) {
          anyChange = true;
          profile = this.computeProfile(working);
          deficit = this.computeDeficit(profile, targets);
          if (deficit === 0) {
            result.success = true;
            result.message = 'Targets met after optimization.';
            result.updatedIngredients = working;
            return result;
          }
        }
      }

      if (!anyChange) break;
    }

    profile = this.computeProfile(working);
    deficit = this.computeDeficit(profile, targets);
    if (deficit === 0) {
      result.success = true;
      result.message = 'Targets met on final check.';
      result.updatedIngredients = working;
    } else {
      const unmet = targets
        .filter(t => (profile[t.name] ?? 0) < t.value)
        .map(t => ({ name: t.name, currentValue: profile[t.name] ?? 0, targetValue: t.value }));
      result.success = false;
      result.message = `Unable to satisfy nutrients: ${unmet.map(u => u.name).join(', ')}`;
      result.updatedIngredients = working;
      result.suggestions = unmet.map(u => ({ nutrient: { id: '', name: u.name, description: '', unit: '' }, target: u.targetValue }));
    }

    return result;
  }

  /** Build per-unit-ratio nutrient profile */
  private computeProfile(ingredients: RatioIngredient[]): Profile {
    const totals: Profile = {};
    const totalRatio = ingredients.reduce((sum, ing) => sum + ing.ratio, 0);
    for (const ing of ingredients) {
      for (const comp of ing.compositions) {
        const key = comp.nutrient?.name || comp.nutrientId.toString();
        totals[key] = (totals[key] || 0) + ing.ratio * comp.value;
      }
    }
    const profile: Profile = {};
    for (const [nutrient, totalValue] of Object.entries(totals)) {
      profile[nutrient] = totalValue / totalRatio;
    }
    return profile;
  }

  /** Sum of deficits for each target */
  private computeDeficit(profile: Profile, targets: TargetNutrient[]): number {
    return targets.reduce((sum, t) => {
      const current = profile[t.name] ?? 0;
      return sum + Math.max(0, t.value - current);
    }, 0);
  }

  /** Fisher–Yates shuffle */
  private shuffle<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  /** Reduce an ingredient by steps so long as deficit does not increase */
  private reduceIngredient(
    ingredients: RatioIngredient[],
    index: number,
    targets: TargetNutrient[],
    stepSize: number
  ): boolean {
    const ing = ingredients[index];
    let deficit = this.computeDeficit(this.computeProfile(ingredients), targets);
    let didReduce = false;
    const maxSteps = Math.floor(ing.ratio / stepSize);
    for (let i = 0; i < maxSteps; i++) {
      ing.ratio -= stepSize;
      const newDef = this.computeDeficit(this.computeProfile(ingredients), targets);
      if (newDef <= deficit) {
        didReduce = true;
        deficit = newDef;
      } else {
        ing.ratio += stepSize;
        break;
      }
    }
    return didReduce;
  }
}
