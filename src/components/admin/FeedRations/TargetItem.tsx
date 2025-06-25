import { TargetNutrient } from "@/types";
import { useState } from "react";
import { TargetInputItem } from "./TargetInputItem";
import { TargetResultItem } from "./TargetResultItem";

export const TargetItem = ({
  target,
  value,
  onUpdate,
  onRemove,
}: {
  target: TargetNutrient;
  value: number;
  onUpdate: (field: 'max' | 'target' | 'underPenaltyFactor' | 'overPenaltyFactor', value: number) => void;
  onRemove: () => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="p-3 bg-gray-700/30 rounded-lg">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-300">{target.name}</span>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs text-gray-400 hover:text-gray-300"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>
      {isEditing ? (
        <TargetInputItem target={target} onUpdate={onUpdate} onRemove={onRemove} />
      ) : (
        <TargetResultItem target={target} value={value} />
      )}
    </div>
  );
};
