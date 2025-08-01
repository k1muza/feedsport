import { RatioIngredient, TargetNutrient } from "@/types";
import { AlertTriangle, Plus, Save, Settings, X } from "lucide-react";

interface IngredientsPanelProps {
  ingredients: RatioIngredient[];
  targets: TargetNutrient[];
  visibleColumns: string[];
  totalPercentage: number;
  totalRatio: number;
  handleRatioChange: (id: string, val: string) => void;
  removeIngredient: (id: string) => void;
  onOpenSaveModal: () => void;
  onOpenColumnConfig: () => void;
  onOpenIngredientModal: () => void;
  handleCostChange: (id: string, val: string) => void;
  handleMinChange: (id: string, val: string) => void;
  handleMaxChange: (id: string, val: string) => void;
}

export const IngredientsPanel = ({
  ingredients,
  targets,
  visibleColumns,
  totalPercentage,
  totalRatio,
  handleRatioChange,
  handleCostChange,
  handleMinChange,
  handleMaxChange,
  removeIngredient,
  onOpenSaveModal,
  onOpenColumnConfig,
  onOpenIngredientModal
}: IngredientsPanelProps) => (
  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-medium">Ingredient Composition</h3>
      <div className="flex items-center gap-2">
        {totalPercentage !== 100 && (
          <div className="flex items-center text-yellow-400 text-sm mr-2">
            <AlertTriangle className="w-4 h-4 mr-1" />
            <span>Total: {totalPercentage.toFixed(1)}%</span>
          </div>
        )}
        <button
          onClick={onOpenSaveModal}
          className="p-2 text-gray-400 hover:bg-gray-700 rounded-md"
          title="Save formulation"
        >
          <Save className="w-5 h-5" />
        </button>
        <button
          onClick={onOpenColumnConfig}
          className="p-2 text-gray-400 hover:bg-gray-700 rounded-md"
        >
          <Settings className="w-5 h-5" />
        </button>
        <button
          onClick={onOpenIngredientModal}
          className="p-2 text-gray-400 hover:bg-gray-700 rounded-md"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>

    {ingredients.length === 0 ? (
      <div className="text-center py-8 text-gray-400">No ingredients added yet.</div>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Ingredient</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Ratio</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cost ($/kg)</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">%</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Min (%)</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Max (%)</th>
              {targets
                .filter(t => visibleColumns.includes(t.id))
                .map(t => (
                  <th key={t.id} className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {t.name}
                  </th>
                ))}
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {ingredients.map(ingredient => {
              const pct = totalRatio ? (ingredient.ratio / totalRatio) * 100 : 0;
              return (
                <tr key={ingredient.id} className="hover:bg-gray-700/50">
                  <td className="px-4 py-3 text-gray-200">{ingredient.name}</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min={0}
                      step={0.0001}
                      value={ingredient.ratio}
                      onChange={e => handleRatioChange(ingredient.id, e.target.value)}
                      className="w-20 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-gray-200"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min={0}
                      step={0.01}
                      value={ingredient.costPerKg ?? ''}
                      onChange={e => handleCostChange(ingredient.id, e.target.value)}
                      className="w-24 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-gray-200"
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-200">{pct.toFixed(1)}%</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={ingredient.min ?? ''}
                      onChange={e => handleMinChange(ingredient.id, e.target.value)}
                      className="w-16 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm"
                      placeholder="Min"
                    />
                  </td>

                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={ingredient.max ?? ''}
                      onChange={e => handleMaxChange(ingredient.id, e.target.value)}
                      className="w-16 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm"
                      placeholder="Max"
                    />
                  </td>
                  {targets
                    .filter(t => visibleColumns.includes(t.id))
                    .map(target => {
                      const comp = ingredient.compositions.find(c => c.nutrient?.name === target.name)?.value || 0;
                      return (
                        <td key={`${ingredient.id}-${target.id}`} className="px-4 py-3 text-gray-400">
                          {((comp * pct) / 100).toFixed(2)} {target.unit}
                        </td>
                      );
                    })}
                  <td className="px-4 py-3">
                    <button onClick={() => removeIngredient(ingredient.id)} className="text-red-400 hover:text-red-300">
                      <X className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
