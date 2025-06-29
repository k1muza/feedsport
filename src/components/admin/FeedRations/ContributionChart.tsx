import { RatioIngredient, TargetNutrient } from '@/types';
import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

interface ContributionChartProps {
  ingredients: RatioIngredient[];
  computedValues: Record<string, number>; // This prop is correctly passed and will be used for tooltip totals
  totalRatio: number;
  targets: TargetNutrient[];
}

export const ContributionChart: React.FC<ContributionChartProps> = ({
  ingredients,
  computedValues,
  totalRatio,
  targets,
}) => {
  /** #######################
   * Build chart‑ready data
   * ##################### */
  const nutrientData = useMemo(() => {
    if (!ingredients.length || !targets.length)
      return [];

    // Create a map for quick lookup of target values
    const targetMap = targets.reduce((acc, target) => {
      acc[target.name] = target.target;
      return acc;
    }, {} as Record<string, number>);

    return targets.map((target) => {
      // Each row represents a nutrient
      const row: Record<string, string | number> = { name: target.name };
      const targetValue = targetMap[target.name] || 1; // Default to 1 to avoid division by zero

      // Store the actual total for this nutrient (from computedValues) and its normalized equivalent
      // This ensures the tooltip shows the true total, not just the sum of capped bars
      row['_targetValue'] = targetValue;
      row['_actualTotalAbsolute'] = computedValues[target.name] || 0;
      row['_actualTotalNormalized'] = targetValue > 0
        ? (row['_actualTotalAbsolute'] as number / targetValue) * 100
        : 0;

      ingredients.forEach((ing) => {
        const comp = ing.compositions.find(c => c.nutrient?.name === target.name);
        const fraction = ing.ratio / totalRatio;

        // absoluteContribution: The actual percentage of this nutrient contributed by this ingredient
        // e.g., if ingredient is 44% protein, and it's 30% of the mix, it contributes 44 * 0.3 = 13.2% protein
        const absoluteContribution = comp ? comp.value * fraction : 0;

        // normalizedContributionUncapped: How much this ingredient contributes relative to the target, as a percentage
        // e.g., if it contributes 13.2% and target is 18%, normalized = (13.2 / 18) * 100 = 73.3%
        const normalizedContributionUncapped = targetValue > 0
          ? (absoluteContribution / targetValue) * 100
          : 0;

        // Store the capped value for the bar chart's visual display (dataKey for Recharts Bar)
        // This is where "compositions currently higher should be capped at 100" is applied for visual bars.
        row[ing.id] = Number(Math.min(100, normalizedContributionUncapped).toFixed(1));

        // Store uncapped values for the tooltip's detailed ingredient breakdown
        row[`${ing.id}_uncapped_abs`] = absoluteContribution;
        row[`${ing.id}_uncapped_norm`] = normalizedContributionUncapped;
      });

      return row;
    });
  }, [ingredients, targets, totalRatio, computedValues]); // Add computedValues to dependencies

  if (!nutrientData.length) return null;

  /** #######################
   * Helpers & visuals
   * ##################### */
  const palette = [
    '#4f46e5', '#059669', '#10b981', '#06b6d4',
    '#0ea5e9', '#8b5cf6', '#ec4899', '#f97316',
    '#eab308', '#f43f5e'
  ];

  // Wrap long nutrient names
  const splitLabel = (label: string, maxLength = 18) => {
    const words = label.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    words.forEach(word => {
      if (currentLine.length + word.length <= maxLength) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine) lines.push(currentLine);
    return lines;
  };

  // Custom Y-axis tick with wrapping
  interface AxisTickProps {
    x: number;
    y: number;
    payload: { value: string };
  }

  const CustomYAxisTick: React.FC<AxisTickProps> = ({ x, y, payload }) => {
    const lines = splitLabel(payload.value);
    return (
      <g transform={`translate(${x},${y})`}>
        {lines.map((line, i) => (
          <text
            key={i}
            x={-10}
            y={i * 14}
            textAnchor="end"
            fill="#d1d5db"
            fontSize={12}
            dominantBaseline="middle"
          >
            {line}
          </text>
        ))}
      </g>
    );
  };

  // Enhanced dark themed tooltip
  interface TooltipEntry {
    color: string;
    dataKey: string;
    payload: Record<string, string | number>;
  }

  interface CustomTooltipProps {
    active?: boolean;
    payload?: TooltipEntry[];
    label?: string;
  }

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (!active || !payload?.length || !payload[0]?.payload) return null;

    const rowData = payload[0].payload as Record<string, string | number>; // Access the full row data for the current nutrient

    // Use the pre-calculated actual total values from rowData for the summary
    const targetValue = rowData['_targetValue'] || 0;
    const actualTotalAbsolute = rowData['_actualTotalAbsolute'] || 0;
    const actualTotalNormalized = rowData['_actualTotalNormalized'] || 0;

    return (
      <div className="bg-gray-800 border border-gray-700 p-3 rounded-md shadow-lg min-w-[240px]">
        <h3 className="font-bold text-white mb-2">{label}</h3>
        <div className="mb-2">
          <span className="text-gray-300">Target: </span>
          <span className="font-medium text-emerald-400">{targetValue.toFixed(1)}%</span>
        </div>
        <div className="mb-2">
          <span className="text-gray-300">Current: </span>
          <span className="font-medium text-amber-400">{actualTotalAbsolute.toFixed(1)}%</span>
          <span className="text-gray-400 ml-2">
            ({actualTotalNormalized > 100 ? '+' : ''}{actualTotalNormalized.toFixed(1)}%)
          </span>
        </div>

        <div className="mt-3 pt-2 border-t border-gray-700">
          <h4 className="text-gray-300 text-sm font-medium mb-1">Ingredients:</h4>
          <ul className="space-y-1">
            {payload.map((entry: TooltipEntry, idx: number) => {
              const ingredient = ingredients.find(i => i.id === entry.dataKey); // Find ingredient by ID for name

              // Access the uncapped absolute and normalized values from rowData
              const absValue = rowData[`${entry.dataKey}_uncapped_abs`] || 0;
              const normalizedValue = rowData[`${entry.dataKey}_uncapped_norm`] || 0;

              return (
                <li key={idx} className="flex justify-between items-start">
                  <span className="flex items-center">
                    <span
                      className="inline-block w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-gray-200">{ingredient?.name || ''}</span>
                  </span>
                  <span className="font-medium text-right">
                    {absValue.toFixed(1)}%
                    <span className="text-gray-400 ml-2">
                      ({normalizedValue > 100 ? '+' : ''}{normalizedValue.toFixed(1)}%)
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  // Calculate bar height based on nutrients and label lines
  const maxLines = nutrientData.reduce((max, item) => {
    const lines = splitLabel(item.name as string).length;
    return lines > max ? lines : max;
  }, 1);

  const barHeight = 36 + (maxLines - 1) * 12;
  const chartHeight = Math.max(360, nutrientData.length * barHeight + 60);

  return (
    <section className="mt-8 p-4 bg-gray-800 rounded-lg shadow mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Nutrient Contribution vs Target
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Shows each ingredient's contribution as percentage of target (capped at 100% for display)
          </p>
        </div>
        <div className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">
          100% = Target value
        </div>
      </div>

      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart
          data={nutrientData}
          layout="vertical"
          margin={{ top: 10, right: 20, left: 140, bottom: 20 }}
          barGap={4}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#4b5563"
            horizontal={false}
          />
          <XAxis
            type="number"
            domain={[0, 100]} // X-axis can still go beyond 100% to show total if needed
            stroke="#9ca3af"
            tick={{ fill: '#d1d5db', fontSize: 11 }}
            tickFormatter={(v) => `${v}%`}
            tickLine={false}
          />
          <YAxis
            dataKey="name"
            type="category"
            width={100}
            tick={<CustomYAxisTick />}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip ingredients={ingredients} />} /> {/* Pass ingredients to tooltip */}
          <Legend
            wrapperStyle={{ paddingTop: '10px', color: '#d1d5db' }}
            content={({ payload }) => (
              <div className="flex flex-wrap gap-2 mt-2">
                {payload?.map((entry, index) => (
                  <div key={`legend-${index}`} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-sm mr-2"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-xs text-gray-300">
                      {entry.value?.toString().slice(0, 20)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          />
          {ingredients.map((ing, i) => (
            <Bar
              key={ing.id}
              dataKey={ing.id} // This dataKey holds the capped normalized value
              stackId="stack"
              fill={palette[i % palette.length]}
              name={ing.name}
              isAnimationActive={false}
              maxBarSize={24}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};
