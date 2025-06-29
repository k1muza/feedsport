import {
  Ingredient,
  IngredientSuggestion,
  NutrientSuggestion
} from "@/types";
import { Lightbulb, PlusCircle } from "lucide-react";
import { useState } from "react";

// New type for enriched ingredient with composition data
type EnrichedIngredient = Ingredient & {
  compositionValue: number;
  compositionUnit?: string;
};

interface SuggestedIngredientsProps {
  suggestions: (NutrientSuggestion | IngredientSuggestion)[];
  allIngredients: Ingredient[];
  ingredients: Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;
}

export const SuggestedIngredients = ({
  suggestions,
  allIngredients,
  ingredients,
  addIngredient
}: SuggestedIngredientsProps) => {
  const [expandedNutrient, setExpandedNutrient] = useState<string | null>(null);
  
  // Find ingredients rich in a specific nutrient
  const findNutrientSources = (nutrientName: string): EnrichedIngredient[] => {
    return allIngredients
      .filter((ingredient) => {
        const isAlreadyAdded = ingredients.some(i => i.id === ingredient.id);
        return !isAlreadyAdded && 
          ingredient.compositions.some(c => 
            c.nutrient?.name === nutrientName && c.value > 0.1
          );
      })
      .map((ingredient) => {
        const composition = ingredient.compositions.find(
          c => c.nutrient?.name === nutrientName
        );
        return {
          ...ingredient,
          compositionValue: composition?.value || 0,
          compositionUnit: composition?.nutrient?.unit,
        };
      })
      .sort((a, b) => b.compositionValue - a.compositionValue)
      .slice(0, 6);
  };

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-yellow-400" />
        <h3 className="text-lg font-medium">Nutrient Suggestions</h3>
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                {'nutrient' in suggestion ? (
                  <>
                    <h4 className="font-medium text-gray-100">
                      More {suggestion.nutrient?.name} needed
                    </h4>
                    <p className="text-sm text-gray-400">
                      Current: {suggestion.current?.toFixed(2)}{suggestion.nutrient?.unit} · 
                      Target: {suggestion.target?.toFixed(2)}{suggestion.nutrient?.unit}
                    </p>
                  </>
                ) : (
                  suggestion.ingredient && (
                    <h4 className="font-medium text-gray-100">
                      Add {suggestion.ingredient.name}
                    </h4>
                  )
                )}
              </div>
              
              {'nutrient' in suggestion ? (
                <button
                  onClick={() => setExpandedNutrient(
                    expandedNutrient === suggestion.nutrient?.name 
                      ? null 
                      : suggestion.nutrient?.name ?? ''
                  )}
                  className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium transition-colors"
                >
                  <PlusCircle className="h-4 w-4" />
                  {expandedNutrient === suggestion.nutrient?.name ? 'Hide Sources' : 'Find Sources'}
                </button>
              ) : (
                suggestion.ingredient && (
                  <button
                    onClick={() => {
                      setExpandedNutrient(null);
                      addIngredient(suggestion.ingredient!)
                    }}
                    className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium transition-colors"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add
                  </button>
                )
              )}
            </div>
            
            {'nutrient' in suggestion && expandedNutrient === suggestion.nutrient?.name && (
              <div className="mt-4">
                <p className="text-sm text-gray-300 mb-2">High sources of {suggestion.nutrient.name}:</p>
                <div className="space-y-2">
                  {findNutrientSources(suggestion.nutrient.name).map((ingredient) => (
                    <div key={ingredient.id} className="flex justify-between items-center bg-gray-200/50 dark:bg-gray-700/50 rounded p-2">
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
