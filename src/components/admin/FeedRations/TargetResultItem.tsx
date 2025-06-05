import { TargetNutrient } from "@/types";

const ProgressBar = ({ value, target, met }: {
  value: number;
  target: number;
  met: boolean;
}) => (
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

export const ResultItem = ({
  target,
  value
}: {
  target: TargetNutrient;
  value: number;
}) => {
  const met = value >= target.value * 0.95;
  const statusText = met ? "Met" : "Below";
  const statusColor = met ? "text-green-400" : "text-red-400";

  return (
    <div className="p-3 bg-gray-700/30 rounded-lg">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-300">{target.name}</span>
        <span className={`text-xs ${statusColor}`}>{statusText}</span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-lg font-medium">{value.toFixed(1)} {target.unit}</span>
        <span className="text-sm text-gray-400">Target: {target.value} {target.unit}</span>
      </div>
      <ProgressBar value={value} target={target.value} met={met} />
    </div>
  );
};
