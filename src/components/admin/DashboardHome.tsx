import { AlertCircle, BarChart2, Database, List, Package } from "lucide-react";

export function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Stats Cards - Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Ingredients", value: "42", change: "+5%", icon: Database },
          { title: "Low Stock Items", value: "7", change: "-2%", icon: AlertCircle },
          { title: "Active Recipes", value: "15", change: "+10%", icon: List },
          { title: "Monthly Usage", value: "1.2t", change: "+15%", icon: BarChart2 }
        ].map((stat, i) => (
          <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 hover:border-indigo-400/30 transition-colors">
            <div className="flex justify-between">
              <stat.icon className="w-6 h-6 text-indigo-400" />
              <span className={`text-xs px-2 py-1 rounded-full ${
                stat.change.startsWith('+') ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-400 text-sm mt-3">{stat.title}</h3>
            <p className="text-2xl font-semibold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Recent Activity</h3>
          <button className="text-sm text-indigo-400 hover:text-indigo-300">View All</button>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-start group">
              <div className="flex-shrink-0 mt-1 bg-indigo-500/10 p-2 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
                <Package className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium group-hover:text-indigo-400 transition-colors">
                  Stock updated for Corn Meal
                </p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}