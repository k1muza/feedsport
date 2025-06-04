import AnimalSelector from "@/components/common/AnimalSelector";
import { Animal, AnimalProgram, AnimalProgramStage } from "@/types/animals";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export const AnimalSelectionModal = ({
  isOpen,
  onClose,
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (
    animal: Animal | null,
    program: AnimalProgram | null,
    stage: AnimalProgramStage | null,
  ) => void;
}) => {
  // Keep track of the user’s pick. We *don’t* immediately pass it upward; the
  // user must hit the **Apply** button.
  const [picked, setPicked] = useState<{
    animal: Animal | null;
    program: AnimalProgram | null;
    stage: AnimalProgramStage | null;
  }>({ animal: null, program: null, stage: null });

  // Reset local state whenever the modal is re‑opened.
  useEffect(() => {
    if (isOpen) {
      setPicked({ animal: null, program: null, stage: null });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleApply = () => {
    onSelect(picked.animal, picked.program, picked.stage);
    onClose();
  };

  const isReady = Boolean(picked.animal && picked.program && picked.stage);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl">
        <div className="p-6 flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-white">Select Animal Program</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto">
            <AnimalSelector
              onSelectionChange={(animal, program, stage) => {
                setPicked({ animal, program, stage });
              }}
            />
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleApply}
              disabled={!isReady}
              className={`px-4 py-2 rounded-lg text-white transition-colors ${
                isReady ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-gray-600 cursor-not-allowed'
              }`}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>,
    // Portal target
    typeof document !== 'undefined' ? document.body : ({} as HTMLElement),
  );
};
