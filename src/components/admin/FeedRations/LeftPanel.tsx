import { TargetNutrient } from "@/types";
import { ChevronRight, ChevronLeft, X } from "lucide-react";

// Left Panel Component
export const LeftPanel = ({
  showPanel,
  isCollapsed,
  targets,
  computedValues,
  onToggleCollapse,
  onSwitchPanel,
  onUpdateTarget,
  onRemoveTarget,
  onOptimize,
  optimizing,
}: {
  showPanel: 'targets' | 'results';
  isCollapsed: boolean;
  targets: TargetNutrient[];
  computedValues: Record<string, number>;
  onToggleCollapse: () => void;
  onSwitchPanel: (panel: 'targets' | 'results') => void;
  onUpdateTarget: (id: string, v: number) => void;
  onRemoveTarget: (id: string) => void;
  onOptimize: () => void;
  optimizing: boolean;
}) => (
  <div className={`lg:w-1/3 space-y-4 ${isCollapsed ? 'lg:w-16' : ''}`}>
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
      <div className="flex justify-between items-center mb-2">
        <button onClick={onToggleCollapse} className="text-gray-400 hover:text-gray-200">
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>

        {!isCollapsed && (
          <div className="flex space-x-2">
            <button
              onClick={() => onSwitchPanel('targets')}
              className={`px-3 py-1 rounded-lg text-sm ${showPanel === 'targets' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Targets
            </button>
            <button
              onClick={() => onSwitchPanel('results')}
              className={`px-3 py-1 rounded-lg text-sm ${showPanel === 'results' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Results
            </button>
          </div>
        )}
      </div>

      {!isCollapsed && (
        <>
          {showPanel === 'targets' ? (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Nutritional Targets</h3>
              <div className="space-y-4">
                {targets.map(target => (
                  <div key={target.id} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm text-gray-400">{target.name} (%)</label>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={target.value}
                        onChange={e => onUpdateTarget(target.id, Number(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
                    </div>
                    <button onClick={() => onRemoveTarget(target.id)} className="text-red-400 hover:text-red-300 text-sm flex items-center">
                      <X className="w-3 h-3 mr-1" /> Remove target
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Results Summary</h3>
              </div>
              <div className="space-y-4">
                {targets.map(target => {
                  const comp = computedValues[target.name] || 0;
                  const met = comp >= target.value * 0.95;
                  return (
                    <div
                      key={target.id}
                      className={`p-3 rounded-lg border ${met ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-400">{target.name}</p>
                          <p className="text-2xl font-bold mt-1">
                            {comp.toFixed(2)}%
                            <span className="text-sm font-normal ml-2 text-gray-400">
                              (Target: {target.value}%)
                            </span>
                          </p>
                        </div>
                        {met ? (
                          <div className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                            Target Met
                          </div>
                        ) : (
                          <div className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
                            Below Target
                          </div>
                        )}
                      </div>
                      <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min(100, (comp / target.value) * 100)}%`,
                            backgroundColor: met ? '#10B981' : '#EF4444'
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={onOptimize}
                disabled={optimizing}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm flex items-center space-x-2"
              >
                {optimizing ? 'Optimizing...' : 'Optimize Ratios'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  </div>
);