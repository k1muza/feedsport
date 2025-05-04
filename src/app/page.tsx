'use client'; // Required for interactivity

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  FaBars,
  FaCheck,
  FaCommentDots,
  FaEnvelope,
  FaFacebookF,
  FaGlobeAmericas,
  FaHeadset,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaSearch,
  FaSeedling,
  FaStar,
  FaTimes,
  FaTrophy,
  FaTruck,
  FaTwitter
} from 'react-icons/fa';
import { FaWheatAwn } from 'react-icons/fa6';

export default function Home() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <Head>
        <title>FeedSport | Premium Livestock Feed Ingredients</title>
        <meta name="description" content="High-quality animal feeds and nutrition solutions for poultry, cattle, and swine" />
      </Head>

      {/* Spinner */}
      <div id="spinner" className="hidden fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>

      {/* Topbar */}
      <div className="bg-gray-100 py-2 hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <div className="border-r border-green-600 pr-3">
                <Link href="/locations" className="flex text-gray-600 text-sm hover:text-green-600">
                  <FaMapMarkerAlt className="text-green-600 mr-2" />
                  Find A Distributor
                </Link>
              </div>
              <div className="pl-3">
                <Link href="mailto:sales@feedsport.com" className="flex text-gray-600 text-sm hover:text-green-600">
                  <FaEnvelope className="text-green-600 mr-2" />
                  sales@feedsport.com
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex space-x-3 border-r border-green-600 pr-3">
                <Link href="https://www.facebook.com/share/16PXsk9S5S/" className="text-green-600 hover:text-green-800">
                  <FaFacebookF />
                </Link>
                <Link href="#" className="text-green-600 hover:text-green-800">
                  <FaTwitter />
                </Link>
                <Link href="#" className="text-green-600 hover:text-green-800">
                  <FaInstagram />
                </Link>
              </div>
              <div className="dropdown ml-3">
                <button className="flex items-center text-gray-700 text-sm">
                  <FaGlobeAmericas className="text-green-600 mr-2" /> English
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white shadow-md py-4">
        <div className="container mx-auto px-20 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-green-700 flex">
            <FaWheatAwn className="text-green-600 mr-2" /> FeedSport
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-green-700 font-medium hover:text-green-600">Home</Link>
            <Link href="/about" className="text-gray-600 hover:text-green-600">About</Link>
            <Link href="/products" className="text-gray-600 hover:text-green-600">Products</Link>
            <Link href="/blog" className="text-gray-600 hover:text-green-600">Resources</Link>
            <Link href="/contact" className="text-gray-600 hover:text-green-600">Contact</Link>
            <button
              onClick={() => setShowSearch(true)}
              className="bg-green-100 p-2 rounded-full hover:bg-green-200"
            >
              <FaSearch className="text-green-700" />
            </button>
            <Link href="https://wa.me/263774043049"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full ml-4">
              Get Quote
            </Link>
          </div>

          <div className="hidden lg:flex items-center ml-8">
            <div className="relative">
              <button className="bg-gray-100 p-3 rounded-full hover:bg-green-100 relative">
                <FaPhoneAlt className="text-green-600 text-xl" />
                <span className="absolute top-1 right-2 text-green-500">
                  <FaCommentDots />
                </span>
              </button>
            </div>
            <div className="ml-3">
              <p className="text-sm">Call Our Experts</p>
              <Link href="tel:+1234567890" className="font-medium">+263 77 404 3049</Link>
            </div>
          </div>

          <button className="lg:hidden text-gray-600">
            <FaBars className="text-2xl" />
          </button>
        </div>
      </nav>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-4xl mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">Search Feed Products</h3>
              <button
                onClick={() => setShowSearch(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for feeds, ingredients, livestock types..."
                  className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-full">
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Carousel */}
      <div className="relative bg-green-700 text-white overflow-hidden">
        <div className="container mx-auto px-20 py-20">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h4 className="text-green-300 font-bold mb-4">PREMIUM LIVESTOCK NUTRITION</h4>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Optimized Feed Solutions for <span className="text-yellow-300">Maximum Growth</span></h1>
              <p className="text-xl mb-8">Scientifically formulated feeds to enhance productivity and animal health</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/products" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-lg text-center">
                  Browse Products
                </Link>
                <Link href="https://wa.me/263774043049"
                  target="_blank"
                  rel="noopener noreferrer" className="border-2 border-white hover:bg-white hover:text-green-900 font-bold py-3 px-8 rounded-lg text-center">
                  Contact Sales
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <Image
                width={500}
                height={500}
                src="/images/hero.png"
                alt="Healthy livestock with FeedSport feeds"
                className="max-w-md w-full"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-white transform -skew-y-2 -mb-10 z-10"></div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-20 py-16 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <FaSeedling />,
              title: "Premium Ingredients",
              description: "100% natural, high-quality feed components"
            },
            {
              icon: <FaTruck />,
              title: "Fast Delivery",
              description: "Next-day farm delivery available"
            },
            {
              icon: <FaTrophy />,
              title: "Quality Certified",
              description: "ISO 9001 certified production"
            },
            {
              icon: <FaHeadset />,
              title: "Expert Support",
              description: "24/7 nutritionist consultation"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-green-600 text-4xl mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-800 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-20">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-1/2">
              <div className="bg-white p-8 rounded-xl shadow-md h-full">
                <h4 className="text-green-600 font-bold mb-3">ABOUT FEEDSPORT</h4>
                <h2 className="text-3xl font-bold mb-6">Leading Livestock Nutrition</h2>
                <p className="mb-4">
                  FeedSport has been at the forefront of animal nutrition innovation, developing feed solutions that maximize growth, health, and productivity for farmers nationwide.
                </p>
                <p className="mb-6">
                  Our team of agricultural scientists and nutritionists work tirelessly to formulate feeds that meet the specific needs of different livestock at every growth stage.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <FaCheck className="text-green-600 mr-3" />
                    <span>ISO 9001 certified production facilities</span>
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-green-600 mr-3" />
                    <span>Custom feed formulations available</span>
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="text-green-600 mr-3" />
                    <span>Nationwide distribution network</span>
                  </li>
                </ul>
                <Link href="/about" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white p-8 rounded-xl shadow-md h-full">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-100 rounded-xl overflow-hidden">
                    <Image
                      width={500}
                      height={500}
                      src="/images/eggs.jpg"
                      alt="Poultry farm"
                      className="w-full h-48 object-cover" />
                  </div>
                  <div className="bg-gray-100 rounded-xl overflow-hidden">
                    <Image
                      width={500}
                      height={500}
                      src="/images/farm-2.png"
                      alt="Cattle farm"
                      className="w-full h-48 object-cover" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "4.8/5", label: "Ratings" },
                    { value: "25+", label: "Feed Formulas" },
                    { value: "3+", label: "Distribution Centers" },
                    { value: "10", label: "Years Experience" }
                  ].map((stat, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-xl">
                      <p className="text-3xl font-bold text-green-700">{stat.value}</p>
                      <p className="text-gray-600">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h4 className="text-green-600 font-bold mb-3">OUR PRODUCTS</h4>
            <h2 className="text-3xl font-bold mb-4">High-quality Feed Ingredients for your Livestock</h2>
            <p className="text-gray-600">
              Scientifically tested ingredients to optimize growth, health, and productivity for all types of livestock at every stage of development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                image: "/images/soybean.png",
                title: "Soya bean meal",
                description: "High protein, dehulled soybean meal",
                items: ["Starter Mash", "Grower Pellets", "Layer Crumble"]
              },
              {
                image: "/images/sunflower.png",
                title: "Sunflower meal",
                description: "Sunflower meal",
                items: ["Dairy Meal", "Beef Finisher", "Calf Starter"]
              },
              {
                image: "/images/bone.png",
                title: "Bone meal",
                description: "High protein, cleaned bone meal",
                items: ["Starter Feed", "Grower Feed", "Fattener Feed"]
              },
              {
                image: "/images/bran.png",
                title: "Wheat bran",
                description: "High ME Energy Wheat Bran",
                items: ["Organic Feeds", "Medicated Feeds", "Show Animal Feeds"]
              }
            ].map((product, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                  <Image
                    width={500}
                    height={500}
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-green-800">{product.title}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <ul className="mb-6 space-y-2">
                    {product.items.map((item, i) => (
                      <li key={i} className="flex items-center">
                        <FaCheck className="text-green-600 mr-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/products/${product.title.toLowerCase().replace(' ', '-')}`} className="block text-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg">
                    View Products
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h4 className="text-green-600 font-bold mb-3">FARMER TESTIMONIALS</h4>
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600">
              Hear from farmers who have transformed their operations with FeedSport nutrition solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                image: "/images/farmer-1.png",
                name: "James Mhashu",
                farm: "JJ Poultry Farm",
                rating: 5,
                quote: "Since switching to FeedSport, my egg production has increased by 20% and my birds are healthier than ever before."
              },
              {
                image: "/images/farmer-2.png",
                name: "Pamela Choto",
                farm: "Choto Dairy Farm",
                rating: 5,
                quote: "The dairy meal has increased my milk production by 3 liters per cow daily. The quality is consistent and my cows love it."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex items-center mb-6">
                  <Image
                    width={500}
                    height={500}
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4" />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.farm}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-gray-700 italic mb-6">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-green-700 text-white text-center">
        <div className="container mx-auto px-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Optimize Your Livestock Nutrition?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our team of nutrition experts is ready to help you select the perfect feed for your animals&apos; needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="https://wa.me/263774043049"
              target="_blank"
              rel="noopener noreferrer" className="flex bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold py-3 px-8 rounded-lg">
              Contact Our Experts
            </Link>
            <Link href="tel:+263774043049" className="border-2 border-white hover:bg-white hover:text-green-900 font-bold py-3 px-8 rounded-lg flex">
              <FaPhoneAlt className="mr-2" /> Call Now
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex">
                <FaWheatAwn className="text-green-500 mr-2" /> FeedSport
              </h3>
              <p className="mb-4">
                Providing premium livestock nutrition solutions. Committed to quality, innovation, and farmer success.
              </p>
              <div className="flex space-x-4">
                <Link href="https://www.facebook.com/share/16PXsk9S5S/" className="text-gray-400 hover:text-white">
                  <FaFacebookF />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <FaTwitter />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <FaInstagram />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <FaLinkedinIn />
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/products" className="text-gray-400 hover:text-white">Products</Link></li>
                <li><Link href="/resources" className="text-gray-400 hover:text-white">Resources</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Products</h4>
              <ul className="space-y-2">
                <li><Link href="/products/poultry" className="text-gray-400 hover:text-white">Poultry Feeds</Link></li>
                <li><Link href="/products/cattle" className="text-gray-400 hover:text-white">Cattle Feeds</Link></li>
                <li><Link href="/products/swine" className="text-gray-400 hover:text-white">Swine Feeds</Link></li>
                <li><Link href="/products/specialty" className="text-gray-400 hover:text-white">Specialty Feeds</Link></li>
                <li><Link href="/products/ingredients" className="text-gray-400 hover:text-white">Feed Ingredients</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FaMapMarkerAlt className="text-green-500 mt-1 mr-3" />
                  <span>2 William Pollet, Borrowdale, Harare, Zimbabwe</span>
                </li>
                <li className="flex items-center">
                  <FaPhoneAlt className="text-green-500 mr-3" />
                  <span>+263 77 404 3049</span>
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="text-green-500 mr-3" />
                  <span>sales@feedsport.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} FeedSport. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
                <Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}