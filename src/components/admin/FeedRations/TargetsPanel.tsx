import { TargetNutrient } from "@/types";
import { CheckCircle, Plus, Rabbit } from "lucide-react";
import { useMemo } from "react";
import { TargetItem } from "./TargetItem";

interface TargetsPanelProps {
  targets: TargetNutrient[];
  showMetTargets: boolean;
  setShowMetTargets: (show: boolean) => void;
  metTargets: TargetNutrient[];
  unmetTargets: TargetNutrient[];
  computedValues: Record<string, number>;
  updateTarget: (id: string, field: "max" | "target" | "underPenaltyFactor" | "overPenaltyFactor", value: number) => void;
  removeTarget: (id: string) => void;
  onOpenAnimalModal: () => void;
  onOpenTargetModal: () => void;
}

export const TargetsPanel = ({
  targets,
  showMetTargets,
  setShowMetTargets,
  metTargets,
  unmetTargets,
  computedValues,
  updateTarget,
  removeTarget,
  onOpenAnimalModal,
  onOpenTargetModal
}: TargetsPanelProps) => {
  // Check if all targets are met
  const allTargetsMet = unmetTargets.length === 0 && targets.length > 0;

  // Create a normalized computed values map by nutrient ID
  const computedValuesById = useMemo(() => {
    const valuesMap: Record<string, number> = {};
    targets.forEach(target => {
      valuesMap[target.id] = computedValues[target.name] || 0;
    });
    return valuesMap;
  }, [computedValues, targets]);

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 border border-gray-700 rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Nutrient Targets</h3>

          {/* Success indicator when all targets are met */}
          {allTargetsMet && (
            <span
              className="flex items-center gap-1 text-sm bg-green-900/50 text-green-400 px-2 py-1 rounded-full"
              title="All nutrient targets are met"
            >
              <CheckCircle className="w-4 h-4" />
              <span>All Met</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAnimalModal}
            className="p-2 text-white hover:bg-gray-200 dark:bg-gray-700 rounded-md"
            title="Select animal program"
            type="button"
          >
            <Rabbit className="w-5 h-5" />
          </button>
          <button
            onClick={onOpenTargetModal}
            className="p-2 text-gray-400 hover:bg-gray-200 dark:bg-gray-700 rounded-md"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              id="showMetTargets"
              checked={showMetTargets}
              onChange={(e) => setShowMetTargets(e.target.checked)}
              className="form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <label htmlFor="showMetTargets" className="text-sm text-gray-400">
              Show met targets
            </label>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">
              <span className="text-green-400">{metTargets.length}</span> met ·{' '}
              <span className={unmetTargets.length ? "text-red-400" : "text-green-400"}>
                {unmetTargets.length}
              </span> unmet
            </span>
          </div>
        </div>
        {/* Success message when all targets are met */}
        {allTargetsMet && (
          <div className="bg-green-900/20 border border-green-800/50 rounded-lg p-3 flex items-center gap-2 text-green-400">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="font-medium">All nutrient targets met!</p>
              <p className="text-xs opacity-80">Your formulation meets all nutritional requirements</p>
            </div>
          </div>
        )}

        {targets.map((target) => (
          <TargetItem
            key={target.id}
            value={computedValuesById[target.id] || 0}
            target={target}
            onUpdate={(field, value) => updateTarget(target.id, field, value)} // Updated
            onRemove={() => removeTarget(target.id)}
          />
        ))}
      </div>
    </div>
  );
};
