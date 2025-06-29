import { Product } from "@/types";
import { getIngredients } from "./ingredients";
import { db, seedDatabase, addTimestamps } from './db';


export type SeedProduct = Omit<Product, 'createdAt' | 'updatedAt'>;
export const ALL_PRODUCTS: SeedProduct[] = [
  // Protein Sources
  {
    id: 'soy-48',
    ingredientId: '35',
    packaging: '50kg multi-wall paper bags or bulk',
    price: 980,
    moq: 5,
    stock: 250,
    certifications: ['ISO 9001', 'Non-GMO Project Verified'],
    images: [
      '/images/products/soybean/soy-4.png',
      '/images/products/soybean/soy-1.webp',
      '/images/products/soybean/soy-2.avif',
      '/images/products/soybean/soy-3.avif'
    ],
    shipping: 'Available worldwide, sea/land freight',
    featured: true,
  },
  {
    id: 'sunflower-cake',
    ingredientId: '37',
    packaging: '50kg polypropylene bags',
    price: 450,
    moq: 10,
    stock: 180,
    certifications: ['ISO 22000'],
    images: ['/images/products/sunflower/sunflower.png'],
    shipping: 'Available in Africa and Asia',
    featured: true,
  },
  {
    id: 'pr-60fm',
    ingredientId: '14',
    packaging: '50kg poly-lined bags',
    price: 1450,
    moq: 2,
    stock: 80,
    certifications: ['IFFO RS', 'HACCP'],
    images: ['/images/products/fish/fish.png'],
    featured: false
  },

  // Energy Sources
  {
    id: 'en-cg',
    ingredientId: "6",
    packaging: 'Bulk or 25kg bags',
    price: 720,
    moq: 10,
    stock: 150,
    certifications: ['Non-GMO'],
    images: ['/images/products/corn/corn.png'],
    featured: false,
  },
  {
    id: 'wheat-bran',
    ingredientId: "41",
    packaging: '50kg bags',
    price: 320,
    moq: 20,
    stock: 420,
    certifications: [],
    images: ['/images/products/wheat/wheat.png'],
    featured: true,
  },

  // Minerals
  {
    id: 'mi-dcp',
    ingredientId: '9',
    packaging: '25kg bags',
    price: 850,
    moq: 1,
    stock: 40,
    certifications: ['GMP+', 'FAMI-QS'],
    images: ['/images/products/dcp/dcp.png'],
    featured: true,
  },

  // Additives
  {
    id: 'ad-lys',
    ingredientId: '16',
    packaging: '25kg paper bags',
    price: 2200,
    moq: 0.5,
    stock: 15,
    certifications: ['ISO 9001', 'FDA Approved'],
    images: ['/images/products/lysine/lysine.png'],
    featured: false
  }
];

export const getProducts = async (): Promise<Product[]> => {
  await seedDatabase();
  if (await db.products.count() === 0) {
    await db.products.bulkAdd(addTimestamps(ALL_PRODUCTS as SeedProduct[]) as Product[]);
  }
  const products = await db.products.toArray();
  const ingredients = await getIngredients();
  return products.map(product => ({
    ...product,
    ingredient: ingredients.find(ingredient => ingredient.id === product.ingredientId)
  }));
}

// Helper functions
export const getFeaturedProducts = async (): Promise<Product[]> => {
  const products = await getProducts();
  return products.filter(product => product.featured).slice(0, 4);
};

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  const products = await getProducts();
  return products.filter(product => product.ingredient?.category === categoryId);
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  const products = await getProducts();
  return products.find(product => product.id === id);
};

export const getProductByIngredientId = async (ingredientId: string): Promise<Product | undefined> => {
  const products = await getProducts();
  return products.find(product => product.ingredientId === ingredientId);
}
