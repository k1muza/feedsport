import { Animal } from "@/types/animals";
import { getNutrients } from "./nutrients";
import { db, seedDatabase } from './db';

export async function getAnimals(): Promise<Animal[]> {
  await seedDatabase();
  const animals = await db.animals.toArray();
  const nutrients = await getNutrients();
  return animals.map(animal => ({
    ...animal,
    programs: animal.programs.map(program => ({
      ...program,
      stages: program.stages.map(stage => ({
        ...stage,
        requirements: stage.requirements.map(requirement => ({
          ...requirement,
          nutrient: nutrients.find(nutrient => nutrient.id === requirement.nutrientId),
          min: requirement.min?.valueOf() ?? 0,
          max: requirement.max?.valueOf(),
          value: requirement.value?.valueOf() ?? 0
        }))
      }))
    }))
  }));
}
