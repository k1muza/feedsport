import { Calculator, Plus, Wand, Zap, ZoomIn } from "lucide-react";

// Header Component
export const Header = ({ onAddIng, onAddTgt, onOptimize, onAnalyse, optimizing, analysing }: { 
  onAddIng: () => void; 
  onAddTgt: () => void;
  onOptimize: () => void;
  onAnalyse: () => void;
  optimizing: boolean;
  analysing: boolean;
}) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div className="flex items-center space-x-3">
      <Calculator className="w-6 h-6 text-indigo-400" />
      <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
        Feed Ratio Calculator
      </h2>
    </div>
    <div className="flex space-x-2">
      <button onClick={onAddIng} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center space-x-2">
        <Plus className="w-4 h-4" /> <span>Add Ingredient</span>
      </button>
      <button onClick={onAddTgt} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg flex items-center space-x-2">
        <Zap className="w-4 h-4" /> <span>Add Target</span>
      </button>
      <button onClick={onAnalyse} className="px-4 py-2 bg-purple-600 hover:bg-magenta-500 text-white rounded-lg flex items-center space-x-2">
        <ZoomIn className="w-4 h-4" /> <span>{analysing ? 'Analyzing...' : 'Analyze'}</span>
      </button>
      <button onClick={onOptimize} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg flex items-center space-x-2">
        <Wand className="w-4 h-4" /> <span>{optimizing ? 'Optimizing...' : 'Optimize'}</span>
      </button>
    </div>
  </div>
);

