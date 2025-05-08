import CategoryFilter from '@/components/products/CategoryFilter';
import IngredientCard from '@/components/products/IngredientCard';
import { INGREDIENT_CATEGORIES } from '@/data/ingredient_categories';
import { getProducts } from '@/data/products';

export default function ProductsPage() {
  const products = getProducts();
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Feed Ingredients & Additives
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Premium-quality raw materials for animal nutrition formulations
        </p>
      </section>

      {/* Category Filter */}
      <CategoryFilter categories={INGREDIENT_CATEGORIES} />

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {products.map((ingredient) => (
          <IngredientCard key={ingredient.id} product={ingredient} />
        ))}
      </div>
    </div>
  );
}