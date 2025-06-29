'use client';
import { useEffect, useMemo, useState } from "react";
import { getIngredients } from "@/data/ingredients";
import { getNutrients } from "@/data/nutrients";
import { getProducts } from "@/data/products";
import { Ingredient as DataIngredient, Nutrient } from "@/types";
import { ChevronDown, ChevronUp, Database, Eye, Filter, Plus, Search, Settings, Trash2, X } from "lucide-react";
import Link from "next/link";

// ============ Types ============
interface UIIngredient extends DataIngredient {
  cost: number;
}

// ============ Column Configuration Modal ============
const ColumnConfigModal = ({
  isOpen,
  onClose,
  allNutrients,
  visibleColumns,
  setVisibleColumns
}: {
  isOpen: boolean;
  onClose: () => void;
  allNutrients: Nutrient[];
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

  const filteredNutrients = useMemo(() => {
    if (!searchTerm) return allNutrients;
    return allNutrients.filter(nutrient => 
      nutrient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (nutrient.description || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allNutrients, searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="p-6 flex-grow overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Configure Nutrient Columns</h3>
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
              {filteredNutrients.length > 0 ? (
                filteredNutrients.map(nutrient => (
                  <div key={nutrient.id} className="flex items-center group">
                    <input
                      type="checkbox"
                      id={`col-${nutrient.id}`}
                      checked={tempVisibleColumns.includes(nutrient.id)}
                      onChange={() => toggleColumn(nutrient.id)}
                      className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
                    />
                    <label 
                      htmlFor={`col-${nutrient.id}`} 
                      className="ml-3 text-gray-200 flex-grow group-hover:text-white transition-colors"
                    >
                      <div className="font-medium">{nutrient.name}</div>
                      {nutrient.description && (
                        <div className="text-xs text-gray-400 mt-1">{nutrient.description}</div>
                      )}
                      <div className="text-xs text-gray-500 mt-1">
                        Unit: {nutrient.unit || 'N/A'} | ID: {nutrient.id}
                      </div>
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

// ============ Filter Modal Component ============
const FilterModal = ({
  isOpen,
  onClose,
  categories,
  selectedCategories,
  setSelectedCategories
}: {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) => {
  const [tempSelected, setTempSelected] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTempSelected([...selectedCategories]);
    }
  }, [isOpen, selectedCategories]);

  const toggleCategory = (category: string) => {
    setTempSelected(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const applyFilters = () => {
    setSelectedCategories(tempSelected);
    onClose();
  };

  const clearFilters = () => {
    setTempSelected([]);
    setSelectedCategories([]);
    onClose();
  };

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return categories;
    return categories.filter(cat => 
      cat.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="p-6 flex-grow overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Filter by Category</h3>
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
              placeholder="Search categories..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-gray-200 placeholder-gray-500"
            />
          </div>
          
          <div className="overflow-y-auto flex-grow mb-4 pr-2 -mr-2">
            <div className="space-y-3">
              {filteredCategories.length > 0 ? (
                filteredCategories.map(category => (
                  <div key={category} className="flex items-center group">
                    <input
                      type="checkbox"
                      id={`cat-${category}`}
                      checked={tempSelected.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
                    />
                    <label 
                      htmlFor={`cat-${category}`} 
                      className="ml-3 text-gray-200 flex-grow group-hover:text-white transition-colors"
                    >
                      <div className="font-medium">{category}</div>
                    </label>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-400">
                  No categories found matching "{searchTerm}"
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-between space-x-3 pt-2 border-t border-gray-700">
            <button
              type="button"
              onClick={clearFilters}
              className="px-4 py-2 text-red-400 hover:text-red-300 transition-colors"
            >
              Clear All
            </button>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applyFilters}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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

// ============ Ingredient Row Component ============
const IngredientRow = ({
  ingredient,
  visibleNutrientColumns
}: {
  ingredient: UIIngredient;
  visibleNutrientColumns: Nutrient[];
}) => (
  <>
    <tr
      className="hover:bg-gray-700/50 transition-colors cursor-pointer"
    >
      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-200">{ingredient.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{ingredient.category}</td>

      {visibleNutrientColumns.map(nutrient => {
        const composition = ingredient.compositions.find(c => c.nutrientId === nutrient.id);
        return (
          <td key={nutrient.id} className="px-6 py-4 whitespace-nowrap text-gray-400">
            {composition?.value.toFixed(2) ?? 'N/A'}{nutrient.unit ? nutrient.unit : ''}
          </td>
        );
      })}

      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex">
        <Link href={`/admin/ingredients/${ingredient.id}`} className="text-indigo-400 hover:text-indigo-300 mr-4 transition-colors">
          <Eye className="w-4 h-4" />
        </Link>
        <Link href={`/admin/ingredients/${ingredient.id}/delete`}  className="text-red-400 hover:text-red-300 transition-colors">
          <Trash2 className="w-4 h-4" />
        </Link>
      </td>
    </tr>
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
export const IngredientList = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [showColumnConfig, setShowColumnConfig] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [allNutrients, setAllNutrients] = useState<Nutrient[]>([]);
  const [ingredients, setIngredients] = useState<UIIngredient[]>([]);

  useEffect(() => {
    async function load() {
      const nutrientData = await getNutrients();
      setAllNutrients(nutrientData);
      const data = await getIngredients();
      const products = await getProducts();
      setIngredients(data.map(i => {
        const product = products.find(p => p.ingredientId === i.id);
        return { ...i, cost: product?.price || 0 };
      }));
    }
    load();
  }, []);

  // Get all unique categories
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    ingredients.forEach(ingredient => {
      if (ingredient.category) {
        categories.add(ingredient.category);
      }
    });
    return Array.from(categories).sort();
  }, [ingredients]);

  // Initialize visible columns
  useEffect(() => {
    const savedColumns = localStorage.getItem('visibleColumns');
    if (savedColumns) {
      try {
        setVisibleColumns(JSON.parse(savedColumns));
      } catch (e) {
        console.error('Failed to parse visibleColumns', e);
        // Set default columns if parsing fails
        setDefaultVisibleColumns();
      }
    } else {
      setDefaultVisibleColumns();
    }
    
    function setDefaultVisibleColumns() {
      // Set default columns based on common nutrients
      const defaultColumns = allNutrients
        .filter(n => ['Crude protein', 'Crude fat', 'Crude fibre'].includes(n.name))
        .map(n => n.id);
      setVisibleColumns(defaultColumns);
    }
  }, [allNutrients]);

  // Persist column config to localStorage
  useEffect(() => {
    localStorage.setItem('visibleColumns', JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  // Calculate visible nutrient columns
  const visibleNutrientColumns = useMemo(() => {
    return allNutrients.filter(nutrient => visibleColumns.includes(nutrient.id));
  }, [allNutrients, visibleColumns]);

  // Sorting logic
  const sorted = useMemo(() => {
    if (!sortConfig) return ingredients;
    return [...ingredients].sort((a, b) => {
      let aVal: string | number = '';
      let bVal: string | number = '';

      if (sortConfig.key === 'name') {
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
      } else if (sortConfig.key === 'category') {
        aVal = a.category?.toLowerCase() || '';
        bVal = b.category?.toLowerCase() || '';
      } else {
        // Handle nutrient columns by ID
        aVal = a.compositions.find(c => c.nutrientId === sortConfig.key)?.value || 0;
        bVal = b.compositions.find(c => c.nutrientId === sortConfig.key)?.value || 0;
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [ingredients, sortConfig]);

  // Filtering logic
  const filtered = useMemo(() => {
    let result = sorted;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(i =>
        i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (i.category || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter if any selected
    if (selectedCategories.length > 0) {
      result = result.filter(i => 
        i.category && selectedCategories.includes(i.category)
      );
    }
    
    return result;
  }, [sorted, searchTerm, selectedCategories]);

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="space-y-6">
      <PageHeader setShowForm={setShowForm} />

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="flex gap-4">
          <button 
            onClick={() => setShowColumnConfig(true)}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Settings className="w-4 h-4 text-gray-400" />
            <span>Columns</span>
          </button>
          <button 
            onClick={() => setShowFilterModal(true)}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg flex items-center space-x-2 transition-colors relative"
          >
            <Filter className="w-4 h-4 text-gray-400" />
            <span>Filters</span>
            {selectedCategories.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {selectedCategories.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-gray-400 text-sm">Active filters:</span>
          {selectedCategories.map(category => (
            <div 
              key={category} 
              className="px-3 py-1 bg-gray-700 rounded-full flex items-center text-sm"
            >
              {category}
              <button 
                onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== category))}
                className="ml-2 text-gray-400 hover:text-gray-200"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          <button 
            onClick={() => setSelectedCategories([])}
            className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <TableHeader
                  columnKey="name"
                  label="Name"
                  sortConfig={sortConfig}
                  requestSort={requestSort}
                />
                <TableHeader
                  columnKey="category"
                  label="Category"
                  sortConfig={sortConfig}
                  requestSort={requestSort}
                />
                
                {visibleNutrientColumns.map(nutrient => (
                  <TableHeader
                    key={nutrient.id}
                    columnKey={nutrient.id}
                    label={`${nutrient.name}${nutrient.unit ? ` (${nutrient.unit})` : ''}`}
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
                  visibleNutrientColumns={visibleNutrientColumns}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Column Configuration Modal */}
      <ColumnConfigModal
        isOpen={showColumnConfig}
        onClose={() => setShowColumnConfig(false)}
        allNutrients={allNutrients}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
      />

      {/* Category Filter Modal */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        categories={allCategories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

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
                {/* form fields would go here */}
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
