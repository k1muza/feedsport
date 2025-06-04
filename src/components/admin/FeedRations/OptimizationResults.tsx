export const OptimizationResults = ({ result }: any) => (
  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
    <h3 className="text-lg font-medium mb-4">Optimization Results</h3>
    <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm text-gray-100 overflow-x-auto">
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  </div>
);
