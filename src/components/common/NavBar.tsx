'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaCommentDots, FaPhoneAlt, FaSearch, FaTimes } from 'react-icons/fa';
import { FaWheatAwn } from 'react-icons/fa6';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/blog', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
];

export default function NavBar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const renderLink = (href: string, label: string) => {
    const isActive = pathname.startsWith(`${href}/`) || '/' === href && pathname === '/';
    return (
      <Link
        key={href}
        href={href}
        className={`
          font-medium 
          hover:text-green-600 
          ${isActive
            ? 'text-green-700 border-b-2 border-green-700'
            : 'text-gray-600'
          }
        `}
        aria-current={isActive ? 'page' : undefined}
      >
        {label}
      </Link>
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submission
    console.log('Searching for:', searchQuery);
    // You can replace this with actual search functionality
    // For example: router.push(`/search?q=${searchQuery}`);
  };

  return (
    <nav className="bg-white shadow-md">
      {/* Main Navigation */}
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <Link href="/" className="text-2xl font-bold text-green-700 flex items-center">
          <FaWheatAwn className="text-green-600 mr-2" /> FeedSport
        </Link>

        <div className="hidden lg:flex items-center space-x-8">
          {links.map(link => renderLink(link.href, link.label))}
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="bg-green-100 p-2 rounded-full hover:bg-green-200 transition-colors"
            aria-label="Search"
          >
            {isSearchOpen ? <FaTimes className="text-green-700" /> : <FaSearch className="text-green-700" />}
          </button>
          <Link
            href="https://wa.me/263774043049"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full ml-4 transition-colors"
          >
            Get Quote
          </Link>
        </div>

        <div className="hidden lg:flex items-center ml-8">
          <div className="relative">
            <button className="bg-gray-100 p-3 rounded-full hover:bg-green-100 relative transition-colors">
              <FaPhoneAlt className="text-green-600 text-xl" />
              <span className="absolute top-1 right-2 text-green-500">
                <FaCommentDots />
              </span>
            </button>
          </div>
          <div className="ml-3">
            <p className="text-sm">Call Our Experts</p>
            <Link href="tel:+263774043049" className="font-medium hover:text-green-600">
              +263 77 404 3049
            </Link>
          </div>
        </div>

        <button className="lg:hidden text-gray-600">
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Search Panel */}
      <div 
        ref={searchRef}
        className={`bg-green-50 transition-all duration-300 ease-in-out overflow-hidden ${isSearchOpen ? 'max-h-20 py-4' : 'max-h-0 py-0'}`}
      >
        <div className="container mx-auto px-4">
          <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, resources..."
              className="w-full pl-4 pr-12 py-3 border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button 
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-700"
            >
              <FaSearch className="text-xl" />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
