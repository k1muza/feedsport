import { RatioIngredient, TargetNutrient, OptimizationResult, Nutrient } from '@/types';

type Profile = Record<string, number>;

type BlendMetrics = {
  absoluteNutrientTotals: Profile; // Fixed typo
  totalRatio: number;
  concentrationProfile: Profile;
};

export class IngredientAnalyser {
  // Provide a minimal singleton interface for legacy usage
  private static _instance: IngredientAnalyser = new IngredientAnalyser();

  // Prevent accidental instantiation from outside
  private constructor() {}

  static getInstance(): IngredientAnalyser {
    return this._instance;
  }

  analyze(
    ingredients: RatioIngredient[],
    targets: TargetNutrient[],
    initialStepSize = 0.15,
    maxIterations = 2000,
    tolerance = 1e-6,
    minIngredientRatio = 0.001,
    maxStagnation = 20,
    stepSizeDecayFactor = 0.9,
    minStepSize = 0.02,
    stepSizeImprovementThreshold = 30,
    blendTotalRatioPenaltyMultiplier = 1000,
    minBlendRatioForPenalty = 0.001
  ): OptimizationResult {
    return IngredientAnalyser.analyze(
      ingredients,
      targets,
      initialStepSize,
      maxIterations,
      tolerance,
      minIngredientRatio,
      maxStagnation,
      stepSizeDecayFactor,
      minStepSize,
      stepSizeImprovementThreshold,
      blendTotalRatioPenaltyMultiplier,
      minBlendRatioForPenalty
    );
  }

