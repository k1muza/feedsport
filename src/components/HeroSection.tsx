'use client';

import Link from 'next/link';
import { FaArrowRight, FaWhatsapp } from 'react-icons/fa';
import HeroCarousel from './HeroCarousel';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <span className="inline-block bg-green-600 bg-opacity-20 text-green-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              PREMIUM FEED INGREDIENTS
            </span>
            
            <h1 className="text-4xl font-bold leading-tight mb-6">
              Optimized <span className="text-yellow-300">Nutrition</span> for 
              <span className="block">Maximum Livestock Performance</span>
            </h1>
            
            <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto lg:mx-0 mb-8">
              Scientifically-proven feed additives and ingredients to enhance growth, health, and profitability
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link 
                href="/products" 
                className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Browse Ingredients
                <FaArrowRight className="ml-2" />
              </Link>
              
              <Link 
                href="https://wa.me/263774043049"
                target="_blank"
                rel="noopener noreferrer" 
                className="flex items-center justify-center bg-transparent border-2 border-white hover:bg-white hover:text-green-900 font-bold py-3 px-6 rounded-lg transition-all duration-300"
              >
                <FaWhatsapp className="mr-2 text-lg" />
                Chat on WhatsApp
              </Link>
            </div>

          </div>

          {/* Image */}
          <div className="lg:w-1/2 relative">
            <HeroCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}