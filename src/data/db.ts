import Dexie, { Table } from 'dexie';
import { Animal } from '@/types/animals';
import { Ingredient, Nutrient, Product, BlogPost } from '@/types';
import { NUTRITIONAL_CATEGORIES, NutritionalCategory } from './nutritional_categories';
import animalsData from './animals.json';
import ingredientsData from './ingredients.json';
import nutrientsData from './nutrients.json';
import { ALL_PRODUCTS } from './products';
import { allBlogPosts } from './blog';

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
  await db.transaction('rw', db.animals, db.ingredients, db.nutrients, db.products, db.blogPosts, db.categories, async () => {
    if ((await db.animals.count()) === 0) {
      await db.animals.bulkAdd(animalsData as Animal[]);
    }
    if ((await db.ingredients.count()) === 0) {
      await db.ingredients.bulkAdd(ingredientsData as Ingredient[]);
    }
    if ((await db.nutrients.count()) === 0) {
      await db.nutrients.bulkAdd(nutrientsData as Nutrient[]);
    }
    if ((await db.products.count()) === 0) {
      await db.products.bulkAdd(ALL_PRODUCTS as Product[]);
    }
    if ((await db.blogPosts.count()) === 0) {
      await db.blogPosts.bulkAdd(allBlogPosts as BlogPost[]);
    }
    if ((await db.categories.count()) === 0) {
      await db.categories.bulkAdd(NUTRITIONAL_CATEGORIES as NutritionalCategory[]);
    }
  });
}
