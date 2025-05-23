'use client';

import { Animal, Program, Stage, Metric, ValueUnit } from '@/types';
import birds from '@/data/birds.json';
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function AnimalNutritionPage() {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);

  // Set initial defaults
  useEffect(() => {
    const initialAnimal = birds.animals[0] as Animal;
    const initialProgram = initialAnimal?.programs[0];
    const initialStage = initialProgram?.stages[0];
    
    setSelectedAnimal(initialAnimal);
    setSelectedProgram(initialProgram);
    setSelectedStage(initialStage);
  }, []);

  // Get filtered data
  const animalSpecies = [...new Set(birds.animals.map(a => a.species))];
  const breeds = birds.animals.filter(a => a.species === selectedAnimal?.species);
  const programs = selectedAnimal?.programs || [];
  const stages = selectedProgram?.stages || [];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900 min-h-screen text-gray-100">
      <header className="mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Animal Nutrition Planner
        </h1>
        <p className="text-gray-400 mt-2">Optimize feed formulations based on growth stages</p>
      </header>

      {/* Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <Select 
          options={animalSpecies}
          label="Species"
          selected={selectedAnimal?.species}
          onSelect={(value) => {
            const animal: Animal | undefined = birds.animals.find(a => a.species === value) as Animal;
            setSelectedAnimal(animal || null);
            setSelectedProgram(animal?.programs[0] || null);
            setSelectedStage(animal?.programs[0]?.stages[0] || null);
          }}
        />

        <Select
          options={breeds.map(b => b.breed)}
          label="Breed"
          selected={selectedAnimal?.breed}
          disabled={!selectedAnimal}
          onSelect={(value) => {
            const animal: Animal | undefined = breeds.find(b => b.breed === value) as Animal;
            setSelectedAnimal(animal || null);
            setSelectedProgram(animal?.programs[0] || null);
            setSelectedStage(animal?.programs[0]?.stages[0] || null);
          }}
        />

        <Select
          options={programs.map(p => p.market_segment)}
          label="Market Segment"
          selected={selectedProgram?.market_segment}
          disabled={!selectedAnimal}
          onSelect={(value) => {
            const program = programs.find(p => p.market_segment === value);
            setSelectedProgram(program || null);
            setSelectedStage(program?.stages[0] || null);
          }}
        />

        <Select
          options={stages.map(s => s.stage)}
          label="Growth Stage"
          selected={selectedStage?.stage}
          disabled={!selectedProgram}
          onSelect={(value) => {
            const stage = stages.find(s => s.stage === value);
            setSelectedStage(stage || null);
          }}
        />
      </div>

      {/* Dashboard Content */}
      {selectedStage && (
        <div className="space-y-8 animate-fade-in">
          {/* Stage Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OverviewCard 
              title="Growth Period"
              value={`${selectedStage.period_days.min}-${selectedStage.period_days.max || '∞'} days`}
              icon="⏳"
            />
            <OverviewCard 
              title="Feed Structure"
              value={selectedStage.feed_structure || 'N/A'}
              icon="🌾"
            />
            <OverviewCard 
              title="Daily Feed"
              value={selectedStage.feeding_amount_per_bird ? 
                `${selectedStage.feeding_amount_per_bird.value}${selectedStage.feeding_amount_per_bird.unit}` : 'N/A'}
              icon="📦"
            />
          </div>

          {/* Nutrition Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <NutritionPanel 
              title="Core Nutrients"
              data={selectedStage.nutritional_requirements}
              color="blue"
            />
            
            <div className="space-y-8">
              <NutritionPanel
                title="Trace Minerals"
                data={selectedStage.added_trace_minerals_per_kg}
                unit="/kg"
                color="purple"
              />
              
              <NutritionPanel
                title="Vitamins"
                data={selectedStage.added_vitamins_per_kg}
                unit="/kg"
                color="green"
              />
            </div>
          </div>

          {/* Key Notes */}
          {selectedStage.key_notes && (
            <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Key Considerations</h3>
              <p className="text-gray-300 leading-relaxed">{selectedStage.key_notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Styled Components
interface NutritionPanelProps {
  title: string;
  data: Record<string, Metric>;
  unit?: string;
  color?: 'blue' | 'purple' | 'green';
}

const NutritionPanel = ({ 
  title, 
  data, 
  unit = '', 
  color = 'blue' 
}: NutritionPanelProps) => {
  const colors = {
    blue: { border: 'border-blue-500/30', text: 'text-blue-400' },
    purple: { border: 'border-purple-500/30', text: 'text-purple-400' },
    green: { border: 'border-green-500/30', text: 'text-green-400' },
  };

  return (
    <div className={`rounded-xl p-6 bg-gray-800/50 backdrop-blur-sm border ${colors[color].border}`}>
      <h3 className={`text-lg font-semibold ${colors[color].text} mb-4`}>{title}</h3>
      <div className="grid gap-3">
        {data && Object.entries(data).map(([key, metric]) => (
          <div key={key} className="flex justify-between items-center p-3 hover:bg-gray-700/20 rounded-lg transition-colors">
            <span className="text-gray-300 capitalize">{key.replace(/_/g, ' ')}</span>
            <span className="font-medium text-gray-100">
              {isValueUnit(metric) ? 
                `${metric.value} ${metric.unit}${unit}` :
                `${metric.min}${metric.max ? `-${metric.max}` : ''} ${metric.unit}${unit}`
              }
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface OverviewCardProps {
  title: string;
  value: string;
  icon: string;
}

const OverviewCard = ({ title, value, icon }: OverviewCardProps) => (
  <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-blue-400/30 transition-all">
    <div className="flex items-center gap-4">
      <span className="text-2xl">{icon}</span>
      <div>
        <h3 className="text-sm text-gray-400 mb-1">{title}</h3>
        <p className="text-xl font-semibold text-gray-100">{value}</p>
      </div>
    </div>
  </div>
);

interface SelectProps {
  options: string[];
  label: string;
  selected?: string;
  onSelect: (value: string) => void;
  disabled?: boolean;
}

const Select = ({ 
  options, 
  label, 
  selected, 
  onSelect, 
  disabled 
}: SelectProps) => (
  <div className="relative">
    <label className="block text-sm text-gray-400 mb-2">{label}</label>
    <div className="relative">
      <select
        value={selected}
        disabled={disabled}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full pl-4 pr-10 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 
                   appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <option value="" disabled>Select {label}</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
    </div>
  </div>
);

// Type guard
function isValueUnit(metric: Metric): metric is ValueUnit {
  return (metric as ValueUnit).value !== undefined;
}
