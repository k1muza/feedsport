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
    <div className="group p-3 bg-gray-700/30 rounded-lg">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {/* Nutrient name - takes available space but truncates on small screens */}
        <span className="text-sm text-gray-300 truncate min-w-0 flex-[1_1_8rem]">
          {target.name}
        </span>

        {/* Input with unit - fixed width but responsive */}
        <div className="relative flex-[0_0_7.5rem] min-w-[120px]">
          <input
            type="number"
            min={0}
            max={100}
            step={0.1}
            value={target.value}
            onChange={handleChange}
            className="w-full pl-2 pr-6 py-1 bg-gray-800 border border-gray-600 rounded-md text-gray-200 text-sm focus:ring-1 focus:ring-indigo-500"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            {target.unit}
          </span>
        </div>

        {/* Remove button - stays aligned to input */}
        <button
          onClick={onRemove}
          className="ml-auto text-gray-400 hover:text-red-400 transition-colors flex-[0_0_auto]"
          aria-label={`Remove ${target.name} target`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
