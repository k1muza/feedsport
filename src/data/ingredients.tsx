import { Ingredient } from "@/types";
import { getNutrients } from "./nutrients";
import { db, seedDatabase } from './db';


/**
 * Returns all ingredients, each with their category and nutrient information.
 *
 * Each ingredient is an object with the following properties:
 *
 * - id: The id of the ingredient.
 * - name: The name of the ingredient.
 * - category: The category this ingredient belongs to.
 * - compositions: An array of compositions of this ingredient. Each composition
 *   is an object with the following properties:
 *
 *   - value: The value of this nutrient in this composition.
 *   - nutrientId: The id of the nutrient for this composition.
 *   - nutrient: The nutrient object for this composition.
 *
 * @returns An array of ingredients with their category and nutrient information.
 */
export const getIngredients = async (): Promise<Ingredient[]> => {
  await seedDatabase();
  const ingredientData = await db.ingredients.toArray();
  const nutrients = await getNutrients();
  return ingredientData.map(ingredient => ({
    ...ingredient,
    compositions: ingredient.compositions.map(composition => ({
      ...composition,
      nutrient: nutrients.find(n => n.id === composition.nutrientId.toString())
    }))
  }));
}

export const getIngredientById = async (id: string): Promise<Ingredient | undefined> => {
  const ingredients = await getIngredients();
  return ingredients.find(i => i.id === id);
}

export const getNutrientAverages = async () => {
  // Flatten all compositions from all ingredients
  const allCompositions = (await getIngredients()).flatMap(ingredient =>
    ingredient.compositions.map(comp => ({
      ...comp,
      ingredientId: ingredient.id
    }))
  );

  // Group by nutrient name
  const compositionsByName: Record<string, { value: number, unit: string, table?: string, basis?: string }[]> = {};

  allCompositions.forEach(comp => {
    if (comp.nutrient) {
      const name = comp.nutrient.name;
      if (!compositionsByName[name]) {
        compositionsByName[name] = [];
      }
      compositionsByName[name].push({
        value: comp.value,
        unit: comp.nutrient.unit || 'g/kg',
        table: comp.table,
        basis: comp.basis
      });
    }
  });

  // Compute average for each nutrient
  const averages: Record<string, { avg: number, unit: string, count: number }> = {};

  Object.entries(compositionsByName).forEach(([name, entries]) => {
    const values = entries.map(e => e.value);
    const sum = values.reduce((acc, val) => acc + val, 0);
    const avg = sum / values.length;
    
    // Use the most common unit
    const unitCounts: Record<string, number> = {};
    entries.forEach(e => {
      unitCounts[e.unit] = (unitCounts[e.unit] || 0) + 1;
    });
    const mostCommonUnit = Object.entries(unitCounts).sort((a, b) => b[1] - a[1])[0][0];
    
    averages[name] = {
      avg,
      unit: mostCommonUnit,
      count: values.length
    };
  });

  return averages;
};
