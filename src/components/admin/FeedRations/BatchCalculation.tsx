import { RatioIngredient } from "@/types";

interface BatchCalculationProps {
  ingredients: RatioIngredient[];
  totalRatio: number;
}

export const BatchCalculation = ({ ingredients, totalRatio }: BatchCalculationProps) => (
  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
    <h3 className="text-lg font-medium mb-4">Batch Calculation (1000kg)</h3>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {ingredients.map(ingredient => {
        const pct = totalRatio ? (ingredient.ratio / totalRatio) * 100 : 0;
        return (
          <div key={ingredient.id} className="bg-gray-700/50 p-3 rounded-lg">
            <p className="text-sm text-gray-400">{ingredient.name}</p>
            <p className="text-lg font-medium">
              {((pct / 100) * 1000).toFixed(0)}kg
              <span className="text-sm text-gray-400 ml-1">({pct.toFixed(1)}%)</span>
            </p>
          </div>
        );
      })}
    </div>
  </div>
);
