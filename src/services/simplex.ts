import { OptimizationResult, RatioIngredient, TargetNutrient } from '@/types';
import { GLPK, Result } from 'glpk.js';

export class RatioOptimizer {
  private fixedWeight: number = 1000; // Weight for nutrient deviations

  constructor(private glpk: GLPK) {
    this.glpk = glpk;
  }

  public static async getInstance() {
    const GLPKModule = await import('glpk.js');
    return new RatioOptimizer(await GLPKModule.default());
  }

  public async optimize(
    ingredients: RatioIngredient[],
    targets: TargetNutrient[]
  ): Promise<OptimizationResult> {
    if (ingredients.length === 0 || targets.length === 0) {
      return {
        success: false,
        message: 'No ingredients or targets provided',
      };
    }

    try {
      // Create ingredient variables
      const variables = ingredients.map(ing => ({
        name: `x${ing.id.replace(/-/g, '')}`,
        coef: ing.costPerKg || 0, // Minimize total cost
      }));

      // Create deviation variables for targets
      const devVars = targets.flatMap(target => {
        const safeName = target.name.replace(/\s+/g, '');
        return [
          { name: `d_pos_${safeName}`, coef: this.fixedWeight },
          { name: `d_neg_${safeName}`, coef: this.fixedWeight }
        ];
      });

      // Create nutrient constraints with deviation variables
      const constraints = targets.map(target => {
        const safeName = target.name.replace(/\s+/g, '');
        const vars = ingredients.map(ing => {
          const comp = ing.compositions.find(c => c.nutrient?.name === target.name);
          return {
            name: `x${ing.id.replace(/-/g, '')}`,
            coef: (comp?.value ?? 0) / 100
          };
        }).filter(v => v.coef > 0);

        // Add deviation variables to nutrient constraint
        return {
          name: `nutr_${safeName}`,
          vars: [
            ...vars,
            { name: `d_pos_${safeName}`, coef: -1 }, // Negative coefficient for positive deviation
            { name: `d_neg_${safeName}`, coef: 1 }    // Positive coefficient for negative deviation
          ],
          bnds: { 
            type: this.glpk.GLP_FX, 
            lb: target.target / 100, 
            ub: target.target / 100 
          },
        };
      });

      // Total weight constraint (sum=1)
      const totalConstraint = {
        name: 'Total',
        vars: ingredients.map(ing => ({
          name: `x${ing.id.replace(/-/g, '')}`,
          coef: 1.0,
        })),
        bnds: { type: this.glpk.GLP_FX, lb: 1, ub: 1 },
      };

      // Bounds for variables
      const bounds = [
        ...ingredients.map(ing => ({
          name: `x${ing.id.replace(/-/g, '')}`,
          type: this.glpk.GLP_LO,
          lb: 0,
          ub: 1,
        })),
        ...targets.flatMap(target => {
          const safeName = target.name.replace(/\s+/g, '');
          return [
            { 
              name: `d_pos_${safeName}`, 
              type: this.glpk.GLP_LO, 
              lb: 0,
              ub: Infinity, // Add this line
            },
            { 
              name: `d_neg_${safeName}`, 
              type: this.glpk.GLP_LO, 
              lb: 0,
              ub: Infinity, // Add this line
            }
          ];
        })
      ];

      const lp = {
        name: 'FeedOptimization',
        objective: {
          direction: this.glpk.GLP_MIN,
          name: 'cost_plus_deviation',
          vars: [...variables, ...devVars],
        },
        subjectTo: [...constraints, totalConstraint],
        bounds,
      };

      const options = {
        msglev: this.glpk.GLP_MSG_ALL,
        presol: true,
        cb: {
          call: (result: Result) => console.log(result),
          each: 1,
        }
      };

      const res = await this.glpk.solve(lp, options);

      // Always return solution since we're using soft constraints
      const updatedIngredients = ingredients.map(ing => {
        const key = `x${ing.id.replace(/-/g, '')}`;
        const frac = res.result.vars[key] ?? 0;
        return { ...ing, ratio: +(frac * 100).toFixed(2) };
      });

      // Calculate nutrient deviations
      const nutrientDeviations = targets.map(target => {
        const safeName = target.name.replace(/\s+/g, '');
        return {
          ...target,
          name: target.name,
          target: target.target,
          actual: updatedIngredients.reduce(
            (sum, ing) => sum + (ing.ratio * (ing.compositions
              .find(c => c.nutrient?.name === target.name)?.value || 0)) / 100,
            0
          ),
          over: res.result.vars[`d_pos_${safeName}`] || 0,
          under: res.result.vars[`d_neg_${safeName}`] || 0,
        };
      });

      const unmetTargets: TargetNutrient[] = [];
      const tolerance = 0.000001; // 1% tolerance

      for (const nd of nutrientDeviations) {
        if (nd.under > tolerance) {
          unmetTargets.push({
            ...targets.find(t => t.name === nd.name)!,
            target: nd.target,
            actual: nd.actual,
            under: nd.under
          });
        }
      }

      return {
        success: true,
        message: 'Best-effort solution found',
        updatedIngredients,
        nutrientDeviations,
        unmetTargets, // Add this line
        rawResult: res,
      };
    } catch (err) {
      console.error('Optimization error:', err);
      return {
        success: false,
        message: `Optimization failed: ${err instanceof Error ? err.message : String(err)}`,
      };
    }
  }
}
