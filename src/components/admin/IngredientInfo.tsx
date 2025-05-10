import { ChevronDown, ChevronUp, Database, Edit2, Filter, Plus, Search, Trash2, X } from "lucide-react";
import { useState, useMemo } from "react";
import { getIngredients, Ingredient as DataIngredient } from "@/data/ingredients";
import { getProducts } from "@/data/products";

// ============ Types ============
interface UIIngredient extends DataIngredient {
  cost: number;
}

// ============ Table Header Component ============
const TableHeader = ({ 
  columnKey, 
  label, 
  sortConfig, 
  requestSort 
}: { 
  columnKey: string; 
  label: string; 
  sortConfig: { key: string; direction: string } | null; 
  requestSort: (key: string) => void; 
}) => (
  <th
    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
    onClick={() => requestSort(columnKey)}
  >
    <div className="flex items-center">
      {label}
      {sortConfig?.key === columnKey && (
        sortConfig.direction === 'asc' ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />
      )}
    </div>
  </th>
);

// ============ Ingredient Details Component ============
const IngredientDetails = ({ ingredient }: { ingredient: UIIngredient }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div>
      <h4 className="text-sm font-medium text-gray-400 mb-2">Nutritional Values</h4>
      <div className="space-y-2">
        {['Crude Protein','Fat (Ether Extract)','Crude Fiber'].map(n => {
          const comp = ingredient.compositions.find(c => c.nutrient?.name === n);
          return (
            <div key={n} className="flex justify-between">
              <span className="text-gray-500">{comp?.nutrient?.name.replace(' (Ether Extract)','')}: </span>
              <span className="text-gray-200">{comp?.value}{comp?.nutrient?.unit}</span>
            </div>
          );
        })}
      </div>
    </div>

    <div>
      <h4 className="text-sm font-medium text-gray-400 mb-2">Cost Analysis</h4>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Price/unit:</span>
          <span className="text-gray-200">${ingredient.cost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Cost per % protein:</span>
          <span className="text-gray-200">${(ingredient.cost / (ingredient.compositions.find(c => c.nutrient?.name === 'Crude Protein')?.value || 1)).toFixed(3)}/%</span>
        </div>
      </div>
    </div>

    <div>
      <h4 className="text-sm font-medium text-gray-400 mb-2">Description</h4>
      <p className="text-gray-200">{ingredient.description}</p>
    </div>
  </div>
);

// ============ Ingredient Row Component ============
const IngredientRow = ({ 
  ingredient, 
  isExpanded, 
  toggleExpand 
}: { 
  ingredient: UIIngredient; 
  isExpanded: boolean; 
  toggleExpand: (id: string) => void; 
}) => (
  <>
    <tr
      className="hover:bg-gray-700/50 transition-colors cursor-pointer"
      onClick={() => toggleExpand(ingredient.id)}
    >
      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-200">{ingredient.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{ingredient.category?.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-400">
        {ingredient.compositions.find(c => c.nutrient?.name === 'Crude Protein')?.value}%
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-200 font-medium">${ingredient.cost.toFixed(2)}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button className="text-indigo-400 hover:text-indigo-300 mr-4 transition-colors"><Edit2 className="w-4 h-4"/></button>
        <button className="text-red-400 hover:text-red-300 transition-colors"><Trash2 className="w-4 h-4"/></button>
      </td>
    </tr>

    {isExpanded && (
      <tr className="bg-gray-800/70">
        <td colSpan={5} className="px-6 py-4">
          <IngredientDetails ingredient={ingredient} />
        </td>
      </tr>
    )}
  </>
);

// ============ Search Bar Component ============
const SearchBar = ({ 
  searchTerm, 
  setSearchTerm 
}: { 
  searchTerm: string; 
  setSearchTerm: (term: string) => void; 
}) => (
  <div className="relative flex-1">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
    <input
      type="text"
      placeholder="Search ingredients or categories..."
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-gray-200 placeholder-gray-500"
    />
  </div>
);

// ============ Page Header Component ============
const PageHeader = ({ setShowForm }: { setShowForm: (show: boolean) => void }) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div className="flex items-center space-x-3">
      <Database className="w-6 h-6 text-indigo-400" />
      <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
        Ingredient Database
      </h2>
    </div>
    <button 
      onClick={() => setShowForm(true)}
      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center space-x-2 transition-colors"
    >
      <Plus className="w-4 h-4" />
      <span>Add New Ingredient</span>
    </button>
  </div>
);

// ============ Main Component ============
export const IngredientInfo = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Fetch and combine data
  const ingredients = useMemo<UIIngredient[]>(() => {
    const data = getIngredients();
    const products = getProducts();
    return data.map(i => {
      const product = products.find(p => p.ingredientId === i.id);
      return { ...i, cost: product?.price || 0 };
    });
  }, []);

  // Sorting logic
  const sorted = useMemo(() => {
    if (!sortConfig) return ingredients;
    return [...ingredients].sort((a, b) => {
      let aVal: string | number = '';
      let bVal: string | number = '';
      switch (sortConfig.key) {
        case 'name':
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case 'category':
          aVal = a.category?.name.toLowerCase() || '';
          bVal = b.category?.name.toLowerCase() || '';
          break;
        case 'protein':
          aVal = a.compositions.find(c => c.nutrient?.name === 'Crude Protein')?.value || 0;
          bVal = b.compositions.find(c => c.nutrient?.name === 'Crude Protein')?.value || 0;
          break;
        case 'cost':
          aVal = a.cost;
          bVal = b.cost;
          break;
      }
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [ingredients, sortConfig]);

  // Filtering logic
  const filtered = useMemo(() => {
    return sorted.filter(i =>
      i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (i.category?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sorted, searchTerm]);

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <PageHeader setShowForm={setShowForm} />

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg flex items-center space-x-2 transition-colors">
          <Filter className="w-4 h-4 text-gray-400" />
          <span>Filters</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                {['name','category','protein','cost'].map(key => (
                  <TableHeader 
                    key={key}
                    columnKey={key}
                    label={key === 'name' ? 'Ingredient' : key.charAt(0).toUpperCase() + key.slice(1)}
                    sortConfig={sortConfig}
                    requestSort={requestSort}
                  />
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filtered.map(item => (
                <IngredientRow 
                  key={item.id}
                  ingredient={item}
                  isExpanded={expandedId === item.id}
                  toggleExpand={toggleExpand}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Ingredient Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Add New Ingredient</h3>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* form fields... */}
                <div className="md:col-span-2 flex justify-end space-x-3 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
                  >
                    Save Ingredient
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};