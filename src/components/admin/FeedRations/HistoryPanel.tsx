import { Formulation } from "@/types";
import { X, FolderInput, Trash2 } from "lucide-react";

export const HistoryPanel = ({ 
  isOpen, 
  onClose, 
  formulations,
  onLoad,
  onDelete
}: {
  isOpen: boolean;
  onClose: () => void;
  formulations: Formulation[];
  onLoad: (formulation: Formulation) => void;
  onDelete: (id: string) => void;
}) => (
  <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-gray-100 dark:bg-gray-800 border-l border-gray-700 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
    <div className="p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Saved Formulations</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {formulations.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No saved formulations
          </div>
        ) : (
          <div className="space-y-3">
            {formulations.map(formulation => (
              <div key={formulation.id} className="p-3 bg-gray-200/50 dark:bg-gray-700/50 rounded-lg border border-gray-600">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium text-white">{formulation.name}</h4>
                    <p className="text-xs text-gray-400">{formulation.date}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => onLoad(formulation)}
                      className="p-1.5 text-green-400 hover:bg-gray-300 dark:hover:bg-gray-600 rounded"
                      title="Load formulation"
                    >
                      <FolderInput className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete(formulation.id)}
                      className="p-1.5 text-red-400 hover:bg-gray-300 dark:hover:bg-gray-600 rounded"
                      title="Delete formulation"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-300">
                  {formulation.ingredients.length} ingredients, {formulation.targets.length} targets
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);