  /**
   * Optimizes ingredient ratios to meet target nutrient profiles using an iterative search approach.
   * @param ingredients The list of ingredients with their initial ratios and compositions.
   * @param targets The target nutrient values.
   * @param initialStepSize The initial step size for adjusting ingredient ratios.
   * @param maxIterations The maximum number of iterations for the optimization loop.
   * @param tolerance The acceptable cost threshold for considering targets met.
   * @param minIngredientRatio The minimum allowed ratio for any individual ingredient (to prevent zeroing out).
   * @param maxStagnation The number of iterations without significant improvement before stopping.
   * @param stepSizeDecayFactor The factor by which stepSize is reduced if no improvement is seen for a while.
   * @param minStepSize The minimum step size allowed during reduction.
   * @param stepSizeImprovementThreshold The number of iterations without improvement that triggers step size reduction.
   * @param blendTotalRatioPenaltyMultiplier The multiplier for the penalty applied in the cost function if the total blend ratio is too small.
   * @param minBlendRatioForPenalty The threshold for the total blend ratio to trigger the penalty.
   * @returns An OptimizationResult indicating success, updated ingredients, and suggestions.
   */
  public static analyze(
    ingredients: RatioIngredient[],
    targets: TargetNutrient[],
    initialStepSize = 0.15, // Renamed for clarity
    maxIterations = 2000,
    tolerance = 1e-6,
    minIngredientRatio = 0.001, // Configurable min ratio for individual ingredients
    maxStagnation = 20,         // Configurable stagnation allowance
    stepSizeDecayFactor = 0.9,  // Configurable step size decay
    minStepSize = 0.02,         // Configurable min step size
    stepSizeImprovementThreshold = 30, // Configurable iterations before step decay
    blendTotalRatioPenaltyMultiplier = 1000, // Configurable penalty for small total blend
    minBlendRatioForPenalty = 0.001 // Configurable threshold for total blend penalty
  ): OptimizationResult {
    // Initialize with normalized ratios ensuring minimum presence
    const initialRatio = 1 / ingredients.length;
    const workingIngredients = ingredients.map(ing => ({
      ...ing,
      compositions: ing.compositions.map(comp => ({ ...comp })),
      ratio: initialRatio,
      minRatio: minIngredientRatio // Use the new parameter
    }));

    const targetMap = new Map<string, TargetNutrient>();
    targets.forEach(t => targetMap.set(t.name, t));

    // Initial metrics calculation
    let { absoluteNutrientTotals, totalRatio, concentrationProfile } = 
      this.computeBlendMetrics(workingIngredients);
    let currentCost = this.computeCost(
      concentrationProfile, 
      targetMap, 
      totalRatio, 
      blendTotalRatioPenaltyMultiplier, 
      minBlendRatioForPenalty
    );

    const result: OptimizationResult = {
      success: false,
      message: '',
      updatedIngredients: undefined,
      suggestions: [],
    };

    // Quick check for existing solution
    if (currentCost < tolerance) {
      result.success = true;
      result.message = 'Initial blend meets targets';
      result.updatedIngredients = workingIngredients;
      return result;
    }

    let previousCost = currentCost;
    let stagnationCount = 0;
    let currentStepSize = initialStepSize; // Use the initialStepSize parameter
    let bestSolution = this.cloneIngredients(workingIngredients);
    let bestCost = currentCost;
    let lastImprovementIter = 0;

    for (let iter = 0; iter < maxIterations; iter++) {
      // Reduce step size if no improvement in last 'stepSizeImprovementThreshold' iterations
      if (iter - lastImprovementIter > stepSizeImprovementThreshold) {
        currentStepSize = Math.max(currentStepSize * stepSizeDecayFactor, minStepSize);
      }

      const order = this.getShuffledIndices(workingIngredients.length);

      for (const idx of order) {
        const ingredient = workingIngredients[idx];
        const originalRatio = ingredient.ratio;
        
        // Evaluate potential changes
        const trials = [
          { ratio: originalRatio + currentStepSize, desc: 'increase' },
          { ratio: originalRatio - currentStepSize, desc: 'decrease' } // Let effectiveTrialRatio handle min constraint
        ];
        
        // Only consider minimizing to minRatio if ingredient has positive ratio above minimum
        if (originalRatio > ingredient.minRatio) {
          trials.push({ ratio: ingredient.minRatio, desc: 'minimize' });
        }

        let bestTrial = { ratio: originalRatio, cost: currentCost };
        let bestMetrics = { absoluteNutrientTotals, totalRatio, concentrationProfile };

        for (const trial of trials) {
          // Ensure trial ratio respects minIngredientRatio
          const effectiveTrialRatio = Math.max(trial.ratio, ingredient.minRatio);
          
          if (effectiveTrialRatio === originalRatio) continue; // Skip if trial ratio (after constraint) is identical to original
          
          const trialResult = this.evaluateTrial(
            ingredient,
            originalRatio,
            effectiveTrialRatio, // Use effectiveTrialRatio
            absoluteNutrientTotals,
            totalRatio,
            targetMap,
            blendTotalRatioPenaltyMultiplier, // Pass penalty parameters
            minBlendRatioForPenalty
          );
          
          if (trialResult.newCost < bestTrial.cost) {
            bestTrial = { ratio: effectiveTrialRatio, cost: trialResult.newCost }; // Use effectiveTrialRatio
            bestMetrics = {
              absoluteNutrientTotals: trialResult.newAbsoluteNutrientTotals,
              totalRatio: trialResult.newTotalRatio,
              concentrationProfile: trialResult.newConcentrationProfile
            };
          }
        }

        // Apply best trial if it's better
        if (bestTrial.ratio !== originalRatio) {
          ingredient.ratio = bestTrial.ratio;
          absoluteNutrientTotals = bestMetrics.absoluteNutrientTotals;
          totalRatio = bestMetrics.totalRatio;
          concentrationProfile = bestMetrics.concentrationProfile;
          currentCost = bestTrial.cost;

          // Track best solution found
          if (currentCost < bestCost) {
            bestCost = currentCost;
            bestSolution = this.cloneIngredients(workingIngredients);
            lastImprovementIter = iter;
          }
        }
      }

      // Check for convergence
      if (currentCost < tolerance) {
        result.success = true;
        result.message = `Targets met after ${iter + 1} iterations`;
        break; // Stop early if converged
      }

      // Check for stagnation
      const improvement = previousCost - currentCost;
      if (improvement < tolerance * previousCost) { // Using relative improvement for stagnation
        stagnationCount++;
        if (stagnationCount >= maxStagnation) { // Use maxStagnation parameter
          result.message = `Stopped after ${iter + 1} iterations (no significant improvement)`;
          break;
        }
      } else {
        stagnationCount = 0; // Reset stagnation count if there was significant improvement
      }

      // Final iteration message (only if no other message has been set)
      if (iter === maxIterations - 1 && !result.message) { 
        result.message = `Reached maximum iterations (${maxIterations})`;
      }

      previousCost = currentCost;
    }

    // Ensure bestSolution is available
    if (!bestSolution) {
        result.success = false;
        result.message = (result.message ? result.message + '. ' : '') + "Optimization failed to find a valid solution.";
        return result;
    }

    // Use the best solution found during optimization for the final result
    const finalMetrics = this.computeBlendMetrics(bestSolution);
    
    // Set success based on the best cost achieved
    result.success = bestCost < tolerance; 
    result.updatedIngredients = bestSolution;
    result.suggestions = this.getSuggestions(
      finalMetrics.concentrationProfile, 
      targets,
      tolerance
    );

    // Add a warning or override success if the total blend ratio is too low
    if (finalMetrics.totalRatio < minBlendRatioForPenalty) {
      if (result.success) { // If it was "successful" but total ratio is too low, it's not a true success
          result.success = false;
          result.message = (result.message ? result.message + '. ' : '') + "Optimization converged, but resulted in a blend with very low total ratio, potentially indicating an empty or trivial solution.";
      } else { // If already failed, just add the low total ratio as another reason
          result.message = (result.message ? result.message + '. ' : '') + "Optimization resulted in a blend with very low total ratio.";
      }
    }

    return result;
  }

