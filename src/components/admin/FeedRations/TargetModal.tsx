import { useState, useEffect } from "react";
import { Nutrient, TargetNutrient } from "@/types";
import { X, Search, Check } from "lucide-react";

export const TargetModal = ({
  show,
  onClose,
  allNutrients,
  existingTargets,
  onAdd,
}: {
  show: boolean;
  onClose: () => void;
  allNutrients: Nutrient[];
  existingTargets: TargetNutrient[];
  onAdd: (targets: TargetNutrient[]) => void;
}) => {
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [filteredNutrients, setFilteredNutrients] = useState<Nutrient[]>([]);

  // Filter and cache nutrients
  useEffect(() => {
    const available = allNutrients.filter(
      n => !existingTargets.some(t => t.id === n.id)
    );
    
    const filtered = available.filter(n =>
      n.name.toLowerCase().includes(filter.toLowerCase())
    );

    setFilteredNutrients(filtered);
  }, [allNutrients, existingTargets, filter]);

  const handleValueChange = (id: string, value: string) => {
    let numericValue = Number(value);
    if (isNaN(numericValue)) {
      numericValue = 0;
    }
    
    setSelected(prev => {
      const newState = { ...prev };
      if (value === "") {
        delete newState[id];
      } else {
        newState[id] = numericValue;
      }
      return newState;
    });
  };

  const handleAdd = () => {
    const targets = Object.entries(selected)
      .map(([id, value]) => ({
        id,
        name: allNutrients.find(n => n.id === id)!.name,
        value
      }));
    
    onAdd(targets);
    setSelected({});
    onClose();
  };

  const selectedCount = Object.keys(selected).length;

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-md flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-100">
              Add Nutrient Targets
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search nutrients..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              autoFocus
            />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredNutrients.map((nutrient) => {
            const isSelected = nutrient.id in selected;
            const currentValue = selected[nutrient.id] ?? "";

            return (
              <div
                key={nutrient.id}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                  isSelected ? "bg-cyan-900/20" : "hover:bg-gray-700/30"
                }`}
              >
                <div className="flex items-center space-x-3">
                  {isSelected && (
                    <Check className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                  )}
                  <span className="text-gray-200 truncate">{nutrient.name}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      step={0.1}
                      placeholder="0"
                      value={currentValue}
                      onChange={(e) => handleValueChange(nutrient.id, e.target.value)}
                      className="w-24 pl-3 pr-8 py-1.5 bg-gray-900 border border-gray-700 rounded-md text-gray-200 text-right focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      aria-label={`${nutrient.name} percentage`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                      %
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 p-4">
          <div className="flex justify-between items-center">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <div className="flex items-center space-x-3">
              {selectedCount > 0 && (
                <span className="text-sm text-gray-400">
                  {selectedCount} selected
                </span>
              )}
              <button
                onClick={handleAdd}
                disabled={selectedCount === 0}
                className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg transition-colors flex items-center space-x-2"
              >
                <span>Add Targets</span>
                {selectedCount > 0 && (
                  <span className="bg-cyan-700/30 px-2 py-1 rounded text-sm">
                    {selectedCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
