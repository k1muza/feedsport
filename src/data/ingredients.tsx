import { Ingredient } from "@/types";
import { getNutrients } from "./nutrients";
import ingredients from "../data/ingredients.json"


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
export const getIngredients = (): Ingredient[] => (ingredients as Ingredient[]).map(ingredient => {
    return {
        ...ingredient,
        compositions: ingredient.compositions.map(composition => {
            const nutrient = getNutrients().find(n => n.id === composition.nutrientId.toString())
            return {
                ...composition,
                nutrient
            }
        })
    }
})

export const getIngredientById = (id: string): Ingredient|undefined => getIngredients().find(i => i.id === id)
