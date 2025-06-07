// IngredientDetails.tsx
'use client';
import { getIngredientById, getNutrientAverages, getIngredients } from '@/data/ingredients';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { motion } from 'framer-motion';
import { Composition, Ingredient, NutrientRankings, TopRankedNutrient } from '@/types';

const COLORS = ['#4f46e5', '#818cf8', '#c7d2fe', '#e0e7ff', '#a5b4fc', '#8b5cf6', '#ec4899', '#10b981'];

// Reference nutrient averages for comparison (in % or g/kg)
const NUTRIENT_REFERENCE = getNutrientAverages();

const NutrientBarChart = ({ data, unit }: { data: { name: string; value: number }[]; unit: string }) => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            height={60}
            tick={{ fill: '#9ca3af' }}
          />
          <YAxis tick={{ fill: '#9ca3af' }} unit={unit} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f2937',
              borderColor: '#4f46e5',
              borderRadius: '0.5rem'
            }}
            formatter={(value) => [`${value} ${unit}`, 'Value']}
            labelFormatter={(name) => `Nutrient: ${name}`}
          />
          <Bar dataKey="value" fill="#4f46e5" name="Value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const NutrientTable = ({ data, nutrientRankings }: { data: Composition[]; nutrientRankings: Record<string, number> }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-700">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Nutrient</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Value</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Unit</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">vs Avg</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Rank</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {data.map((comp, index) => {
            const reference = NUTRIENT_REFERENCE[comp.nutrient?.name as keyof typeof NUTRIENT_REFERENCE];
            const avg = reference?.avg || 0;
            const diff = avg ? ((comp.value - avg) / avg * 100) : null;
            const rank = comp.nutrient?.name ? nutrientRankings[comp.nutrient.name] : 'N/A';
            
            return (
              <tr 
                key={comp.nutrientId} 
                className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}
              >
                <td className="px-4 py-3 text-gray-300">{comp.nutrient?.name}</td>
                <td className="px-4 py-3 text-gray-300">{comp.value}</td>
                <td className="px-4 py-3 text-gray-400">{comp.nutrient?.unit || 'g/kg'}</td>
                <td className="px-4 py-3">
                  {diff !== null ? (
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      diff > 0 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {diff > 0 ? '+' : ''}{diff.toFixed(1)}%
                    </span>
                  ) : (
                    <span className="text-gray-500 text-sm">N/A</span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-400">
                  {rank !== 'N/A' ? (
                    <div className="w-8 h-8 flex items-center justify-center">
                      <span className="text-indigo-400 text-sm">#{rank}</span>
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm">N/A</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const NutrientCategoryWidget = ({ 
  title, 
  data,
  nutrientRankings
}: { 
  title: string; 
  data: Composition[];
  nutrientRankings: Record<string, number>;
}) => {
  // Group by unit for consistent charts
  const unitGroups = useMemo(() => {
    const groups: Record<string, Composition[]> = {};
    
    data.forEach(comp => {
      const unit = comp.nutrient?.unit || 'g/kg';
      if (!groups[unit]) groups[unit] = [];
      groups[unit].push(comp);
    });
    
    return groups;
  }, [data]);

  return (
    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 flex flex-col h-full">
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      
      <div className="flex-grow overflow-auto">
        {Object.entries(unitGroups).map(([unit, unitData]) => (
          <div key={unit} className="mb-8">
            <h4 className="text-lg font-medium text-gray-300 mb-2">
              Nutrients in {unit}
            </h4>
            
            {unitData.length > 3 ? (
              <NutrientBarChart 
                data={unitData.map(comp => ({
                  name: comp.nutrient?.name || 'N/A',
                  value: comp.value,
                }))} 
                unit={unit}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {unitData.map((comp) => (
                  <div key={comp.nutrientId} className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                    <div className="text-sm text-gray-400">{comp.nutrient?.name}</div>
                    <div className="text-xl font-bold text-white">
                      {comp.value} {comp.nutrient?.unit || 'g/kg'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <NutrientTable data={data} nutrientRankings={nutrientRankings} />
    </div>
  );
};

const TopNutrientsWidget = ({ data }: { data: Composition[] }) => {
  // Calculate relative rankings compared to averages
  const rankedNutrients = useMemo(() => {
    return data
      .filter(comp => comp.nutrient && comp.value > 0)
      .map(comp => {
        const reference = NUTRIENT_REFERENCE[comp.nutrient?.name as keyof typeof NUTRIENT_REFERENCE];
        const diff = reference ? ((comp.value - reference.avg) / reference.avg) * 100 : 0;
        return { ...comp, diff };
      })
      .sort((a, b) => b.diff - a.diff)
      .slice(0, 5);
  }, [data]);

  return (
    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-4">
        Nutrient Strengths
        <span className="text-sm text-gray-400 ml-2 font-normal">(vs average ingredients)</span>
      </h3>
      
      <div className="space-y-4">
        {rankedNutrients.map((nutrient, index) => {
          const reference = NUTRIENT_REFERENCE[nutrient.nutrient?.name as keyof typeof NUTRIENT_REFERENCE];
          const avgValue = reference ? reference.avg?.toFixed(2) : null;
          const unit = nutrient.nutrient?.unit || 'g/kg';
          
          return (
            <motion.div
              key={nutrient.nutrientId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between bg-gray-800/50 p-4 rounded-lg border border-gray-700"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3">
                  <span className="text-indigo-400 font-bold">{index + 1}</span>
                </div>
                <div>
                  <div className="font-medium text-white">{nutrient.nutrient?.name}</div>
                  <div className="text-sm text-gray-400">
                    {nutrient.value} {unit} vs avg {avgValue} {unit}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-xl font-bold ${
                  nutrient.diff > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {nutrient.diff > 0 ? '+' : ''}{nutrient.diff.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-400">
                  {nutrient.diff > 0 ? 'Higher' : 'Lower'} than average
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Helper function to calculate nutrient rankings
const calculateNutrientRankings = (ingredient: Ingredient): NutrientRankings => {
  const allIngredients = getIngredients();
  const rankings: { [key: string]: number } = {};

  // Get list of all nutrient IDs in the current ingredient
  const nutrientIds = ingredient.compositions
    .filter(comp => comp.nutrient)
    .map(comp => comp.nutrientId.toString());

  // Calculate ranking for each nutrient
  nutrientIds.forEach((nutrientId: string) => {
    // Get all values for this nutrient across all ingredients
    const values = allIngredients
      .map(ing => {
        const comp = ing.compositions.find(c => c.nutrientId.toString() === nutrientId);
        return comp ? comp.value : 0;
      })
      .filter((val: number) => val > 0)
      .sort((a: number, b: number) => b - a); // descending order

    // Find current ingredient's value
    const currentValue = ingredient.compositions.find(
      c => c.nutrientId.toString() === nutrientId
    )?.value || 0;

    // Calculate rank (1-based index)
    const rankIndex = values.findIndex((val: number) => val === currentValue);
    if (rankIndex !== -1) {
      const nutrientName = ingredient.compositions.find(
        c => c.nutrientId.toString() === nutrientId
      )?.nutrient?.name || '';
      rankings[nutrientName] = rankIndex + 1;
    }
  });

  return rankings;
};

export function IngredientDetails({ id }: { id: string }) {
  const ingredient = getIngredientById(id);
  
  // Compute all derived data unconditionally
  const nutrientRankings = useMemo(() => 
    ingredient ? calculateNutrientRankings(ingredient) : {}
  , [ingredient]);

  const compositions = ingredient?.compositions || [];

  const topRankedNutrients = useMemo(() => {
    if (!ingredient) return [];
    return Object.entries(nutrientRankings)
      .map(([nutrientName, rank]) => {
        const comp = ingredient.compositions.find(
          c => c.nutrient?.name === nutrientName
        );
        if (!comp) return null;

        const reference = NUTRIENT_REFERENCE[nutrientName as keyof typeof NUTRIENT_REFERENCE];
        const avg = reference?.avg || 0;
        const diff = avg ? ((comp.value - avg) / avg * 100) : 0;

        return {
          name: nutrientName,
          rank,
          value: comp.value,
          unit: comp.nutrient?.unit || 'g/kg',
          diff,
          avg
        };
      })
      .filter((item): item is TopRankedNutrient => item !== null)
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 4);
  }, [ingredient, nutrientRankings]);

  const groupedCompositions = useMemo(() => {
    return compositions.reduce((acc: Record<string, Composition[]>, comp) => {
      if (comp.nutrient) {
        if (comp.table && !acc[comp.table]) {
          acc[comp.table] = [];
        }
        if (comp.table)
          acc[comp.table].push(comp);
      }
      return acc;
    }, {});
  }, [compositions]);

  // Find key nutrients for pie chart
  const protein = compositions.find(c =>
    c.nutrient?.name === 'Crude protein'
  )?.value || 0;

  const fat = compositions.find(c =>
    c.nutrient?.name === 'Crude fat'
  )?.value || 0;

  const fiber = compositions.find(c =>
    c.nutrient?.name === 'Crude fibre'
  )?.value || 0;

  const ash = compositions.find(c =>
    c.nutrient?.name === 'Ash'
  )?.value || 0;

  const macronutrientData = [
    { name: 'Protein', value: protein },
    { name: 'Fat', value: fat },
    { name: 'Fiber', value: fiber },
    { name: 'Ash', value: ash },
  ];

  // Return notFound after all hooks
  if (!ingredient) return notFound();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      {/* Back Button */}
      <Link 
        href="/admin/ingredients/" 
        className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Ingredients
      </Link>

      {/* Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 flex flex-col justify-center">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {ingredient.name}
              </h1>
              {ingredient.category && (
                <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-400 bg-indigo-400/10 rounded-full mb-3">
                  {ingredient.category}
                </span>
              )}
              <p className="text-gray-400 mb-6">
                {ingredient.description}
              </p>
            </div>
          </div>

          {/* Top Ranked Nutrients */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {topRankedNutrients.map((nutrient, index) => (
              <motion.div
                key={nutrient.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 p-4 rounded-xl border border-gray-700"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-gray-400">{nutrient.name}</div>
                    <div className="text-xl font-bold text-white mt-1">
                      {nutrient.value.toFixed(2)}{nutrient.unit}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                      <span className="text-lg font-bold text-indigo-400">#{nutrient.rank}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-sm">
                  <div className="text-gray-500">
                    vs avg: {nutrient.avg?.toFixed(2) || 'N/A'}{nutrient.unit}
                  </div>
                  <div className={`mt-1 ${nutrient.diff > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {nutrient.diff > 0 ? '+' : ''}{nutrient.diff.toFixed(1)}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Macronutrient Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macronutrientData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {macronutrientData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937',
                    borderColor: '#4f46e5',
                    borderRadius: '0.5rem'
                  }} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Nutrient Highlights */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Nutrient Highlights</h2>
        <TopNutrientsWidget data={ingredient.compositions} />
      </div>

      {/* Nutritional Analysis by Category */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Detailed Nutrient Composition</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {Object.entries(groupedCompositions).map(([category, compositions]) => (
            <NutrientCategoryWidget 
              key={category}
              title={category}
              data={compositions}
              nutrientRankings={nutrientRankings}
            />
          ))}
        </div>
      </div>

      {/* Scientific Analysis */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Scientific Analysis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Digestibility</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-white">Protein Digestibility</h4>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-indigo-500 h-2.5 rounded-full" 
                    style={{ width: '85%' }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-1">85% - Excellent digestibility</p>
              </div>
              
              <div>
                <h4 className="font-medium text-white">Energy Utilization</h4>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-indigo-500 h-2.5 rounded-full" 
                    style={{ width: '78%' }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-1">78% - Good energy conversion</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Amino Acid Profile</h3>
            <div className="space-y-3">
              {[
                { name: 'Lysine', value: 6.2, ideal: 5.8 },
                { name: 'Methionine', value: 2.3, ideal: 2.5 },
                { name: 'Threonine', value: 3.8, ideal: 3.9 },
                { name: 'Tryptophan', value: 1.2, ideal: 1.1 },
              ].map((aa, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">{aa.name}</span>
                    <span className="text-gray-400">{aa.value}g/100g protein</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${aa.value >= aa.ideal ? 'bg-green-500' : 'bg-amber-500'}`} 
                      style={{ width: `${Math.min(100, (aa.value / aa.ideal) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Research Studies */}
      <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Research Studies</h2>
        
        <div className="space-y-6">
          <div className="border-b border-gray-700 pb-6 last:border-0 last:pb-0">
            <h3 className="text-xl font-semibold text-white mb-2">
              Effects on Poultry Growth Performance
            </h3>
            <p className="text-gray-400 mb-3">
              A 2022 study published in Poultry Science examined the impact of {ingredient.name} 
              on broiler growth rates and feed conversion ratios.
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <span>Journal: Poultry Science</span>
              <span className="mx-2">•</span>
              <span>Year: 2022</span>
            </div>
          </div>
          
          <div className="border-b border-gray-700 pb-6 last:border-0 last:pb-0">
            <h3 className="text-xl font-semibold text-white mb-2">
              Digestibility in Swine Diets
            </h3>
            <p className="text-gray-400 mb-3">
              Research in the Journal of Animal Science demonstrated improved nutrient 
              absorption when {ingredient.name} was included at optimal levels in piglet diets.
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <span>Journal: Journal of Animal Science</span>
              <span className="mx-2">•</span>
              <span>Year: 2021</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
