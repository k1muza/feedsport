'use client';

import { Ingredient, IngredientSuggestion, RatioIngredient } from '@/types';
import { Lightbulb, PlusCircleIcon } from 'lucide-react';

interface IngredientSuggestionPanelProps {
  ingredients: RatioIngredient[];
  suggestions: IngredientSuggestion[];
  onAdd: (ing: Ingredient) => void;
  className?: string;
}

export const IngredientSuggestionPanel = ({
  suggestions,
  ingredients,
  onAdd,
  className = '',
}: IngredientSuggestionPanelProps) => {
  const filteredSuggestions = suggestions.filter((suggestion) => !ingredients.some((ing) => ing.id === suggestion.ingredient?.id));
  
  if (suggestions.length === 0) return null;

  const handleAdd = (ing: Ingredient|undefined) => {
    if (ing)
      onAdd(ing);
  };

  return (
    <div className={`bg-gray-800/50 border border-gray-700 rounded-xl p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-yellow-400" />
        <h3 className="text-lg font-medium">Suggested Ingredients</h3>
      </div>

      <div className="space-y-4">
        {filteredSuggestions.map((suggestion, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-100">{suggestion.ingredient?.name}</h4>
              </div>

              <button
                onClick={() => handleAdd(suggestion.ingredient)}
                className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium transition-colors"
              >
                <PlusCircleIcon className="h-4 w-4" />
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};