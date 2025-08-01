import { getAnimals } from '@/data/animals';
import { getIngredients } from '@/data/ingredients';
import { getNutrients } from '@/data/nutrients';
import { Activity, AlertCircle, Database, List, Package } from 'lucide-react';

export function DashboardHome() {
  // Fetch data
  const ingredients = getIngredients();
  const nutrients = getNutrients();
  const animals = getAnimals();

  // Stats
  const totalIngredients = ingredients.length;
  const totalNutrients = nutrients.length;
  const totalAnimals = animals.length;
  const totalPrograms = animals.reduce((sum, a) => sum + a.programs.length, 0);

  // Bar chart data: Ingredients by Category
  const categoryCounts = ingredients.reduce((acc, ing) => {
    const category = ing.category || 'Uncategorized';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const barData = Object.entries(categoryCounts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);

  // Pie chart data: Programs by Animal Species
  const programCounts = animals.map(a => ({ 
    name: a.species, 
    value: a.programs.length 
  }));
  
  // Colors for charts
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f7f', '#8dd1e1', '#a4de6c', '#d0ed57'];
  const BAR_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f7f', '#8dd1e1', '#a4de6c', '#d0ed57'];

  // Recently added ingredients (last 5)
  const recentIngredients = [...ingredients]
    .sort((a, b) => b.id.localeCompare(a.id))
    .slice(0, 5);

  return (
    <div className="space-y-8 p-6 text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Dashboard Overview</h1>
          <p className="text-gray-400">Your feed formulation insights at a glance</p>
        </div>
        <div className="flex items-center space-x-2 bg-indigo-900/30 px-4 py-2 rounded-lg">
          <Activity className="w-5 h-5 text-indigo-400" />
          <span className="text-sm text-gray-300">Last updated: Today</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'Ingredients', 
            value: totalIngredients, 
            icon: Database, 
            desc: 'Available raw materials',
            color: 'bg-indigo-500/20'
          },
          { 
            title: 'Nutrients', 
            value: totalNutrients, 
            icon: AlertCircle, 
            desc: 'Tracked components',
            color: 'bg-emerald-500/20'
          },
          { 
            title: 'Animals', 
            value: totalAnimals, 
            icon: Package, 
            desc: 'Species managed',
            color: 'bg-amber-500/20'
          },
          { 
            title: 'Programs', 
            value: totalPrograms, 
            icon: List, 
            desc: 'Feeding programs',
            color: 'bg-rose-500/20'
          },
        ].map((stat, idx) => (
          <div 
            key={idx} 
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-xl p-5 hover:border-indigo-400/30 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-100">{stat.value}</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-100 mt-4">{stat.title}</h3>
            <p className="text-gray-400 text-sm mt-1">{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* Data Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ingredients by Category */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-100">Ingredients by Category</h3>
              <p className="text-gray-400 text-sm">Distribution of raw materials</p>
            </div>
            <div className="bg-gray-700/50 px-3 py-1 rounded-full text-sm text-gray-300">
              {Object.keys(categoryCounts).length} categories
            </div>
          </div>
          <div className="space-y-2">
            {barData.map((item, index) => (
              <div key={item.category} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded mr-3" 
                    style={{ backgroundColor: BAR_COLORS[index % BAR_COLORS.length] }}
                  ></div>
                  <span className="text-gray-100">{item.category}</span>
                </div>
                <span className="text-indigo-300 font-semibold">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Programs by Species */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-100">Programs by Animal Species</h3>
              <p className="text-gray-400 text-sm">Distribution of feeding programs</p>
            </div>
            <div className="bg-gray-700/50 px-3 py-1 rounded-full text-sm text-gray-300">
              {programCounts.length} species
            </div>
          </div>
          <div className="space-y-2">
            {programCounts.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded mr-3" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-gray-100">{item.name}</span>
                </div>
                <span className="text-indigo-300 font-semibold">{item.value} programs</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Additions */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-100">Recently Added Ingredients</h3>
            <p className="text-gray-400 text-sm">Latest additions to your inventory</p>
          </div>
          <button className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center">
            View all
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <ul className="space-y-3">
          {recentIngredients.map((ing, index) => (
            <li 
              key={ing.id} 
              className="flex items-center p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors group"
            >
              <div 
                className="w-3 h-3 rounded-full mr-3"
                style={{ backgroundColor: BAR_COLORS[index % BAR_COLORS.length] }}
              ></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-100 truncate group-hover:text-indigo-300 transition-colors">
                  {ing.name}
                </p>
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-gray-400">Category: {ing.category || 'N/A'}</p>
                  <p className="text-xs text-gray-400">ID: {ing.id}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
