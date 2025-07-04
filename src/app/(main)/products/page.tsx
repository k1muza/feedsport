'use client';
import { useEffect, useState } from 'react';
import SecondaryHero from '@/components/common/SecondaryHero';
import CategoryFilter from '@/components/products/CategoryFilter';
import IngredientCard from '@/components/products/IngredientCard';
import { getProducts } from '@/data/products';
import { Product } from '@/types';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <>
      <SecondaryHero
        title="Feed Ingredients & Additives"
        subtitle="Premium-quality raw materials for animal nutrition formulations"
      />
      <div className="container mx-auto px-4 py-12 bg-gray-50">
        {/* Category Filter */}
        <CategoryFilter />

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-7xl mx-auto">
          {products.map((ingredient) => (
            <IngredientCard key={ingredient.id} product={ingredient} />
          ))}
        </div>
      </div>
    </>
  );
}
