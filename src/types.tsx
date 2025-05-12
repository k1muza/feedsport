export type IngredientCategory = {
  id: number;
  name: string;
};

export type TechnicalSpecs = {
  [key: string]: string;
};

export type FeedIngredient = {
  id: string;
  category: string;
  name: string;
  description: string;
  technicalSpecs: TechnicalSpecs;
  applications: string[];
  packaging: string;
  price: number;
  moq: number;
  stock: number;
  certifications: string[];
  images: string[]; // Optional detailed images
  benefits?: string[]; // Optional benefits
  shipping?: string; // Optional shipping info
  featured?: boolean;
};

export type Author = {
  name: string;
  role: string;
  image: string;
  bio?: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  featured: boolean;
  date: string;
  author: Author;
  readingTime: string;
};

export interface Nutrient {
  id: string;
  name: string;
  description: string;
  unit: string;
  categoryId: string | null;
}

export interface TargetNutrient {
  id: string;
  name: string;
  value: number;
}

export interface NutrientGap {
  name: string;
  currentValue: number;
  targetValue: number;
  gap: number;
}

export type Composition = {
    value: number;
    nutrientId: number;
    nutrient?: Nutrient;
};

export type Ingredient = {
    id: string;
    name: string;
    description: string;
    key_benefits: string[];
    applications: string[];
    categoryId: number;
    category?: IngredientCategory;
    compositions: Composition[];
};

// Types
export interface RatioIngredient extends Ingredient {
  ratio: number;
  costPerKg?: number;
}

export interface IngredientSuggestion {
  ingredient?: Ingredient;
  nutrient?: Nutrient;
  target?: number;
}

export interface OptimizationResult {
  success: boolean;
  message: string;
  updatedIngredients?: RatioIngredient[];
  rawResult?: any;
  suggestions?: IngredientSuggestion[];
}