'use client';
import { useEffect, useState } from 'react';
import { getProducts } from '../../data/products';
import ProductCard from './ProductCard';
import { Product } from '@/types';

export default function RelatedProducts({
  currentProductId,
  category
}: {
  currentProductId: string,
  category: string | undefined
}) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function load() {
      if (!category) return;
      const products = await getProducts();
      setRelatedProducts(
        products
          .filter(p => p.ingredient?.category === category && p.id !== currentProductId)
          .slice(0, 4)
      );
    }
    load();
  }, [category, currentProductId]);

  if (!category || relatedProducts.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
