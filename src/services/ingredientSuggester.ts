// src/services/IngredientSuggestionService.ts

import { getIngredientById, getIngredients } from '@/data/ingredients';
import { getNutrientById } from '@/data/nutrients';
import { RatioIngredient, TargetNutrient, IngredientSuggestion } from '@/types';
import { Result } from 'glpk.js';

export class IngredientSuggestionService {
  /** 
   * Returns the list of targets that no ingredient can satisfy on its own.
   */
  public static detectInfeasibleTargets(
    ingredients: RatioIngredient[],
    targets: TargetNutrient[]
  ): TargetNutrient[] {
    return targets.filter(target => {
      const maxSupply = Math.max(
        0,
        ...ingredients.map(ing => {
          const comp = ing.compositions.find(c => c.nutrient?.name === target.name);
          return comp?.value ?? 0;
        })
      );
      return maxSupply < target.target;
    });
  }

  /**
   * For each target nutrient that *can* be met, suggest the top ingredients by
   * highest concentration.  For truly infeasible ones, emits a no-go message.
   */
  public static async suggest(
    ingredients: RatioIngredient[],
    targets: TargetNutrient[],
    rawResult?: Result,
    topN: number = 3
  ): Promise<IngredientSuggestion[]> {
    const suggestions: IngredientSuggestion[] = [];
    const infeasible = this.detectInfeasibleTargets(ingredients, targets);

    // 1) For each infeasible target, recommend the top few providers by % content
    for (const target of infeasible) {
      const all = await getIngredients();
      const candidates = all
        .map(ing => {
          const comp = ing.compositions.find(c => c.nutrient?.id === target.id);
          return { ing, value: comp?.value ?? 0 };
        })
        .filter(item => item.value > 0)
        .sort((a, b) => b.value - a.value)
        .slice(0, topN);

      if (candidates.length === 0) {
        // No ingredient has any of this nutrient at all
        suggestions.push({
          nutrient: await getNutrientById(target.id),
          target: target.target,
        });
      } else {
        candidates.forEach(({ ing, value }) => {
          suggestions.push({
            ingredient: await getIngredientById(ing.id),
            nutrient: await getNutrientById(target.id),
            target: value,
          });
        });
      }
    }

    return suggestions;
  }
}
