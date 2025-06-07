import { OptimizationResult, RatioIngredient, TargetNutrient } from '@/types';
import { GLPK, Result } from 'glpk.js';

// Define default penalty weights for deviations
// These values are multiplied by the deviation amount in the objective function.
// Higher values mean a stronger penalty for deviating.
const DEFAULT_UNDER_PENALTY_FACTOR = 1000; // Penalty for being under a target (e.g., 1000 per unit of deviation)
const DEFAULT_OVER_PENALTY_FACTOR = 10000;  // Penalty for being over a target (e.g., 600 per unit of deviation)
const FLOATING_POINT_TOLERANCE = 1e-6; // Tolerance for floating point comparisons (e.g., for 'unmet' targets)

/**
 * RatioOptimizer class
 *
 * This class uses GLPK.js to solve linear programming problems for optimizing
 * ingredient ratios to meet specific nutrient targets. It supports soft constraints
 * through the use of deviation variables, allowing for "best-effort" solutions
 * even if exact targets cannot be met.
 *
 * All nutrient values (in `RatioIngredient.compositions`) and target values
 * (in `TargetNutrient.target`, `TargetNutrient.max`) are assumed to be percentages (0-100).
 * They will be internally converted to fractions (0-1) for GLPK.js calculations.
 */
export class RatioOptimizer {
  private underPenaltyFactor: number;
  private overPenaltyFactor: number;

  /**
   * Constructs a RatioOptimizer instance.
   * @param glpk The GLPK.js instance.
   * @param config Optional configuration for penalty factors.
   */
  constructor(
    private glpk: GLPK,
    config?: {
      underPenaltyFactor?: number;
      overPenaltyFactor?: number;
    }
  ) {
    this.glpk = glpk;
    this.underPenaltyFactor = config?.underPenaltyFactor ?? DEFAULT_UNDER_PENALTY_FACTOR;
    this.overPenaltyFactor = config?.overPenaltyFactor ?? DEFAULT_OVER_PENALTY_FACTOR;
  }

  /**
   * Asynchronously gets an instance of RatioOptimizer.
   * This is necessary because glpk.js needs to be initialized asynchronously.
   * @returns A Promise that resolves to a RatioOptimizer instance.
   */
  public static async getInstance(
    config?: {
      underPenaltyFactor?: number;
      overPenaltyFactor?: number;
    }
  ): Promise<RatioOptimizer> {
    const GLPKModule = await import('glpk.js');
    return new RatioOptimizer(await GLPKModule.default(), config);
  }

