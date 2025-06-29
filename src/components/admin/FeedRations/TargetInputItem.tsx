// TargetInputItem.tsx
import { TargetNutrient } from "@/types";
import { X } from "lucide-react";
import { useState } from "react";

export const TargetInputItem = ({
  target,
  onUpdate,
  onRemove
}: {
  target: TargetNutrient;
  onUpdate: (field: 'max' | 'target' | 'underPenaltyFactor' | 'overPenaltyFactor', value: number) => void;
  onRemove: () => void;
}) => {
  const [showPenalties, setShowPenalties] = useState(false);
  
  // Default penalty values
  const DEFAULT_UNDER_PENALTY = 1000;
  const DEFAULT_OVER_PENALTY = 1000;

  const handleChange = (field: 'max' | 'target' | 'underPenaltyFactor' | 'overPenaltyFactor', e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Number(e.target.value));
    onUpdate(field, value);
  };

  return (
    <div className="group p-3 bg-gray-700/30 rounded-lg">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {/* Min input */}
        <div className="relative flex-[0_0_6rem] min-w-[80px]">
          <input
            type="number"
            min={0}
            step={0.1}
            value={target.target ?? ''}
            onChange={(e) => handleChange('target', e)}
            placeholder="Min"
            className="w-full pl-2 pr-6 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-600 rounded-md text-gray-200 text-sm focus:ring-1 focus:ring-indigo-500"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            {target.unit}
          </span>
        </div>

        {/* Max input */}
        <div className="relative flex-[0_0_6rem] min-w-[80px]">
          <input
            type="number"
            min={0}
            step={0.1}
            value={target.max ?? ''}
            onChange={(e) => handleChange('max', e)}
            placeholder="Max"
            className="w-full pl-2 pr-6 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-600 rounded-md text-gray-200 text-sm focus:ring-1 focus:ring-indigo-500"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            {target.unit}
          </span>
        </div>

        {/* Penalty toggle */}
        <button
          onClick={() => setShowPenalties(!showPenalties)}
          className="ml-auto px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors"
          aria-label={showPenalties ? "Hide penalties" : "Show penalties"}
        >
          {showPenalties ? "▲ Penalties" : "▼ Penalties"}
        </button>

        {/* Remove button */}
        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-red-400 transition-colors flex-[0_0_auto] flex"
          aria-label={`Remove ${target.name} target`}
        >
          <X className="w-4 h-4" /> <span className="text-xs">Remove</span>
        </button>
      </div>

      {/* Penalty inputs (collapsible) */}
      {showPenalties && (
        <div className="mt-3 pt-3 border-t border-gray-600 grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Under Penalty
            </label>
            <input
              type="number"
              min={0}
              step={100}
              value={target.underPenaltyFactor ?? ''}
              onChange={(e) => handleChange('underPenaltyFactor', e)}
              placeholder={`Default (${DEFAULT_UNDER_PENALTY})`}
              className="w-full pl-2 pr-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-600 rounded-md text-gray-200 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Over Penalty
            </label>
            <input
              type="number"
              min={0}
              step={100}
              value={target.overPenaltyFactor ?? ''}
              onChange={(e) => handleChange('overPenaltyFactor', e)}
              placeholder={`Default (${DEFAULT_OVER_PENALTY})`}
              className="w-full pl-2 pr-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-600 rounded-md text-gray-200 text-sm"
            />
          </div>
          <div className="col-span-2 text-xs text-gray-500 mt-1">
            Higher values prioritize meeting this target
          </div>
        </div>
      )}
    </div>
  );
};
