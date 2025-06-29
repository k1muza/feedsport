import { Ingredient, TargetNutrient } from "@/types";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface IngredientSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  allIngredients: Ingredient[];
  ingredients: Ingredient[];
  targets: TargetNutrient[];
  visibleColumns: string[];
  addIngredient: (ingredient: Ingredient) => void;
}

export const IngredientSelectionModal = ({
  isOpen,
  onClose,
  allIngredients,
  ingredients,
  targets,
  visibleColumns,
  addIngredient
}: IngredientSelectionModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    if (isOpen) {
      if (searchTerm) {
        setFilteredIngredients(
          allIngredients.filter((ing: Ingredient) => 
            ing.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      } else {
        setFilteredIngredients(allIngredients);
      }
    }
  }, [searchTerm, allIngredients, isOpen]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-100 dark:bg-gray-800 border border-gray-700 rounded-lg w-full max-w-4xl max-h-[80vh] flex flex-col">
        <div className="sticky top-0 bg-gray-100 dark:bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-100">Select Ingredients</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-200 p-1">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Filter ingredients..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 rounded-lg text-gray-200 focus:ring-2 focus:ring-indigo-500 border border-gray-700"
            />
          </div>

          <div className="grid grid-cols-12 gap-4 mt-2 items-center">
            <div className="col-span-4 flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-400">Ingredient</span>
            </div>
            {targets.filter(t => visibleColumns.includes(t.id)).map(target => (
              <div
                key={target.id}
                className="col-span-2 flex items-center justify-end space-x-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700/30 p-1 rounded"
              >
                <span className="text-sm font-medium text-gray-400">
                  {target.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-y-auto flex-1 p-1">
          <div className="space-y-1">
            {filteredIngredients
              .filter(ing => !ingredients.some(i => i.id === ing.id))
              .map(ingredient => (
                <div
                  key={ingredient.id}
                  className="grid grid-cols-12 gap-4 items-center p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700/30 cursor-pointer"
                  onClick={() => addIngredient(ingredient)}
                >
                  <div className="col-span-4">
                    <span className="text-gray-100 font-medium truncate">
                      {ingredient.name}
                    </span>
                  </div>
                  {targets.filter(t => visibleColumns.includes(t.id)).map(target => {
                    const value = ingredient.compositions.find(c => c.nutrient?.id === target.id)?.value || 0;
                    const unit = ingredient.compositions.find(c => c.nutrient?.id === target.id)?.nutrient?.unit || '';
                    return (
                      <div
                        key={target.id}
                        className="col-span-2 text-right text-sm text-gray-300"
                      >
                        <span className="font-mono">{value.toFixed(2)}</span>
                        <span className="text-gray-500 ml-1 text-xs">{unit}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-100 dark:bg-gray-800 border-t border-gray-700 p-4">
          <div className="flex justify-between items-center space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-gray-300 hover:text-white hover:bg-gray-200/50 dark:bg-gray-700/50 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
