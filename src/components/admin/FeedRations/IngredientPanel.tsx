
import { RatioIngredient, TargetNutrient } from "@/types";
import { AlertTriangle, X } from "lucide-react";

// Ingredient Panel Component
export const IngredientPanel = ({
  ingredients,
  targets,
  totalRatio,
  totalPercentage,
  onRatioChange,
  onRemoveIngredient,
  isExpanded,
}: {
  ingredients: RatioIngredient[];
  targets: TargetNutrient[];
  totalRatio: number;
  totalPercentage: number;
  onRatioChange: (id: string, val: string) => void;
  onRemoveIngredient: (id: string) => void;
  isExpanded: boolean;
}) => (
  <div className={`${isExpanded ? 'lg:w-[calc(100%-4rem)]' : 'lg:w-2/3'} space-y-4`}>
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Ingredient Composition</h3>
        {totalPercentage !== 100 && (
          <div className="flex items-center text-yellow-400 text-sm">
            <AlertTriangle className="w-4 h-4 mr-1" />
            <span>Total: {totalPercentage.toFixed(1)}% (should be 100%)</span>
          </div>
        )}
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">%</th>
                {targets.map(t => (
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
                        value={ingredient.ratio}
                        onChange={e => onRatioChange(ingredient.id, e.target.value)}
                        className="w-20 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-gray-200"
                      />
                    </td>
                    <td className="px-4 py-3 text-gray-200">{pct.toFixed(1)}%</td>
                    {targets.map(target => {
                      const comp = ingredient.compositions.find(c => c.nutrient?.name === target.name)?.value || 0;
                      return (
                        <td key={`${ingredient.id}-${target.id}`} className="px-4 py-3 text-gray-400">
                          {((comp * pct) / 100).toFixed(2)}%
                        </td>
                      );
                    })}
                    <td className="px-4 py-3">
                      <button onClick={() => onRemoveIngredient(ingredient.id)} className="text-red-400 hover:text-red-300">
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
  </div>
);