import { Result } from "glpk.js";

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
  category?: string | null;
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
    nutrientId: number | string;
    nutrient?: Nutrient;
};

export type Ingredient = {
    id: string;
    name: string;
    description: string;
    key_benefits?: string[];
    applications?: string[];
    category?: string;
    compositions: Composition[];
};

export type Product = {
  id: string;
  ingredientId: string;
  ingredient?: Ingredient;
  packaging: string;
  price: number;
  moq: number;
  stock: number;
  certifications: string[];
  images: string[];
  shipping?: string;
  featured?: boolean;
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
  rawResult?: Result;
  suggestions?: IngredientSuggestion[];
}

export interface Program {
  id: number;
  market_segment: string;
  stages: Stage[];
}

// One phase within a program (Starter, Grower, Finisher, etc.)
export interface Stage {
  id: number;
  stage: string;
  slug: string;
  period_days: PeriodDays;
  feed_structure: string | null;
  feeding_amount_per_bird: ValueUnit | null;
  nutritional_requirements: Record<string, Metric>;
  added_trace_minerals_per_kg: Record<string, ValueUnit>;
  added_vitamins_per_kg: Record<string, ValueUnit>;
  minimum_specifications: Record<string, RangeUnit>;
  water_requirement: WaterRequirement | null;
  key_notes: string;
}

// e.g. { min: 0, max: 10, notes?: "until market" }
export interface PeriodDays {
  min: number;
  max: number | null;
  notes?: string;
}

// Simple value + unit
export interface ValueUnit {
  value: number;
  unit: string;
}

// Range of values + unit
export interface RangeUnit {
  min?: number;
  max?: number | null;
  unit?: string;
}

// Either a ValueUnit or a RangeUnit
export type Metric = ValueUnit | RangeUnit;

// Water specs: may include different flow‐rate arrays or a ratio
export interface WaterRequirement {
  flow_rate_per_minute?: FlowRate[];
  flow_rate_per_30_seconds?: FlowRate[];
  water_to_feed_ratio?: RangeUnit;
}

// e.g. { age_weeks: {min:2,max:4}, min:34, max:48, unit:"ml/min" }
export interface FlowRate {
  age_weeks: { min: number; max: number | null };
  min: number | null;
  max: number | null;
  unit: string;
}
