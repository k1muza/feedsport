import { Animal } from '@/types/animals';
import type { SeedAnimal } from '@/types/animals';
import type { Ingredient, Nutrient, Product } from '@/types';
import type { NutritionalCategory } from './nutritional_categories';

import animalsData from './animals.json';
import ingredientsData from './ingredients.json';
import nutrientsData from './nutrients.json';
import { ALL_PRODUCTS } from './products';
import { NUTRITIONAL_CATEGORIES } from './nutritional_categories';

interface DbTable<T> {
  bulkAdd(items: T[]): Promise<void>;
  clear(): Promise<void>;
}

class MemoryTable<T> implements DbTable<T> {
  constructor(public data: T[] = []) {}
  async bulkAdd(items: T[]): Promise<void> {
    this.data.push(...items);
  }
  async clear(): Promise<void> {
    this.data = [];
  }
}

export const db = {
  animals: new MemoryTable<Animal>(),
  ingredients: new MemoryTable<Ingredient>(),
  nutrients: new MemoryTable<Nutrient>(),
  categories: new MemoryTable<NutritionalCategory>(),
  products: new MemoryTable<Product>(),
};

export function addTimestamps<T>(data: T[]): Array<T & { createdAt: string; updatedAt: string }> {
  const now = new Date().toISOString();
  return data.map(item => ({
    ...item,
    createdAt: now,
    updatedAt: now,
  }));
}

export async function seedDatabase(): Promise<void> {
  await db.animals.bulkAdd(addTimestamps(animalsData as SeedAnimal[]));
  await db.ingredients.bulkAdd(addTimestamps(ingredientsData as Ingredient[]));
  await db.nutrients.bulkAdd(addTimestamps(nutrientsData as Nutrient[]));
  await db.categories.bulkAdd(addTimestamps(NUTRITIONAL_CATEGORIES));
  await db.products.bulkAdd(addTimestamps(ALL_PRODUCTS));
}
