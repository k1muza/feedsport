'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaCommentDots, FaPhoneAlt, FaSearch } from 'react-icons/fa';
import { FaWheatAwn } from 'react-icons/fa6';

export default function NavBar() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
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
  );
}