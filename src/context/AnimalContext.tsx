'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { db, seedDatabase } from '@/data/db';
import { Animal } from '@/types/animals';

interface AnimalContextType {
  animals: Animal[];
  selectedAnimal: Animal | null;
  setSelectedAnimal: (animal: Animal | null) => void;
}

const AnimalContext = createContext<AnimalContextType | undefined>(undefined);

export const AnimalProvider = ({ children }: { children: ReactNode }) => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  useEffect(() => {
    async function load() {
      await seedDatabase();
      const typedAnimals = await db.animals.toArray();
      setAnimals(typedAnimals);
    }
    load();
  }, []);

  return (
    <AnimalContext.Provider value={{ animals, selectedAnimal, setSelectedAnimal }}>
      {children}
    </AnimalContext.Provider>
  );
};

export const useAnimal = (): AnimalContextType => {
  const context = useContext(AnimalContext);
  if (!context) {
    throw new Error('useAnimal must be used within AnimalProvider');
  }
  return context;
};
