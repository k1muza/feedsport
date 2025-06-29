// TargetSelectionModal.jsx
import { Nutrient, TargetNutrient } from "@/types";
import { Search, X } from "lucide-react";

interface TargetSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  allNutrients: Nutrient[];
  targets: TargetNutrient[];
  addTargets: (targets: TargetNutrient[]) => void;
}

export const TargetSelectionModal = ({
  isOpen,
  onClose,
  allNutrients,
  targets,
  addTargets
}: TargetSelectionModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-100 dark:bg-gray-800 border border-gray-700 rounded-lg w-full max-w-md flex flex-col max-h-[90vh]">
        <div className="sticky top-0 bg-gray-100 dark:bg-gray-800 border-b border-gray-700 p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Add Nutrient Targets
            </h3>
            <button
              onClick={onClose}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search nutrients..."
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-700 rounded-lg text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              autoFocus
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {allNutrients
            .filter(n => !targets.some(t => t.id === n.id))
            .map(nutrient => (
              <div
                key={nutrient.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700/30 cursor-pointer"
                onClick={() => addTargets([{ 
                  id: nutrient.id, 
                  name: nutrient.name, 
                  target: 0, 
                  unit: nutrient.unit, 
                  description: nutrient.description || '' 
                }])}
              >
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-700 dark:text-gray-200 truncate">{nutrient.name}</span>
                </div>
              </div>
            ))}
        </div>

          <div className="sticky bottom-0 bg-gray-100 dark:bg-gray-800 border-t border-gray-700 p-4">
            <div className="flex justify-between items-center">
              <button
                onClick={onClose}
                className="px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
