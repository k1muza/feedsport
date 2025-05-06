// @/types/products.ts
export type IngredientCategory = {
  id: string;
  name: string;
  description: string;
  featured: boolean;
};

export type TechnicalSpecs = {
  [key: string]: string | number;
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
  moq: number; // Minimum Order Quantity
  stock: number;
  certifications: string[];
  image: string;
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

