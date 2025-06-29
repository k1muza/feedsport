// /components/auth/HeroSection.tsx
import { FiCloud } from 'react-icons/fi';
import { FEATURES, STATS } from './constants';

const HeroSection = () => (
  <div className="w-full md:w-1/2 bg-gradient-to-br from-green-600 to-teal-700 p-8 md:p-12 text-white flex flex-col justify-between">
    <div>
      <div className="flex items-center mb-8">
        {/* Logo */}
        <div className="bg-white/20 p-2 rounded-lg">
          <div className="bg-white p-1 rounded-md">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-md flex items-center justify-center">
              <FiCloud className="text-white text-xl" />
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold ml-3">FeedSport</h1>
      </div>

      <div className="max-w-md">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Revolutionizing Animal Nutrition with AI
        </h2>
        <p className="text-lg md:text-xl opacity-90 mb-8">
          Optimize feed formulas, predict nutritional outcomes, and enhance livestock health with our cutting-edge AI platform.
        </p>

        <div className="flex flex-col space-y-4 mb-12">
          {FEATURES.map((feature, index) => (
            <div key={index} className="flex items-center">
              <div className="bg-teal-500/30 p-2 rounded-full mr-3">
                <feature.icon className="text-teal-300 text-xl" />
              </div>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Stat Cards */}
    <div className="hidden md:block">
      <div className="flex space-x-4">
        {STATS.map((stat, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex-1">
            <div className="flex items-center mb-2">
              <div className={`w-3 h-3 rounded-full ${stat.color} mr-2`}></div>
              <span className="font-medium">{stat.label}</span>
            </div>
            <div className="h-1 w-full bg-gray-600 rounded-full mb-1">
              <div className={`h-1 ${stat.color} rounded-full`} style={{ width: stat.value }}></div>
            </div>
            <p className="text-xs opacity-80">{stat.metric}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default HeroSection;