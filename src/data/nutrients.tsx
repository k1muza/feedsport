export interface Nutrient {
  id: string;
  name: string;
  description: string;
  unit: string;
  categoryId: string | null;
}

export const ALL_NUTRIENTS: Nutrient[] = [
  {
    id: '1',
    name: 'Dry Matter',
    description: 'Indicates the amount of nutrients in feed excluding water',
    unit: '%',
    categoryId: null, // Doesn't fit neatly into any category
  },
  {
    id: '2',
    name: 'Crude Protein',
    description: 'Essential for growth and repair of body tissues',
    unit: '%',
    categoryId: 'proteins-and-amino-acids',
  },
  {
    id: '3',
    name: 'Fat (Ether Extract)',
    description: 'Major energy source, also affects fat-soluble vitamin absorption and storage',
    unit: '%',
    categoryId: 'fats',
  },
  {
    id: '4',
    name: 'Crude Fiber',
    description: 'Important for digestive health, impacts digestion and metabolism of nutrients',
    unit: '%',
    categoryId: 'carbohydrates',
  },
  {
    id: '5',
    name: 'Calcium',
    description: 'Essential for bone formation and metabolic functions',
    unit: '%',
    categoryId: 'macro-minerals',
  },
  {
    id: '6',
    name: 'Phosphorus (Total)',
    description: 'Works closely with calcium, important for bones and teeth',
    unit: '%',
    categoryId: 'macro-minerals',
  },
  {
    id: '7',
    name: 'Phosphorus (Available)',
    description: 'Works closely with calcium, important for bones and teeth',
    unit: '%',
    categoryId: 'macro-minerals',
  },
  {
    id: '8',
    name: 'Sodium',
    description: 'Vital for osmoregulation, nerve function, and as part of various body systems',
    unit: '%',
    categoryId: 'macro-minerals',
  },
  {
    id: '9',
    name: 'Chloride',
    description: 'Vital for osmoregulation, nerve function, and as part of various body systems',
    unit: '%',
    categoryId: 'macro-minerals',
  },
  {
    id: '10',
    name: 'Potassium',
    description: 'Vital for osmoregulation, nerve function, and as part of various body systems',
    unit: '%',
    categoryId: 'macro-minerals',
  },
  {
    id: '11',
    name: 'Sulphur',
    description: 'Vital for osmoregulation, nerve function, and as part of various body systems',
    unit: '%',
    categoryId: 'macro-minerals',
  },
  {
    id: '12',
    name: 'Metabolizable Energy (ME)',
    description: 'Energy available from feed that is usable by the animal after metabolic processes',
    unit: 'kcal/lb',
    categoryId: 'metabolizable-energy',
  },
  {
    id: '13',
    name: 'Metabolizable Energy (ME)',
    description: 'Energy available from feed that is usable by the animal after metabolic processes',
    unit: 'kcal/kg',
    categoryId: 'metabolizable-energy',
  },
  {
    id: '14',
    name: 'Metabolizable Energy (ME)',
    description: 'Energy available from feed that is usable by the animal after metabolic processes',
    unit: 'MJ/kg',
    categoryId: 'metabolizable-energy',
  },
  {
    id: '15',
    name: 'Linoleic Acid',
    description: 'An essential fatty acid important for healthy skin and coat',
    unit: '%',
    categoryId: 'fats',
  },
  {
    id: '16',
    name: 'Choline',
    description: 'Vital for liver function and overall metabolism',
    unit: 'mg/kg',
    categoryId: 'choline',
  },
  {
    id: '17',
    name: 'Lysine (Total)',
    description: '',
    unit: '%',
    categoryId: 'proteins-and-amino-acids',
  },
  {
    id: '18',
    name: 'Lysine (Digestible)',
    description: '',
    unit: '%',
    categoryId: 'proteins-and-amino-acids',
  },
  {
    id: '19',
    name: 'Methionine (Total)',
    description: '',
    unit: '%',
    categoryId: 'proteins-and-amino-acids',
  },
  {
    id: '20',
    name: 'Methionine (Digestible)',
    description: '',
    unit: '%',
    categoryId: 'proteins-and-amino-acids',
  },
  {
    id: '21',
    name: 'Cystine (Total)',
    description: '',
    unit: '%',
    categoryId: 'proteins-and-amino-acids',
  },
  {
    id: '22',
    name: 'Cystine (Digestible)',
    description: '',
    unit: '%',
    categoryId: 'proteins-and-amino-acids',
  },
  {
    id: '23',
    name: 'Threonine (Total)',
    description: '',
    unit: '%',
    categoryId: 'proteins-and-amino-acids',
  },
  {
    id: '24',
    name: 'Threonine (Digestible)',
    description: '',
    unit: '%',
    categoryId: 'proteins-and-amino-acids',
  },
  {
    id: '25',
    name: 'Tryptophan (Total)',
    description: '',
    unit: '%',
    categoryId: 'proteins-and-amino-acids',
  },
  {
    id: '26',
    name: 'Tryptophan (Digestible)',
    description: '',
    unit: '%',
    categoryId: 'proteins-and-amino-acids',
  },
  {
    id: '27',
    name: 'Arginine (Total)',
    description: '',
    unit: '%',
    categoryId: 'proteins-and-amino-acids',
  },
  {
    id: '28',
    name: 'Arginine (Digestible)',
    description: '',
    unit: '%',
    categoryId: 'proteins-and-amino-acids',
  },
  {
    id: '29',
    name: 'Isoleucine (Total)',
    description: '',
    unit: '%',
    categoryId: 'proteins-and-amino-acids',
  },
  {
    id: '30',
    name: 'Isoleucine (Digestible)',
    description: '',
    unit: '%',
    categoryId: 'proteins-and-amino-acids',
  },
  {
    id: '31',
    name: 'Valine (Total)',
    description: '',
    unit: '%',
    categoryId: 'proteins-and-amino-acids',
  },
  {
    id: '32',
    name: 'Valine (Digestible)',
    description: '',
    unit: '%',
    categoryId: 'proteins-and-amino-acids',
  },
];

export const getNutrients = (): Nutrient[] => {
  return ALL_NUTRIENTS.map(nutrient => {
    return {
      ...nutrient,
    }
  })
}