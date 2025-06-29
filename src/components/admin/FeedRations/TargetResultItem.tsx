import { TargetNutrient } from "@/types";

const ProgressBar = ({ value, target, met }: {
  value: number;
  target: number;
  max?: number;
  met: boolean;
}) => (
  <div className="mt-2 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
    <div
      className="h-full rounded-full transition-all duration-300"
      style={{
        width: `${Math.min(100, (value / target) * 100)}%`,
        backgroundColor: met ? "#10B981" : "#EF4444",
      }}
    />
  </div>
);

export const TargetResultItem = ({
  target,
  value
}: {
  target: TargetNutrient;
  value: number;
}) => {
  // Determine if target is met
  let met = true;
  const tolerance = 0.02;
  let statusText = "Met";

  if (target.target !== undefined && value < target.target * (1 - tolerance)){
    met = false;
    statusText = "Below";
  }
  if (target.max !== undefined && value > target.max * (1 + tolerance)){
    met = false;
    statusText = "Above";
  }

  const statusColor = met ? "text-green-400" : "text-red-400";

  return (
    <div className="p-3 bg-gray-700/30 rounded-lg">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-400">Status</span>
        <span className={`text-xs ${statusColor}`}>{statusText}</span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-lg font-medium">{value.toFixed(2)} {target.unit}</span>
        <span className="text-sm text-gray-400">
          {target.target !== undefined && `Min: ${target.target} `}
          {target.max !== undefined && `Max: ${target.max}`}
        </span>
      </div>
      <ProgressBar 
        value={value} 
        target={target.target} 
        met={met} 
      />
    </div>
  );
};
