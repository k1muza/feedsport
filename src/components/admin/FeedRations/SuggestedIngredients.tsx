import { useState } from "react";
import { Lightbulb, PlusCircle } from "lucide-react";
import { Ingredient } from "@/types";

export const SuggestedIngredients = ({
  suggestions,
  allIngredients,
  ingredients, // Current ingredients in panel
  addIngredient
}: any) => {
  const [expandedNutrient, setExpandedNutrient] = useState<string | null>(null);
  
  // Find ingredients rich in a specific nutrient
  const findNutrientSources = (nutrientName: string) => {
    return allIngredients
      .filter((ingredient: Ingredient) => {
        // Filter out ingredients already in panel
        const isAlreadyAdded = ingredients.some((i: any) => i.id === ingredient.id);
        return !isAlreadyAdded && 
          ingredient.compositions.some(c => 
            c.nutrient?.name === nutrientName && c.value > 0.1
          );
      })
      .map((ingredient: Ingredient) => {
        // Find composition value for this nutrient
        const composition = ingredient.compositions.find(
          (c: any) => c.nutrient?.name === nutrientName
        );
        return {
          ...ingredient,
          compositionValue: composition?.value || 0,
          compositionUnit: composition?.nutrient?.unit,
        };
      })
      // Sort by composition value descending
      .sort((a: any, b: any) => b.compositionValue - a.compositionValue)
      // Limit to top 6 per nutrient
      .slice(0, 6);
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-yellow-400" />
        <h3 className="text-lg font-medium">Nutrient Suggestions</h3>
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion: any, index: number) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-100">
                  {suggestion.nutrient 
                    ? `More ${suggestion.nutrient.name} needed` 
                    : `Add ${suggestion.ingredient?.name}`}
                </h4>
                {suggestion.nutrient && (
                  <p className="text-sm text-gray-400">
                    Current: {suggestion.current.toFixed(2)}{suggestion.nutrient.unit} · 
                    Target: {suggestion.target.toFixed(2)}{suggestion.nutrient.unit}
                  </p>
                )}
              </div>
              
              {suggestion.nutrient ? (
                <button
                  onClick={() => setExpandedNutrient(
                    expandedNutrient === suggestion.nutrient.name 
                      ? null 
                      : suggestion.nutrient.name
                  )}
                  className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium transition-colors"
                >
                  <PlusCircle className="h-4 w-4" />
                  {expandedNutrient === suggestion.nutrient.name ? 'Hide Sources' : 'Find Sources'}
                </button>
              ) : (
                <button
                  onClick={() => suggestion.ingredient && addIngredient(suggestion.ingredient)}
                  className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium transition-colors"
                >
                  <PlusCircle className="h-4 w-4" />
                  Add
                </button>
              )}
            </div>
            
            {suggestion.nutrient && expandedNutrient === suggestion.nutrient.name && (
              <div className="mt-4">
                <p className="text-sm text-gray-300 mb-2">High sources of {suggestion.nutrient.name}:</p>
                <div className="space-y-2">
                  {findNutrientSources(suggestion.nutrient.name).map((ingredient: any) => (
                    <div key={ingredient.id} className="flex justify-between items-center bg-gray-700/50 rounded p-2">
                      <div>
                        <span className="text-sm">{ingredient.name}</span>
                        <span className="text-xs text-gray-400 ml-2">
                          ({ingredient.compositionValue.toFixed(2)}{ingredient.compositionUnit || ''})
                        </span>
                      </div>
                      <button
                        onClick={() => addIngredient(ingredient)}
                        className="flex items-center gap-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs font-medium"
                      >
                        <PlusCircle className="h-3 w-3" />
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
