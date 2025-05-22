import { TargetNutrient } from "@/types";
import { X, Edit, Eye } from "lucide-react";
import { useCallback, memo } from "react";

interface ProgressBarProps {
  value: number;
  target: number;
  met: boolean;
}

const ProgressBar = ({ value, target, met }: ProgressBarProps) => (
  <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
    <div
      className="h-full rounded-full transition-all duration-300"
      style={{
        width: `${Math.min(100, (value / target) * 100)}%`,
        backgroundColor: met ? "#10B981" : "#EF4444",
      }}
    />
  </div>
);

interface TargetItemProps {
  target: TargetNutrient;
  onUpdate: (value: number) => void;
  onRemove: () => void;
}

const TargetItem = memo(({ target, onUpdate, onRemove }: TargetItemProps) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.min(100, Math.max(0, Number(e.target.value)));
      onUpdate(value);
    },
    [onUpdate]
  );

  return (
    <div className="group space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <span className="text-sm text-gray-400 w-24 truncate">{target.name}</span>
          <div className="relative flex-1">
            <input
              type="number"
              min={0}
              max={100}
              step={0.1}
              value={target.value}
              onChange={handleChange}
              className="w-full pl-2 pr-6 py-1 bg-gray-700 border border-gray-600 rounded-md text-gray-200 text-sm focus:ring-1 focus:ring-indigo-500"
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
});

TargetItem.displayName = 'TargetItem';

interface ResultItemProps {
  target: TargetNutrient;
  value: number;
}

const ResultItem = memo(({ target, value }: ResultItemProps) => {
  const met = value >= target.value * 0.95;
  const statusText = met ? "Met" : "Below";
  const statusColor = met ? "text-green-400" : "text-red-400";

  return (
    <div className="p-3 rounded-lg bg-gray-700/30">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-300">{target.name}</span>
        <span className={`text-xs ${statusColor}`}>{statusText}</span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-lg font-medium">{value.toFixed(1)}%</span>
        <span className="text-sm text-gray-400">Target: {target.value}%</span>
      </div>
      <ProgressBar value={value} target={target.value} met={met} />
    </div>
  );
});

ResultItem.displayName = 'ResultItem';

export const LeftPanel = memo(({
  showPanel,
  targets,
  computedValues,
  onSwitchPanel,
  onUpdateTarget,
  onRemoveTarget,
}: {
  showPanel: 'targets' | 'results';
  targets: TargetNutrient[];
  computedValues: Record<string, number>;
  onSwitchPanel: (panel: 'targets' | 'results') => void;
  onUpdateTarget: (id: string, v: number) => void;
  onRemoveTarget: (id: string) => void;
}) => {
  return (
    <div className="lg:w-80">
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 h-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-100">Nutrients</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSwitchPanel('targets')}
              className={`p-1.5 rounded-md ${showPanel === 'targets' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
              aria-label="Edit targets"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={() => onSwitchPanel('results')}
              className={`p-1.5 rounded-md ${showPanel === 'results' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
              aria-label="View results"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {showPanel === 'targets' ? (
            targets.map(target => (
              <TargetItem
                key={target.id}
                target={target}
                onUpdate={(v) => onUpdateTarget(target.id, v)}
                onRemove={() => onRemoveTarget(target.id)}
              />
            ))
          ) : (
            targets.map(target => (
              <ResultItem
                key={target.id}
                target={target}
                value={computedValues[target.name] || 0}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
});

LeftPanel.displayName = 'LeftPanel';
