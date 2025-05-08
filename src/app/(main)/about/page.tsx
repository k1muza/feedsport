'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-gray-600">
            FeedSport is committed to providing innovative livestock nutrition solutions. Our team of experts is dedicated to enhancing growth, health, and productivity for farmers nationwide.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-1/2">
            <div className="bg-white p-8 rounded-xl shadow-md h-full">
              <h4 className="text-green-600 font-bold mb-3">OUR MISSION</h4>
              <h2 className="text-3xl font-bold mb-6">Leading Livestock Nutrition</h2>
              <p className="mb-4">
                Our mission is to deliver premium feed solutions that optimize animal health and performance.
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
              <Link href="/contact" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full">
                Contact Us
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
                    alt="Product image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-gray-100 rounded-xl overflow-hidden">
                  <Image
                    width={500}
                    height={500}
                    src="/images/cow-feed.jpg"
                    alt="Product image"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h4 className="text-green-600 font-bold mb-3">OUR VALUES</h4>
              <p>
                We strive for excellence in everything we do, ensuring quality and innovation in our products and services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

