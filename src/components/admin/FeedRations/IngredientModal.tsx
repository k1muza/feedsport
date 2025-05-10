import { Ingredient, RatioIngredient } from "@/data/ingredients";
import { Plus, X } from "lucide-react";

// Ingredient Modal Component
export const IngredientModal = ({
  show,
  onClose,
  allIngredients,
  existingIngredients,
  onAdd,
}: {
  show: boolean;
  onClose: () => void;
  allIngredients: Ingredient[];
  existingIngredients: RatioIngredient[];
  onAdd: (ing: Ingredient) => void;
}) => (
  show ? (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-200">Select Ingredient</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2">
          {allIngredients
            .filter(ing => !existingIngredients.some(i => i.id === ing.id))
            .map(ingredient => (
              <button
                key={ingredient.id}
                onClick={() => onAdd(ingredient)}
                className="w-full py-2 px-3 flex justify-between items-center hover:bg-gray-700/50 rounded transition-colors text-left text-gray-200"
              >
                <span>{ingredient.name}</span>
                <Plus className="w-4 h-4 text-indigo-400" />
              </button>
            ))}
        </div>
      </div>
    </div>
  ) : null
);

