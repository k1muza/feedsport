import ProductCard from './ProductCard';

async function getRelatedProducts(category: string, excludeId: string) {
  // In a real app, fetch from API
  const allProducts = [
    {
      id: 'sunflower-cake',
      name: 'Sunflower Cake',
      category: 'protein-sources',
      description: 'High-fiber protein supplement',
      price: 450,
      image: '/images/products/sunflower-cake.jpg'
    },
    // ... other products
  ];

  return allProducts.filter(
    product => product.category === category && product.id !== excludeId
  ).slice(0, 4);
}

export default async function RelatedProducts({ 
  currentProductId, 
  category 
}: { 
  currentProductId: string, 
  category: string 
}) {
  const relatedProducts = await getRelatedProducts(category, currentProductId);

  if (relatedProducts.length === 0) return null;

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