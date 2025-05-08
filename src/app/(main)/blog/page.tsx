import BlogCard from '@/components/blog/BlogCard';
import BlogCategories from '@/components/blog/BlogCategories';
import NewsletterSignup from '@/components/blog/NewsletterSignup';
import { allBlogPosts } from '@/data/blog';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogPage() {
  const featuredPost = allBlogPosts.find(post => post.featured);
  const recentPosts = allBlogPosts.filter(post => !post.featured).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Feed Industry Insights
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Expert knowledge on animal nutrition, feed additives, and formulation strategies
        </p>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="mb-20">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 h-96 relative">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:w-1/2">
                <div className="uppercase tracking-wide text-sm text-green-600 font-semibold mb-2">
                  Featured Article • {featuredPost.category}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                      <Image
                        src={featuredPost.author.image}
                        width={40}
                        height={40}
                        alt={featuredPost.author.name}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {featuredPost.author.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(featuredPost.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full"
                  >
                    Read Article
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Articles Grid */}
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <nav className="flex items-center gap-1">
              <button className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-4 py-2 rounded-lg bg-green-600 text-white">
                1
              </button>
              <button className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                2
              </button>
              <button className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                3
              </button>
              <button className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:w-1/3 space-y-8">
          <BlogCategories />
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-lg mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['Amino Acids', 'Mycotoxins', 'Gut Health', 'Sustainability', 'Formulation', 'Regulations'].map(tag => (
                <Link
                  key={tag}
                  href={`/blog/tags/${tag.toLowerCase().replace(' ', '-')}`}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          <NewsletterSignup />
        </div>
      </div>
    </div>
  );
}