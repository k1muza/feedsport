import { Calculator, History, Wand, ZoomIn } from "lucide-react";

export const FeedRatiosHeader = ({
  onShowHistory,
  onOptimize,
  onAnalyze,
  optimizing,
  analysing
}: any) => (
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
        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center space-x-2"
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
      
      <button
        onClick={onAnalyze}
        className="px-4 py-2 bg-purple-600 hover:bg-magenta-500 text-white rounded-lg flex items-center space-x-2"
      >
        <ZoomIn className="w-4 h-4" />
        <span>{analysing ? 'Analyzing...' : 'Analyze'}</span>
      </button>
    </div>
  </div>
);
