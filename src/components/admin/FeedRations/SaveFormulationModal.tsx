import { showErrorToast } from "@/components/common/ErrorToast";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

export const SaveFormulationModal = ({
  isOpen,
  onClose,
  onSave,
  initialName = ""
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  initialName?: string;
}) => {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    if (isOpen) {
      setName(initialName);
    }
  }, [isOpen, initialName]);

  const handleSave = () => {
    if (!name.trim()) {
      showErrorToast({ message: 'Please enter a name for your formulation' });
      return;
    }
    onSave(name);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-100 dark:bg-gray-800 border border-gray-700 rounded-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Save Formulation</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <label htmlFor="formulation-name" className="block text-sm font-medium text-gray-300 mb-2">
              Formulation Name
            </label>
            <input
              type="text"
              id="formulation-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter a name for this formulation"
              autoFocus
            />
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-200 dark:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
