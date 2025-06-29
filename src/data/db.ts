import Dexie, { Table } from 'dexie';
import { Animal } from '@/types/animals';
import { Ingredient, Nutrient, Product, BlogPost } from '@/types';
import { NUTRITIONAL_CATEGORIES, NutritionalCategory, SeedNutritionalCategory } from './nutritional_categories';
import animalsData from './animals.json';
import ingredientsData from './ingredients.json';
import nutrientsData from './nutrients.json';
import { ALL_PRODUCTS, SeedProduct } from './products';
import { allBlogPosts, SeedBlogPost } from './blog';

export function addTimestamps<T extends { [key: string]: any }>(items: T[]): T[] {
  const now = new Date().toISOString();
  return items.map(item => ({
    createdAt: now,
    updatedAt: now,
    ...item,
  }));
}

class AppDB extends Dexie {
  animals!: Table<Animal, number>;
  ingredients!: Table<Ingredient, string>;
  nutrients!: Table<Nutrient, string>;
  products!: Table<Product, string>;
  blogPosts!: Table<BlogPost, string>;
  categories!: Table<NutritionalCategory, string>;

  constructor() {
    super('FeedSportDB');
    this.version(1).stores({
      animals: 'id',
      ingredients: 'id, category',
      nutrients: 'id',
      products: 'id, ingredientId',
      blogPosts: 'id, slug',
      categories: 'id'
    });
  }
}

export const db = new AppDB();

export async function seedDatabase() {
  await db.transaction('rw', [db.animals, db.ingredients, db.nutrients, db.products, db.blogPosts, db.categories], async () => {
    if ((await db.animals.count()) === 0) {
      await db.animals.bulkAdd(addTimestamps(animalsData as Animal[]));
    }
    if ((await db.ingredients.count()) === 0) {
      await db.ingredients.bulkAdd(addTimestamps(ingredientsData as Ingredient[]));
    }
    if ((await db.nutrients.count()) === 0) {
      await db.nutrients.bulkAdd(addTimestamps(nutrientsData as Nutrient[]));
    }
    if ((await db.products.count()) === 0) {
      await db.products.bulkAdd(addTimestamps(ALL_PRODUCTS as SeedProduct[]) as Product[]);
    }
    if ((await db.blogPosts.count()) === 0) {
      await db.blogPosts.bulkAdd(addTimestamps(allBlogPosts as SeedBlogPost[]) as BlogPost[]);
    }
    if ((await db.categories.count()) === 0) {
      await db.categories.bulkAdd(addTimestamps(NUTRITIONAL_CATEGORIES as SeedNutritionalCategory[]) as NutritionalCategory[]);
    }
  });
}