  // All helper methods now static
  private static cloneIngredients(ingredients: RatioIngredient[]): RatioIngredient[] {
    return ingredients.map(ing => ({
      ...ing,
      compositions: ing.compositions.map(comp => ({ ...comp })),
      ratio: ing.ratio
    }));
  }

  private static getShuffledIndices(length: number): number[] {
    const indices = Array.from({ length }, (_, i) => i);
    for (let i = length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }

  private static evaluateTrial(
    ingredient: RatioIngredient,
    originalRatio: number,
    trialRatio: number,
    currentAbsoluteNutrientTotals: Profile,
    currentTotalRatio: number,
    targetMap: Map<string, TargetNutrient>,
    blendTotalRatioPenaltyMultiplier: number, // Pass penalty parameters
    minBlendRatioForPenalty: number
  ): { 
    newCost: number;
    newAbsoluteNutrientTotals: Profile;
    newTotalRatio: number;
    newConcentrationProfile: Profile;
  } {
    const deltaRatio = trialRatio - originalRatio;
    const newTotalRatio = currentTotalRatio + deltaRatio;
    const newAbsoluteNutrientTotals = { ...currentAbsoluteNutrientTotals };

    // Update nutrient totals
    for (const comp of ingredient.compositions) {
      const key = comp.nutrient?.name || comp.nutrientId.toString();
      newAbsoluteNutrientTotals[key] = (newAbsoluteNutrientTotals[key] || 0) + deltaRatio * comp.value;
    }

    // Compute new concentration profile
    const newConcentrationProfile: Profile = {};
    if (newTotalRatio > 0) { // Avoid division by zero
      for (const [nutrient, totalValue] of Object.entries(newAbsoluteNutrientTotals)) {
        newConcentrationProfile[nutrient] = totalValue / newTotalRatio;
      }
    } 
    // If newTotalRatio is 0 or negative, concentrationProfile remains empty, 
    // and the cost function's totalRatio penalty will handle it.

    const newCost = this.computeCost(
      newConcentrationProfile, 
      targetMap, 
      newTotalRatio, 
      blendTotalRatioPenaltyMultiplier, 
      minBlendRatioForPenalty
    );

    return {
      newCost,
      newAbsoluteNutrientTotals,
      newTotalRatio,
      newConcentrationProfile
    };
  }

  private static computeBlendMetrics(ingredients: RatioIngredient[]): BlendMetrics {
    const absoluteNutrientTotals: Profile = {}; // Fixed typo
    let totalRatio = 0;

    for (const ing of ingredients) {
      totalRatio += ing.ratio;
      for (const comp of ing.compositions) {
        const key = comp.nutrient?.name || comp.nutrientId.toString();
        absoluteNutrientTotals[key] = (absoluteNutrientTotals[key] || 0) + ing.ratio * comp.value;
      }
    }

    const concentrationProfile: Profile = {};
    if (totalRatio > 0) {
      for (const [nutrient, totalValue] of Object.entries(absoluteNutrientTotals)) {
        concentrationProfile[nutrient] = totalValue / totalRatio;
      }
    }

    return { absoluteNutrientTotals, totalRatio, concentrationProfile };
  }

  private static computeCost(
    profile: Profile, 
    targets: Map<string, TargetNutrient>,
    totalRatio: number,
    blendTotalRatioPenaltyMultiplier: number, // Receive penalty parameters
    minBlendRatioForPenalty: number
  ): number {
    let cost = 0;
    for (const [targetName, targetNutrient] of targets.entries()) {
      const current = profile[targetName] || 0;
      const error = targetNutrient.target - current;
      // Normalize by target value to balance nutrient contributions.
      // Adding a small epsilon to the denominator prevents division by zero,
      // and makes deviations from 0 targets very costly, which is usually desired.
      const normalizedError = error / (Math.abs(targetNutrient.target) + 1e-8); 
      cost += normalizedError * normalizedError;
    }

    // Add penalty for very small total ratios to prevent all-zero solutions
    if (totalRatio < minBlendRatioForPenalty) {
      cost += blendTotalRatioPenaltyMultiplier * (minBlendRatioForPenalty - totalRatio);
    }

    return cost;
  }

  private static getSuggestions(
    profile: Profile,
    targets: TargetNutrient[],
    tolerance: number
  ) {
    return targets
      .filter(t => Math.abs((profile[t.name] || 0) - t.target) > tolerance)
      .map(t => ({
        nutrient: {
          id: t.id, // Assuming TargetNutrient has an 'id'
          name: t.name,
          unit: t.unit || '', // Fallback if TargetNutrient doesn't carry unit info
          description: t.description || '', // Fallback if TargetNutrient doesn't carry description
          createdAt: '',
          updatedAt: ''
        } as Nutrient, // Cast implies this structure matches the Nutrient type
        target: t.target,
        current: profile[t.name] || 0,
        deviation: (profile[t.name] || 0) - t.target
      }));
  }
}
