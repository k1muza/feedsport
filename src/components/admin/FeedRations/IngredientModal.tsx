import { useState } from "react";
import { Ingredient, RatioIngredient, TargetNutrient } from "@/types";
import { X, ArrowUp, ArrowDown, Search } from "lucide-react";

export const IngredientModal = ({
  show,
  onClose,
  allIngredients,
  existingIngredients,
  existingTargets,
  onAdd,
}: {
  show: boolean;
  onClose: () => void;
  allIngredients: Ingredient[];
  existingIngredients: RatioIngredient[];
  existingTargets: TargetNutrient[];
  onAdd: (ing: Ingredient) => void;
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [nameFilter, setNameFilter] = useState("");

  // Filter and sort logic
  const filteredIngredients = allIngredients
    .filter(ing => 
      !existingIngredients.some(i => i.id === ing.id) &&
      ing.name.toLowerCase().includes(nameFilter.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortColumn) return 0;
      
      const getValue = (ing: Ingredient) => 
        ing.compositions.find(c => c.nutrient?.id === sortColumn)?.value || 0;

      const aVal = getValue(a);
      const bVal = getValue(b);
      
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    });

  // Composition value helper
  const getCompositionValue = (ingredient: Ingredient, targetId: string) => {
    const composition = ingredient.compositions.find(
      c => c.nutrient?.id === targetId
    );
    return composition ? composition.value : 0;
  };

  // Selection handlers
  const handleCheckboxChange = (ingredientId: string) => {
    setSelectedIds(prev =>
      prev.includes(ingredientId)
        ? prev.filter(id => id !== ingredientId)
        : [...prev, ingredientId]
    );
  };

  const handleSelectAll = () => {
    const allSelectableIds = filteredIngredients.map(ing => ing.id);
    setSelectedIds(prev => 
      prev.length === allSelectableIds.length ? [] : allSelectableIds
    );
  };

  // Sorting handlers
  const handleSort = (columnId: string) => {
    if (sortColumn === columnId) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnId);
      setSortDirection("desc");
    }
  };

  // Add selected ingredients
  const handleAddSelected = () => {
    selectedIds.forEach(id => {
      const ingredient = allIngredients.find(ing => ing.id === id);
      if (ingredient) onAdd(ingredient);
    });
    setSelectedIds([]);
    onClose();
  };

  const areAllSelected = filteredIngredients.length > 0 && 
    filteredIngredients.every(ing => selectedIds.includes(ing.id));

  return show ? (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-4xl max-h-[80vh] flex flex-col">
        {/* Fixed Header */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-100">
              Select Ingredients
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-200 p-1">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Name Filter */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Filter ingredients..."
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900 rounded-lg text-gray-200 focus:ring-2 focus:ring-indigo-500 border border-gray-700"
            />
          </div>

          {/* Column Headers */}
          <div className="grid grid-cols-12 gap-4 mt-2 items-center">
            <div className="col-span-4 flex items-center space-x-3">
              <input
                type="checkbox"
                checked={areAllSelected}
                onChange={handleSelectAll}
                className="form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-gray-400">Ingredient</span>
            </div>
            
            {existingTargets.map(target => (
              <div 
                key={target.id}
                onClick={() => handleSort(target.id)}
                className="col-span-2 flex items-center justify-end space-x-1 cursor-pointer hover:bg-gray-700/30 p-1 rounded"
              >
                <span className="text-sm font-medium text-gray-400">
                  {target.name}
                </span>
                {sortColumn === target.id && (
                  sortDirection === "asc" ? (
                    <ArrowUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-gray-400" />
                  )
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-1">
          <div className="space-y-1">
            {filteredIngredients.map(ingredient => {
              const isSelected = selectedIds.includes(ingredient.id);
              
              return (
                <label
                  key={ingredient.id}
                  className={`grid grid-cols-12 gap-4 items-center p-3 rounded-lg cursor-pointer transition-colors ${
                    isSelected ? 'bg-indigo-900/30' : 'hover:bg-gray-700/30'
                  }`}
                >
                  <div className="col-span-4 flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCheckboxChange(ingredient.id)}
                      className="form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <span className="text-gray-100 font-medium truncate">
                      {ingredient.name}
                    </span>
                  </div>
                  
                  {existingTargets.map(target => {
                    const value = getCompositionValue(ingredient, target.id);
                    const unit = ingredient.compositions.find(
                      c => c.nutrient?.id === target.id
                    )?.nutrient?.unit || '';

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
                </label>
              );
            })}
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 p-4">
          <div className="flex justify-between items-center space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">
                {selectedIds.length} selected
              </span>
              <button
                onClick={handleAddSelected}
                disabled={!selectedIds.length}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 px-6 rounded-lg transition-all font-medium"
              >
                Add Selected
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
