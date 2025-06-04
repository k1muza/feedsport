// SuggestedIngredients.jsx
import { Lightbulb, PlusCircle } from "lucide-react";

export const SuggestedIngredients = ({
  suggestions,
  ingredients,
  addIngredient
}: any) => (
  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
    <div className="flex items-center gap-2 mb-4">
      <Lightbulb className="h-5 w-5 text-yellow-400" />
      <h3 className="text-lg font-medium">Suggested Ingredients</h3>
    </div>

    <div className="space-y-4">
      {suggestions
        .filter((s: any) => !ingredients.some((i: any) => i.id === s.ingredient?.id))
        .map((suggestion: any, index: number) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-100">{suggestion.ingredient?.name}</h4>
              </div>
              <button
                onClick={() => suggestion.ingredient && addIngredient(suggestion.ingredient)}
                className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium transition-colors"
              >
                <PlusCircle className="h-4 w-4" />
                Add
              </button>
            </div>
          </div>
        ))}
    </div>
  </div>
);
