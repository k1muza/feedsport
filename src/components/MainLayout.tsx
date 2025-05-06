'use client';

import Head from 'next/head';
import { useState } from 'react';
import TopBar from './TopBar';
import NavBar from './NavBar';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import AboutSection from './AboutSection';
import ProductsSection from './ProductsSection';
import TestimonialsSection from './TestimonialsSection';
import CTASection from './CTASection';
import Footer from './Footer';
import SearchModal from './SearchModal';

export default function MainLayout() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <Head>
        <title>FeedSport | Premium Livestock Feed Ingredients</title>
        <meta name="description" content="High-quality animal feeds and nutrition solutions for poultry, cattle, and swine" />
      </Head>

      {/* Spinner - could be moved to its own component if needed */}
      <div id="spinner" className="hidden fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>

      <TopBar />
      <NavBar />
      <SearchModal showSearch={showSearch} setShowSearch={setShowSearch} />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <ProductsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </>
  );
}