  /**
   * Optimizes the ratios of ingredients to meet specified nutrient targets.
   * @param ingredients An array of RatioIngredient objects, each with an ID, cost, and nutrient compositions.
   * @param targets An array of TargetNutrient objects, each with a nutrient name and target/max values.
   * @returns A Promise resolving to an OptimizationResult, indicating success/failure and the optimized ratios.
   */
  public async optimize(
    ingredients: RatioIngredient[],
    targets: TargetNutrient[]
  ): Promise<OptimizationResult> {
    if (ingredients.length === 0 || targets.length === 0) {
      return {
        success: false,
        message: 'No ingredients or targets provided for optimization.',
      };
    }

    try {
      // Destructure GLPK constants for cleaner code
      const { GLP_LO, GLP_UP, GLP_FX, GLP_DB, GLP_MIN } = this.glpk;

      // 1. Create ingredient variables (x_i)
      // Coefficients are costs per kg (minimized in objective)
      const ingredientVars = ingredients.map(ing => ({
        name: `x${ing.id.replace(/-/g, '')}`, // Sanitize ID for GLPK variable name
        coef: ing.costPerKg || 0, // Minimize total cost. Default to 0 if no cost specified.
      }));

      // 2. Create deviation variables (d_pos_j, d_neg_j) for each target nutrient
      // These are penalized in the objective function.
      const deviationVars = targets.flatMap(target => {
        const safeName = target.name.replace(/\s+/g, '_'); // Sanitize nutrient name
        return [
          { name: `d_pos_${safeName}`, coef: this.overPenaltyFactor }, // Penalty for going over target
          { name: `d_neg_${safeName}`, coef: this.underPenaltyFactor }, // Penalty for going under target
        ];
      });

      // Combine ingredient and deviation variables for the objective function
      const objectiveVariables = [...ingredientVars, ...deviationVars];

      // 3. Create nutrient constraints with deviation variables
      // Actual_Nutrient_Value - d_pos + d_neg must be within target_range
      const nutrientConstraints = targets.map(target => {
        const safeName = target.name.replace(/\s+/g, '_');
        const nutrientTerms = ingredients.map(ing => {
          const composition = ing.compositions.find(c => c.nutrient?.name === target.name);
          // Convert percentage composition to a fraction (e.g., 10% -> 0.1)
          return {
            name: `x${ing.id.replace(/-/g, '')}`,
            coef: (composition?.value ?? 0) / 100,
          };
        }).filter(v => v.coef > 0); // Only include ingredients that contribute

        let lowerBound = 0;
        let upperBound = Infinity;
        let constraintType = GLP_DB; // Default to double-bounded, will be adjusted if only one bound is active

        if (target.target !== undefined && target.max !== undefined) {
          lowerBound = target.target / 100;
          upperBound = target.max / 100;
          constraintType = GLP_DB;
        } else if (target.target !== undefined) {
          lowerBound = target.target / 100;
          upperBound = Infinity; // Effectively a lower-bounded constraint
          constraintType = GLP_LO;
        } else if (target.max !== undefined) {
          lowerBound = 0; // Effectively an upper-bounded constraint
          upperBound = target.max / 100;
          constraintType = GLP_UP;
        } else {
          // This case implies a target nutrient without any specific target or max value.
          // It would be an ineffective constraint. Log a warning for clarity.
          console.warn(`Target nutrient '${target.name}' has no 'target' or 'max' defined. This constraint will be effectively unbounded.`);
          lowerBound = 0;
          upperBound = Infinity;
          constraintType = GLP_LO; // Setting to GLP_LO with 0-Infinity is harmless
        }

        return {
          name: `nutr_${safeName}`,
          vars: [
            ...nutrientTerms,
            { name: `d_pos_${safeName}`, coef: -1 }, // Subtract positive deviation
            { name: `d_neg_${safeName}`, coef: 1 },    // Add negative deviation
          ],
          bnds: {
            type: constraintType,
            lb: lowerBound,
            ub: upperBound,
          },
        };
      });

      // 4. Total weight constraint (sum of ingredient ratios must be 1, or 100%)
      const totalWeightConstraint = {
        name: 'TotalRatio',
        vars: ingredients.map(ing => ({
          name: `x${ing.id.replace(/-/g, '')}`,
          coef: 1.0,
        })),
        bnds: { type: GLP_FX, lb: 1, ub: 1 }, // Sum of ratios must equal 1
      };

      // 5. Define bounds for all variables
      const bounds = [
        // Ingredient ratios must be between 0 and 1 (0% to 100%)
        ...ingredients.map(ing => ({
          name: `x${ing.id.replace(/-/g, '')}`,
          type: GLP_LO, // Lower-bounded (0 to Infinity)
          lb: 0,
          ub: 1, // Upper bound at 1 (100%)
        })),
        // Deviation variables must be non-negative
        ...targets.flatMap(target => {
          const safeName = target.name.replace(/\s+/g, '_');
          return [
            { name: `d_pos_${safeName}`, type: GLP_LO, lb: 0, ub: Infinity },
            { name: `d_neg_${safeName}`, type: GLP_LO, lb: 0, ub: Infinity },
          ];
        }),
      ];

      // Construct the GLPK problem object
      const lp = {
        name: 'RatioOptimization',
        objective: {
          direction: GLP_MIN,
          name: 'total_cost_plus_deviation_penalties',
          vars: objectiveVariables,
        },
        subjectTo: [...nutrientConstraints, totalWeightConstraint],
        bounds,
      };

      // GLPK solver options (usually default is fine, but can be customized)
      const options = {
        msglev: this.glpk.GLP_MSG_OFF, // Set to GLP_MSG_ALL for verbose output
        presol: true, // Use presolver for potentially faster and more robust solutions
        cb: { // Callback for debugging GLPK progress (uncomment for verbose debug)
          call: (result: Result) => console.log(result),
          each: 1,
        }
      };

      console.log('GLPK solver options:', options);

      console.log('GLPK problem:', lp);

      // Solve the linear programming problem
      const res = await this.glpk.solve(lp, options);

      // Process the results
      const updatedIngredients = ingredients.map(ing => {
        const key = `x${ing.id.replace(/-/g, '')}`;
        // The result variable `key` holds the fraction (0-1). Convert to percentage.
        const ratio = (res.result.vars[key] ?? 0) * 100;
        return { ...ing, ratio: +ratio.toFixed(2) }; // Round to 2 decimal places for readability
      });

      // Calculate actual nutrient levels and report deviations
      const nutrientDeviations = targets.map(target => {
        const safeName = target.name.replace(/\s+/g, '_');
        // Calculate actual nutrient amount based on optimized ingredient ratios
        const actualNutrientValue = updatedIngredients.reduce(
          (sum, ing) => {
            // ing.ratio is already 0-100, composition value is 0-100, so divide by 100 to get fraction
            const compValue = ing.compositions.find(c => c.nutrient?.name === target.name)?.value || 0;
            return sum + (ing.ratio * compValue) / 100;
          },
          0
        );

        // Retrieve deviation variable values from the GLPK result
        const dPos = res.result.vars[`d_pos_${safeName}`] ?? 0;
        const dNeg = res.result.vars[`d_neg_${safeName}`] ?? 0;

        return {
          ...target,
          name: target.name,
          actual: +actualNutrientValue.toFixed(4), // Actual value (0-100)
          over: +dPos.toFixed(6), // Positive deviation (fraction)
          under: +dNeg.toFixed(6), // Negative deviation (fraction)
        };
      });

      // Identify unmet targets (where significant deviation occurred)
      const unmetTargets = nutrientDeviations.filter(nd => {
        // A target is considered 'unmet' if there's a significant under-deviation or over-deviation
        // You can customize which deviations signify an 'unmet' target based on your requirements.
        return nd.under > FLOATING_POINT_TOLERANCE || nd.over > FLOATING_POINT_TOLERANCE;
      });

      // Determine the overall success message
      const message = unmetTargets.length > 0
        ? 'Optimization successful, but some targets could not be fully met within the specified constraints (deviations occurred).'
        : 'Optimization successful, all targets met within acceptable bounds.';

      return {
        success: true,
        message,
        updatedIngredients,
        nutrientDeviations,
        unmetTargets,
        rawResult: res, // Include raw result for advanced debugging/analysis
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
