import { FeedIngredient, IngredientCategory } from "@/types";

export type TechnicalSpecs = {
  [key: string]: string | number;
};

export const PRODUCT_CATEGORIES: IngredientCategory[] = [
  {
    id: 'protein-sources',
    name: 'Protein Sources',
    description: 'High-protein ingredients for balanced animal nutrition',
  },
  {
    id: 'energy-sources',
    name: 'Energy Sources',
    description: 'Carbohydrate-rich ingredients for metabolic energy',
  },
  {
    id: 'minerals',
    name: 'Minerals',
    description: 'Essential macro and trace minerals',
  },
  {
    id: 'additives',
    name: 'Additives',
    description: 'Functional additives for enhanced performance',
  }
];

export const ALL_PRODUCTS: FeedIngredient[] = [
  // Protein Sources
  {
    id: 'soy-48',
    category: 'protein-sources',
    name: 'Soybean Meal (48% CP)',
    description: 'Dehulled, solvent-extracted high-protein soybean meal with optimal amino acid profile',
    technicalSpecs: {
      protein: '48% min',
      moisture: '12% max',
      fiber: '3.5% max',
      fat: '1.5% max',
      urease: '0.05-0.3 pH rise',
      metabolizableEnergy: '3200 kcal/kg'
    },
    applications: ['Poultry', 'Swine', 'Aquaculture', 'Dairy'],
    packaging: '50kg multi-wall paper bags or bulk',
    price: 980,
    moq: 5,
    stock: 250,
    certifications: ['ISO 9001', 'Non-GMO Project Verified'],
    images: [
      '/images/products/soybean/soya.png',
      '/images/products/soybean/soy-1.webp',
      '/images/products/soybean/soy-2.avif',
      '/images/products/soybean/soy-3.avif'
    ],
    benefits: [
      'High protein digestibility',
      'Consistent quality',
      'Improved feed conversion ratio'
    ],
    shipping: 'Available worldwide, sea/land freight',
    featured: true,
  },
  {
    id: 'sunflower-cake',
    category: 'protein-sources',
    name: 'Sunflower Cake',
    description: 'High-protein byproduct of sunflower oil extraction',
    technicalSpecs: {
      protein: '34% min',
      moisture: '10% max',
      fiber: '28% max',
      fat: '1.5% max',
      metabolizableEnergy: '2800 kcal/kg'
    },
    applications: ['Ruminants', 'Poultry', 'Swine'],
    packaging: '50kg polypropylene bags',
    price: 450,
    moq: 10,
    stock: 180,
    certifications: ['ISO 22000'],
    images: ['/images/products/sunflower/sunflower.png'],
    benefits: [
      'Cost-effective protein source',
      'High fiber content',
      'Rich in sulfur-containing amino acids'
    ],
    shipping: 'Available in Africa and Asia',
    featured: true,
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
    images: ['/images/products/fish/fish.png'],
    featured: false
  },

  // Energy Sources
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
    images: ['/images/products/corn/corn.png'],
    featured: false,
  },
  {
    id: 'wheat-bran',
    category: 'energy-sources',
    name: 'Wheat Bran',
    description: 'High-fiber energy ingredient',
    technicalSpecs: {
      protein: '15% min',
      fiber: '11% max',
      moisture: '13% max'
    },
    applications: ['Ruminants', 'Layers'],
    packaging: '50kg bags',
    price: 320,
    moq: 20,
    stock: 420,
    certifications: [],
    images: ['/images/products/wheat/wheat-1.png'],
    featured: true,
  },

  // Minerals
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
    images: ['/images/products/dcp/dcp.png'],
    featured: true,
  },

  // Additives
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
    images: ['/images/products/lysine/lysine.png'],
    featured: false
  }
];

// Helper functions
export const getFeaturedProducts = () => {
  return ALL_PRODUCTS.filter(product => product.featured).slice(0, 4); // Get the first 3 featured products
};

export const getProductsByCategory = (categoryId: string) => {
  return ALL_PRODUCTS.filter(product => product.category === categoryId);
};

export const getProductById = (id: string) => {
  return ALL_PRODUCTS.find(product => product.id === id);
};