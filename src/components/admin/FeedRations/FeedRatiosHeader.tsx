import { Calculator, History, Wand } from "lucide-react";

interface FeedRatiosHeaderProps {
  onShowHistory: () => void;
  onOptimize: () => void;
  optimizing: boolean;
}

export const FeedRatiosHeader = ({
  onShowHistory,
  onOptimize,
  optimizing
}: FeedRatiosHeaderProps) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div className="flex items-center space-x-3">
      <Calculator className="w-6 h-6 text-indigo-400" />
      <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
        Feed Ratio Calculator
      </h2>
    </div>
    <div className="flex flex-wrap gap-2">
      <button
        onClick={onShowHistory}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-white rounded-lg flex items-center space-x-2"
      >
        <History className="w-4 h-4" />
        <span>Formulations</span>
      </button>
      
      <button
        onClick={onOptimize}
        className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg flex items-center space-x-2"
      >
        <Wand className="w-4 h-4" />
        <span>{optimizing ? 'Optimizing...' : 'Optimize'}</span>
      </button>
      
    </div>
  </div>
);
