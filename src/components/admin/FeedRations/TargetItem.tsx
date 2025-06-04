import { TargetNutrient } from "@/types";
import { X } from "lucide-react";

export const TargetItem = ({
  target,
  onUpdate,
  onRemove
}: {
  target: TargetNutrient;
  onUpdate: (value: number) => void;
  onRemove: () => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(100, Math.max(0, Number(e.target.value)));
    onUpdate(value);
  };

  return (
    <div className="group space-y-2 p-3 bg-gray-700/30 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <span className="text-sm text-gray-300 truncate flex-1">{target.name}</span>
          <div className="relative flex-1 max-w-[120px]">
            <input
              type="number"
              min={0}
              max={100}
              step={0.1}
              value={target.value}
              onChange={handleChange}
              className="w-full pl-2 pr-6 py-1 bg-gray-800 border border-gray-600 rounded-md text-gray-200 text-sm focus:ring-1 focus:ring-indigo-500"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="ml-2 text-gray-400 hover:text-red-400 transition-colors"
          aria-label={`Remove ${target.name} target`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
