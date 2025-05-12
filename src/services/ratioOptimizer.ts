import { OptimizationResult, RatioIngredient, TargetNutrient } from '@/types';
import { IngredientSuggestionService } from './ingredientSuggester';

export class RatioOptimizer {
  private glpk: any;

  public async initialize() {
    if (!this.glpk) {
      const GLPKModule = await import('glpk.js');
      this.glpk = await GLPKModule.default();
    }
  }

  public async optimize(
    ingredients: RatioIngredient[],
    targets: TargetNutrient[]
  ): Promise<OptimizationResult> {
    if (!this.glpk) {
      await this.initialize();
    }

    if (ingredients.length === 0 || targets.length === 0) {
      return {
        success: false,
        message: 'No ingredients or targets provided',
      };
    }

    try {
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
        }).filter(v => v.coef > 0);

        return {
          name: target.name.replace(/\s+/g, ''),
          vars,
          bnds: { type: this.glpk.GLP_LO, lb: target.value / 100, ub: Infinity },
        };
      });

      const totalConstraint = {
        name: 'Total',
        vars: ingredients.map(ing => ({
          name: `x${ing.id.replace(/-/g, '')}`,
          coef: 1.0,
        })),
        bnds: { type: this.glpk.GLP_FX, lb: 1, ub: 1 },
      };

      const lp = {
        name: 'FeedOptimization',
        objective: {
          direction: this.glpk.GLP_MIN,
          name: 'cost',
          vars: variables,
        },
        subjectTo: [...constraints, totalConstraint],
        bounds: ingredients.map(ing => ({
          name: `x${ing.id.replace(/-/g, '')}`,
          type: this.glpk.GLP_LO,
          lb: 0,
          ub: 1,
        })),
      };

      console.log('LP:', lp);

      const options = {
        msglev: this.glpk.GLP_MSG_ALL,
        presol: true,
        cb: {
          callback: (progress: any) => console.log(progress),
        }
      };

      const res = await this.glpk.solve(lp, options);

      if (res.result.status === this.glpk.GLP_OPT) {
        const updatedIngredients = ingredients.map(ing => {
          const key = `x${ing.id.replace(/-/g, '')}`;
          const frac = res.result.vars[key] ?? 0;
          return { ...ing, ratio: +(frac * 100).toFixed(2) };
        });

        return {
          success: true,
          message: 'Optimization successful',
          updatedIngredients,
          rawResult: res,
        };
      } else {
        const suggestions = IngredientSuggestionService.suggest(
          ingredients,
          targets,
          res,
          3  // top 3 per nutrient
        );
        if (suggestions.length === 0) {
          return {
            success: false,
            message: 'Optimization did not find an optimal solution',
            rawResult: res,
          };
        } else {
          return {
            success: false,
            message: 'Please add more ingredients, see suggestions below',
            suggestions,
            rawResult: res,
          };
        }
      }
    } catch (err) {
      console.error('Optimization error:', err);
      return {
        success: false,
        message: `Optimization failed: ${err instanceof Error ? err.message : String(err)}`,
      };
    }
  }
}

// Singleton instance
export const ratioOptimizer = new RatioOptimizer();