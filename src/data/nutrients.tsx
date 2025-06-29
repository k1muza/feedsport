import { Nutrient } from "@/types";
import nutrients from "../data/nutrients.json";
import { db, seedDatabase } from './db';

export const getNutrients = async (): Promise<Nutrient[]> => {
  await seedDatabase();
  if (await db.nutrients.count() === 0) {
    await db.nutrients.bulkAdd(nutrients as Nutrient[]);
  }
  return db.nutrients.toArray();
}

export const getNutrientById = async (id: string): Promise<Nutrient | undefined> => {
  const all = await getNutrients();
  return all.find(n => n.id === id);
}
