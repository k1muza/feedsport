import { FeedIngredient } from "@/types";
import { IngredientCategory } from "@/types";


export const INGREDIENT_CATEGORIES: IngredientCategory[] = [
  {
    id: 'protein-sources',
    name: 'Protein Sources',
    description: 'High-protein ingredients for balanced animal nutrition',
    featured: true
  },
  {
    id: 'energy-sources',
    name: 'Energy Sources',
    description: 'Carbohydrate-rich ingredients for metabolic energy',
    featured: true
  },
  {
    id: 'minerals',
    name: 'Minerals',
    description: 'Essential macro and trace minerals',
    featured: false
  },
  {
    id: 'additives',
    name: 'Additives',
    description: 'Functional additives for enhanced performance',
    featured: true
  }
];

export const FEED_INGREDIENTS: FeedIngredient[] = [
  // PROTEIN SOURCES
  {
    id: 'pr-48sb',
    category: 'protein-sources',
    name: 'Soybean Meal (48% CP)',
    description: 'Dehulled, solvent-extracted soybean meal',
    technicalSpecs: {
      protein: '48% min',
      moisture: '12% max',
      fiber: '3.5% max',
      fat: '1.5% max',
      urease: '0.05-0.3 pH rise'
    },
    applications: ['Poultry', 'Swine', 'Aqua feeds'],
    packaging: '50kg multi-wall paper bags',
    price: 980, // USD/ton
    moq: 5, // Minimum Order Quantity (tons)
    stock: 250, // tons available
    certifications: ['ISO 22000', 'Non-GMO'],
    image: '/images/products/placeholder.png'
  },
  {
    id: 'pr-60fm',
    category: 'protein-sources',
    name: 'Fish Meal (60% CP)',
    description: 'Prime quality anchovy fish meal',
    technicalSpecs: {
      protein: '60% min',
      moisture: '10% max',
      fat: '10% max',
      salt: '3% max',
      sand: '2% max'
    },
    applications: ['Shrimp feeds', 'Poultry starters', 'Pet food'],
    packaging: '50kg poly-lined bags',
    price: 1450,
    moq: 2,
    stock: 80,
    certifications: ['IFFO RS', 'HACCP'],
    image: '/images/products/placeholder.png'
  },

  // ENERGY SOURCES
  {
    id: 'en-cg',
    category: 'energy-sources',
    name: 'Corn Gluten Meal',
    description: 'High-energy byproduct of corn wet milling',
    technicalSpecs: {
      protein: '60% min',
      moisture: '10% max',
      fat: '2% max',
      fiber: '2% max',
      metabolizableEnergy: '3800 kcal/kg'
    },
    applications: ['Poultry', 'Cattle', 'Aqua feeds'],
    packaging: 'Bulk or 25kg bags',
    price: 720,
    moq: 10,
    stock: 150,
    certifications: ['Non-GMO'],
    image: '/images/products/placeholder.png'
  },
  {
    id: 'en-wb',
    category: 'energy-sources',
    name: 'Wheat Bran',
    description: 'High-fiber milling byproduct',
    technicalSpecs: {
      protein: '15% min',
      moisture: '13% max',
      fiber: '11% max',
      starch: '20% min'
    },
    applications: ['Ruminant feeds', 'Layer diets'],
    packaging: '50kg PP bags',
    price: 320,
    moq: 20,
    stock: 500,
    certifications: [],
    image: '/images/products/placeholder.png'
  },

  // MINERALS
  {
    id: 'mi-dcp',
    category: 'minerals',
    name: 'Dicalcium Phosphate (DCP)',
    description: 'Highly bioavailable phosphorus source',
    technicalSpecs: {
      phosphorus: '18% min',
      calcium: '23% min',
      fluorine: '0.18% max',
      heavyMetals: '30ppm max'
    },
    applications: ['All animal feeds'],
    packaging: '25kg bags',
    price: 850,
    moq: 1,
    stock: 40,
    certifications: ['GMP+', 'FAMI-QS'],
    image: '/images/products/placeholder.png'
  },

  // ADDITIVES
  {
    id: 'ad-lys',
    category: 'additives',
    name: 'L-Lysine HCl',
    description: 'Essential amino acid supplement',
    technicalSpecs: {
      purity: '98.5% min',
      lysine: '78.8% min',
      moisture: '1% max',
      ash: '0.3% max'
    },
    applications: ['Swine', 'Poultry', 'Aqua feeds'],
    packaging: '25kg paper bags',
    price: 2200,
    moq: 0.5,
    stock: 15,
    certifications: ['ISO 9001', 'FDA Approved'],
    image: '/images/products/placeholder.png'
  },
  {
    id: 'ad-phy',
    category: 'additives',
    name: 'Phytase Enzyme',
    description: 'Microbial phytase (5000 FTU/g)',
    technicalSpecs: {
      activity: '5000 FTU/g min',
      particleSize: '95% < 0.3mm',
      stability: '85% retention after pelleting'
    },
    applications: ['Poultry', 'Swine', 'Aquaculture'],
    packaging: '20kg foil-lined bags',
    price: 18.50, // per kg
    moq: 25, // kg
    stock: 200, // kg
    certifications: ['EFSA Approved', 'GRAS'],
    image: '/images/products/placeholder.png'
  }
];

// Helper functions
export const getFeaturedIngredients = () => {
  return FEED_INGREDIENTS.filter(ingredient => 
    INGREDIENT_CATEGORIES.find(c => c.id === ingredient.category)?.featured
  );
};

export const getByCategory = (categoryId: string) => {
  return FEED_INGREDIENTS.filter(i => i.category === categoryId);
};