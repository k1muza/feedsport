// components/products/CategoryFilter.tsx
'use client';

import { useState } from 'react';
import { IngredientCategory } from '@/types';

export default function CategoryFilter({
  categories,
}: {
  categories: IngredientCategory[];
}) {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <button
        onClick={() => setActiveCategory('all')}
        className={`px-6 py-2 rounded-full ${
          activeCategory === 'all'
            ? 'bg-green-600 text-white'
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }`}
      >
        All Ingredients
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className={`px-6 py-2 rounded-full ${
            activeCategory === category.id
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}