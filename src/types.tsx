export type IngredientCategory = {
  id: string;
  name: string;
  description: string;
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

