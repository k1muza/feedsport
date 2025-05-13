import { Nutrient, TargetNutrient } from "@/types";
import { X } from "lucide-react";

// Target Modal Component
export const TargetModal = ({
  show,
  onClose,
  allNutrients,
  existingTargets,
  onAdd,
  newId,
  setNewId,
  newValue,
  setNewValue,
}: {
  show: boolean;
  onClose: () => void;
  allNutrients: Nutrient[];
  existingTargets: TargetNutrient[];
  onAdd: () => void;
  newId: string;
  setNewId: (id: string) => void;
  newValue: number;
  setNewValue: (value: number) => void;
}) => (
  show ? (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-200">Add Nutrient Target</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          <select
            value={newId}
            onChange={e => setNewId(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-200"
          >
            <option value="">Select Nutrient</option>
            {allNutrients
              .filter(n => !existingTargets.some(t => t.id === n.id))
              .map(nutrient => (
                <option key={nutrient.id} value={nutrient.id}>
                  {nutrient.name}
                </option>
              ))}
          </select>
          <div className="relative">
            <input
              type="number"
              min={0}
              max={100}
              value={newValue}
              onChange={e => setNewValue(Number(e.target.value))}
              placeholder="Target %"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-200"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
          </div>
          <button
            onClick={onAdd}
            className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded text-white"
          >
            Add Target
          </button>
        </div>
      </div>
    </div>
  ) : null
);