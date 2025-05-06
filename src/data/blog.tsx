import { BlogPost } from "@/types";


export const allBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'optimizing-amino-acid-balance',
    title: 'Optimizing Amino Acid Balance in Poultry Diets',
    excerpt: 'Learn how proper amino acid formulation can improve feed efficiency and reduce costs',
    content: '...full article content...',
    image: '/images/blog/amino-acids.jpg',
    category: 'Nutrition',
    tags: ['Amino Acids', 'Poultry', 'Formulation'],
    featured: true,
    date: '2023-11-15',
    readingTime: '8 min read',
    author: {
      name: 'Dr. Sarah Johnson',
      role: 'Poultry Nutritionist',
      image: '/images/authors/sarah-johnson.jpg'
    }
  },
  // Add more posts...
];