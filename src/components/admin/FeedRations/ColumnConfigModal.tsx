"use client";

import { TargetNutrient } from "@/types";
import { X, Search } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

export const ColumnConfigModal = ({
  isOpen,
  onClose,
  allTargets,
  visibleColumns,
  setVisibleColumns
}: {
  isOpen: boolean;
  onClose: () => void;
  allTargets: TargetNutrient[];
  visibleColumns: string[];
  setVisibleColumns: (columns: string[]) => void;
}) => {
  const [tempVisibleColumns, setTempVisibleColumns] = useState([...visibleColumns]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTempVisibleColumns([...visibleColumns]);
    }
  }, [isOpen, visibleColumns]);

  const toggleColumn = (id: string) => {
    setTempVisibleColumns(prev =>
      prev.includes(id)
        ? prev.filter(colId => colId !== id)
        : [...prev, id]
    );
  };

  const saveAndClose = () => {
    setVisibleColumns(tempVisibleColumns);
    onClose();
  };

  const filteredTargets = useMemo(() => {
    if (!searchTerm) return allTargets;
    return allTargets.filter(target =>
      target.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allTargets, searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="p-6 flex-grow overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Configure Columns</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search nutrients..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-gray-200 placeholder-gray-500"
            />
          </div>

          <div className="overflow-y-auto flex-grow mb-4 pr-2 -mr-2">
            <div className="space-y-3">
              {filteredTargets.length > 0 ? (
                filteredTargets.map(target => (
                  <div key={target.id} className="flex items-center group">
                    <input
                      type="checkbox"
                      id={`col-${target.id}`}
                      checked={tempVisibleColumns.includes(target.id)}
                      onChange={() => toggleColumn(target.id)}
                      className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`col-${target.id}`}
                      className="ml-3 text-gray-200 flex-grow group-hover:text-white transition-colors"
                    >
                      <div className="font-medium">{target.name}</div>
                    </label>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-400">
                  No nutrients found matching "{searchTerm}"
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-2 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveAndClose}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
