import { useState } from "react";
import { Calculator, Plus, Zap, Droplet, Scissors, AlertTriangle } from "lucide-react";

interface RatioIngredient {
  id: number;
  name: string;
  protein: number;
  fat: number;
  fiber: number;
  percentage: number;
}

export const FeedRatios = () => {
  const [targetProtein, setTargetProtein] = useState<number>(18);
  const [targetFat, setTargetFat] = useState<number>(5);
  const [targetFiber, setTargetFiber] = useState<number>(8);
  const [ingredients, setIngredients] = useState<RatioIngredient[]>([
    { id: 1, name: 'Corn Meal', protein: 8.5, fat: 3.7, fiber: 2.3, percentage: 60 },
    { id: 2, name: 'Soybean Meal', protein: 44.0, fat: 1.9, fiber: 7.0, percentage: 30 },
    { id: 3, name: 'Fish Meal', protein: 65.0, fat: 8.0, fiber: 1.0, percentage: 5 },
    { id: 4, name: 'Wheat Bran', protein: 15.5, fat: 4.0, fiber: 10.0, percentage: 5 },
  ]);

  const calculatedProtein = ingredients.reduce((sum, ing) => sum + (ing.protein * ing.percentage / 100), 0);
  const calculatedFat = ingredients.reduce((sum, ing) => sum + (ing.fat * ing.percentage / 100), 0);
  const calculatedFiber = ingredients.reduce((sum, ing) => sum + (ing.fiber * ing.percentage / 100), 0);
  const totalPercentage = ingredients.reduce((sum, ing) => sum + ing.percentage, 0);

  const handlePercentageChange = (id: number, value: string) => {
    setIngredients(ingredients.map(ing => 
      ing.id === id ? { ...ing, percentage: parseFloat(value) || 0 } : ing
    ));
  };

  const addNewIngredient = () => {
    const newId = ingredients.length > 0 ? Math.max(...ingredients.map(i => i.id)) + 1 : 1;
    setIngredients([
      ...ingredients,
      { id: newId, name: 'New Ingredient', protein: 0, fat: 0, fiber: 0, percentage: 0 }
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Calculator className="w-6 h-6 text-indigo-400" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Feed Ratio Calculator
          </h2>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center space-x-2 transition-colors">
          <span>Save Formula</span>
          <Zap className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Target Composition - Glass Card */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-medium mb-4 flex items-center space-x-2">
            <Droplet className="w-5 h-5 text-indigo-400" />
            <span>Target Composition</span>
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Protein (%)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={targetProtein}
                  onChange={(e) => setTargetProtein(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-gray-200"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  %
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Fat (%)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={targetFat}
                  onChange={(e) => setTargetFat(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-gray-200"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  %
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Fiber (%)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={targetFiber}
                  onChange={(e) => setTargetFiber(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-gray-200"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  %
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredient Composition - Glass Card */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium flex items-center space-x-2">
              <Scissors className="w-5 h-5 text-indigo-400" />
              <span>Ingredient Composition</span>
            </h3>
            {totalPercentage !== 100 && (
              <div className="flex items-center text-yellow-400 text-sm">
                <AlertTriangle className="w-4 h-4 mr-1" />
                <span>Total: {totalPercentage}% (should be 100%)</span>
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Ingredient</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Protein</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Fat</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Fiber</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Percentage</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Contribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {ingredients.map((ingredient) => (
                  <tr key={ingredient.id} className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-200">{ingredient.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-400">{ingredient.protein}%</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-400">{ingredient.fat}%</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-400">{ingredient.fiber}%</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="relative w-24">
                        <input 
                          type="number" 
                          value={ingredient.percentage}
                          onChange={(e) => handlePercentageChange(ingredient.id, e.target.value)}
                          className="w-full px-3 py-1 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 text-gray-200"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          %
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-400">
                      <div className="flex flex-col">
                        <span>P: {(ingredient.protein * ingredient.percentage / 100).toFixed(2)}%</span>
                        <span>F: {(ingredient.fat * ingredient.percentage / 100).toFixed(2)}%</span>
                        <span>Fi: {(ingredient.fiber * ingredient.percentage / 100).toFixed(2)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button 
            onClick={addNewIngredient}
            className="mt-4 text-indigo-400 hover:text-indigo-300 flex items-center transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Ingredient
          </button>
        </div>
      </div>

      {/* Results - Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Protein Card */}
        <div className={`p-5 rounded-xl border ${
          calculatedProtein >= targetProtein 
            ? 'border-green-500/30 bg-green-500/10' 
            : 'border-red-500/30 bg-red-500/10'
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Protein Content</p>
              <p className="text-2xl font-bold mt-1">
                {calculatedProtein.toFixed(2)}%
                <span className="text-sm font-normal ml-2 text-gray-400">
                  (Target: {targetProtein}%)
                </span>
              </p>
            </div>
            {calculatedProtein >= targetProtein ? (
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
                width: `${Math.min(100, (calculatedProtein / targetProtein) * 100)}%`,
                backgroundColor: calculatedProtein >= targetProtein ? '#10B981' : '#EF4444'
              }}
            ></div>
          </div>
        </div>

        {/* Fat Card */}
        <div className={`p-5 rounded-xl border ${
          calculatedFat >= targetFat 
            ? 'border-green-500/30 bg-green-500/10' 
            : 'border-red-500/30 bg-red-500/10'
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Fat Content</p>
              <p className="text-2xl font-bold mt-1">
                {calculatedFat.toFixed(2)}%
                <span className="text-sm font-normal ml-2 text-gray-400">
                  (Target: {targetFat}%)
                </span>
              </p>
            </div>
            {calculatedFat >= targetFat ? (
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
                width: `${Math.min(100, (calculatedFat / targetFat) * 100)}%`,
                backgroundColor: calculatedFat >= targetFat ? '#10B981' : '#EF4444'
              }}
            ></div>
          </div>
        </div>

        {/* Fiber Card */}
        <div className={`p-5 rounded-xl border ${
          calculatedFiber >= targetFiber 
            ? 'border-green-500/30 bg-green-500/10' 
            : 'border-red-500/30 bg-red-500/10'
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Fiber Content</p>
              <p className="text-2xl font-bold mt-1">
                {calculatedFiber.toFixed(2)}%
                <span className="text-sm font-normal ml-2 text-gray-400">
                  (Target: {targetFiber}%)
                </span>
              </p>
            </div>
            {calculatedFiber >= targetFiber ? (
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
                width: `${Math.min(100, (calculatedFiber / targetFiber) * 100)}%`,
                backgroundColor: calculatedFiber >= targetFiber ? '#10B981' : '#EF4444'
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Batch Calculation */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mt-6">
        <h3 className="text-lg font-medium mb-4">Batch Calculation (1000kg)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ingredients.map(ing => (
            <div key={ing.id} className="bg-gray-700/50 p-3 rounded-lg">
              <p className="text-sm text-gray-400">{ing.name}</p>
              <p className="text-lg font-medium">
                {(ing.percentage * 10).toFixed(0)}kg
                <span className="text-sm text-gray-400 ml-1">({ing.percentage}%)</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};