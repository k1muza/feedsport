'use client';
import { Badge, Beef, Bird, Droplets, Egg, Leaf, Mail, MapPin, Phone, ShieldCheck, Sun, TestTube2, Truck, Wheat } from 'lucide-react';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  features: string[];
  packaging: string;
  target: string;
  priceUSD: string;
  moq: string;
  image: string;
  icon?: React.ReactNode;
}

const getProductImage = (imagePath: string, productName: string) => {
  if (imagePath && imagePath.startsWith('/images/catalog/')) {
    return imagePath;
  }
  return `https://placehold.co/400x300/F3F3F3/333333?text=${encodeURIComponent(productName)}`;
};

const products: Product[] = [
  {
    id: 1,
    name: "Cattle Pen Fattening Premix",
    description: "Accelerated weight gain formula for beef cattle",
    features: [
      "High-energy blend with vitamins (A, D, E)",
      "Minerals (Zn, Cu, Se) & rumen buffers",
      "Promotes muscle development"
    ],
    packaging: "25kg poly bags",
    target: "Finish cattle 30% faster",
    priceUSD: '$35.00',
    moq: "1 bag",
    image: '/images/catalog/cattle.png', // Ensure this path is correct
    icon: <Beef size={48} className="text-green-700" />,
  },
  {
    id: 2,
    name: "Broiler Premix",
    description: "All-in-one growth booster for poultry",
    features: [
      "Optimized amino acids (Lysine, Methionine)",
      "Probiotics and enzymes blend",
      "Enhances FCR and immunity"
    ],
    packaging: "20kg poly bags",
    target: "Uniform flock growth in 5 weeks",
    priceUSD: "$35.00",
    moq: "1 bag",
    image: '/images/catalog/broiler.png', // Ensure this path is correct
    icon: <Bird size={48} className="text-orange-500" />,
  },
  {
    id: 3,
    name: "Goat Pen Fattening Premix",
    description: "Precision nutrition for meat goats",
    features: [
      "Balanced Ca:P ratio & B-vitamins",
      "Ammonium chloride formula",
      "Reduces urinary calculi"
    ],
    packaging: "10kg/25kg poly bags",
    target: "20% higher daily weight gain",
    priceUSD: '$30.00',
    moq: "1 bag",
    image: '/images/catalog/goat.png', // Ensure this path is correct
    icon: <Badge size={48} className="text-lime-600" />,
  },
  {
    id: 4,
    name: "Layer Premix",
    description: "Egg production maximizer for hens",
    features: [
      "Calcium-rich (4.2%) formula",
      "Omega-3 & antioxidant blend",
      "Strengthens eggshells"
    ],
    packaging: "25kg poly bags",
    target: "95%+ laying rate",
    priceUSD: '$35.00',
    moq: "1 bag",
    image: '/images/catalog/layers.png', // Ensure this path is correct
    icon: <Egg size={48} className="text-yellow-500" />,
  },
  {
    id: 5,
    name: "Soybean Meal",
    description: "High-protein plant-based supplement",
    features: [
      "47-48% crude protein",
      "Solvent-extracted & non-GMO",
      "Low anti-nutritional factors"
    ],
    packaging: "50kg poly-lined bulk bags",
    target: "Base for ruminant/poultry rations",
    priceUSD: '$30.00',
    moq: "1 bag",
    image: '/images/catalog/soybean.png', // Ensure this path is correct
    icon: <Leaf size={48} className="text-green-700" />,
  },
  {
    id: 6,
    name: "Sunflower Meal",
    description: "Fiber-rich protein alternative",
    features: [
      "34% protein with high methionine",
      "Cost-effective digestibility",
      "Low carbon footprint"
    ],
    packaging: "50kg poly bags",
    target: "Dairy cows & poultry diets",
    priceUSD: '$26.00',
    moq: "1 bag",
    image: '/images/catalog/sunflower.png', // Ensure this path is correct
    icon: <Sun size={48} className="text-yellow-400" />,
  },
  {
    id: 7,
    name: "Blood Meal",
    description: "Ultra-concentrated animal protein",
    features: [
      "80% crude protein",
      "Flash-dried for purity",
      "Rich in iron and lysine"
    ],
    packaging: "25kg poly bags",
    target: "Aquaculture & swine starter feeds",
    priceUSD: '$40.00',
    moq: "1 bag",
    image: '/images/catalog/blood.png', // Ensure this path is correct
    icon: <Droplets size={48} className="text-red-500" />,
  },
  {
    id: 8,
    name: 'Wheat Bran',
    description: 'Fiber-rich wheat bran, aiding digestion and providing essential nutrients.',
    features: ['High in Fiber', 'Aids Digestion', 'Source of B-Vitamins', 'Cost-effective filler'],
    packaging: '40kg woven bags',
    target: 'Improves gut health in livestock',
    priceUSD: '$30.00',
    moq: '1 bag',
    image: '/images/catalog/wheat.png', // Ensure this path is correct
    icon: <Wheat size={48} className="text-amber-600" />,
  },
];

interface ProductImageProps {
  src: string;
  alt: string;
  productName: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ src, alt, productName }) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Prevents infinite loop if placeholder also fails
    target.src = `https://placehold.co/400x300/F3F3F3/333333?text=${encodeURIComponent(productName)}+Not+Found`;
  };

  return (
    <div className="bg-gray-50 border-r print:border-r-0 border-gray-200 flex items-center justify-center p-1 w-2/5">
      <Image
        src={src}
        alt={alt}
        width={400}
        height={300}
        className="w-full h-full object-cover"
        onError={handleError}
      />
    </div>
  );
};

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => (
  <div className="flex-grow flex flex-col w-3/5 sm:w-2/3">
    {/* Product Header */}
    <div className="flex px-3 pt-3 justify-between items-start mb-1">
      <div className="flex-1">
        <ProductTitle className="text-lg font-semibold text-gray-900">{product.name}</ProductTitle>
        <p className="text-gray-600 mt-0.5 text-xs  print:text-opacity-90">
          {product.description}
        </p>
      </div>
      <span className="bg-green-100 text-green-800 text-[0.55rem] font-medium ml-1 px-1.5 py-0.5 whitespace-nowrap print:border-green-700 print:text-green-700">
        {product.packaging}
      </span>
    </div>

    {/* Key Features */}
    <div className="mt-2 px-3">
      <h4 className="font-semibold text-gray-800 flex items-center text-[0.65rem] mb-1 ">
        KEY FEATURES
      </h4>
      <ul className="space-y-0.5">
        {product.features.map((feature, idx) => (
          <li key={idx} className="flex items-start text-[0.65rem]">
            <span className="text-green-600 mr-1 mt-0.5 flex-shrink-0" aria-hidden="true">•</span>
            <span className="text-gray-700  print:text-opacity-90">{feature}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Product Meta (Target, Min Order, Price) */}
    <div className="mt-auto pt-2 px-3 pb-3 border-t print:border-t-[0.5pt] border-gray-200 ">
      <div className="grid grid-cols-2 gap-2 mb-2">
        <div>
          <p className="text-[0.6rem] font-medium text-gray-500 uppercase print:text-gray-600">Target</p>
          <p className="font-semibold text-gray-800 text-[0.65rem] ">{product.target}</p>
        </div>
        <div>
          <p className="text-[0.6rem] font-medium text-gray-500 uppercase print:text-gray-600">Min Order</p>
          <p className="font-semibold text-gray-800 text-[0.65rem] ">{product.moq}</p>
        </div>
      </div>

      <div>
        <p className="text-[0.6rem] font-medium text-gray-500 uppercase print:text-gray-600">Price (USD)</p>
        <Price>{product.priceUSD}</Price>
      </div>
    </div>
  </div>
);

// --- Main ProductCard Component ---

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <article className="bg-white border print:border-[0.5pt] border-gray-200 overflow-hidden print:break-inside-auto transition-all duration-200 flex flex-row">
    <ProductImage
      src={getProductImage(product.image, product.name)}
      alt={product.name}
      productName={product.name}
    />
    <ProductDetails product={product} />
  </article>
);

const Price = ({ children }: { children: React.ReactNode }) => <span className={`font-bold text-base text-green-700 sans-serif`}>{children}</span>;

const ProductTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => <h2 className={`sans-serif text-md font-semibold text-gray-800 leading-tight ${className}`}>{children}</h2>;

const CataloguePage: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const contactItems = [
    { label: "Phone", value: "+263 71 578 8572", Icon: Phone, href: "tel:+263715788572" },
    { label: "Email", value: "sales@feedsport.co.zw", Icon: Mail, href: "mailto:sales@feedsport.co.zw" },
    { label: "Headquarters", value: "No 2 Off William Pollett Drive, Borrowdale, Harare", Icon: MapPin, href: "https://maps.google.com/?q=No+2+Off+William+Pollett+Drive,+Borrowdale,+Harare" }
  ];

  const qualityAssuranceItems = [
    { title: "Certified Quality", desc: "ISO 9001 Certified manufacturing", IconComponent: ShieldCheck },
    { title: "Lab Tested", desc: "Rigorous quality control testing", IconComponent: TestTube2 },
    { title: "Nationwide Delivery", desc: "Fast delivery across the region", IconComponent: Truck }
  ];

  return (
    <>
      <Head>
        <title>FeedSport - Product Catalogue {currentYear}</title>
        <meta name="description" content={`Browse high-quality animal feed premixes and ingredients from FeedSport. Catalogue for ${currentYear}.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link href="https://fonts.googleapis.com/css2?family=Segoe+UI:wght@400;600;700&display=swap" rel="stylesheet" />
        <style jsx global>{`
          @media print {
            body {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            .no-print { display: none !important; }
            .print-bg-green-700 { background-color: #0067C0 !important; }
            .print-text-white { color: white !important; }
            .print-bg-gray-800 { background-color: #1f2937 !important; }
            .print-text-gray-300 { color: #d1d5db !important; }
            .product-card-container {
              break-inside: avoid-page;
              page-break-inside: avoid;
            }
            header, footer {
              break-before: auto;
              break-after: auto;
            }
          }
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #F5F5F5;
          }
          @media print {
            /* switch to half-point (0.5pt ≈ 0.18 mm) borders */
            .border {
              border-width: 0.5pt !important;
            }
          }
        `}</style>
      </Head>

      <div className={`min-h-screen bg-gray-100 font-segoe print:bg-white sans-serif`}>
        {/* Header Section */}
        <header className="bg-green-700 text-white p-3 print-bg-green-700 print-text-white">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
            <Image
              width={36}
              height={36}
              src="/favicon.ico"
              alt="FeedSport Logo"
              className="w-9 h-9 mr-2 print:w-8 print:h-8"
            />
            <div className='text-center sm:text-left flex items-center'>
              <div>
                <h1 className="text-xl font-semibold print:text-lg">
                  <span className="text-white">Feed</span>Sport
                </h1>
                <p className="text-green-100 text-xs print:text-[0.6rem]">
                  Premium Animal Feed Product Catalogue {currentYear}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Catalogue Title Section */}
        <section className="print:p-3 bg-white print:bg-white">
          <div className="container mx-auto px-3 text-center">
            <ProductTitle className="font-bold">
              Premium Animal Nutrition Products
            </ProductTitle>
            <p className="text-xs text-gray-600 max-w-3xl mx-auto print:text-[0.65rem]">
              Scientifically formulated feeds for optimal growth and productivity
            </p>
            <div className="w-16 h-0.5 bg-green-600 mx-auto mt-1 print:bg-green-700"></div>
          </div>
        </section>

        {/* Products Grid Section */}
        <main className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 print:gap-6">
            {products.map((product) => (
              <div key={product.id} className="product-card-container">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </main>

        {/* Quality Assurance Section */}
        <section className="mt-4 print:mt-3 bg-white print:bg-white border print:border-0 border-gray-200  p-3 mx-auto max-w-7xl print:max-w-full print:px-1 print:py-2 print:break-before-page">
          <h2 className="text-sm font-semibold mb-2 text-center text-gray-800 print:text-sm ">
            Our Commitment to Quality
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 print:gap-1 text-center">
            {qualityAssuranceItems.map(item => (
              <div key={item.title} className="border print:border-[0.5pt] border-gray-200 bg-white p-2  print:p-1">
                <div className="flex justify-center mb-1">
                  <item.IconComponent className="h-5 w-5 text-green-600 print:text-green-700" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm print:text-xs ">{item.title}</h3>
                <p className="text-gray-600 text-[0.65rem] print:text-[0.6rem]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact and Footer Section */}
        <footer className="bg-gray-800 text-gray-300 p-8 mt-4 print:mt-3 print-bg-gray-800 print-text-gray-300">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 print:gap-2">
              <div>
                <h3 className="text-xs font-semibold text-white mb-1 print:text-xs">Contact Information</h3>
                <p className="text-[0.65rem] text-green-100 mb-1 print:text-[0.6rem]">
                  Reach out to us for orders and inquiries:
                </p>
                <div className="space-y-1">
                  {contactItems.map(contact => (
                    <a
                      key={contact.label}
                      href={contact.href}
                      target={contact.label === "Headquarters" || contact.label === "Email" ? "_blank" : undefined}
                      rel={contact.label === "Headquarters" || contact.label === "Email" ? "noopener noreferrer" : undefined}
                      className="flex items-start group transition-colors"
                    >
                      <contact.Icon className="h-3.5 w-3.5 text-green-400 mr-1.5 mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <div>
                        <p className="text-[0.65rem] font-medium text-green-200 print:text-green-100 print:text-[0.6rem]">
                          {contact.label}
                        </p>
                        <p className="text-[0.65rem] text-gray-300 print:text-[0.6rem] print:text-gray-200">
                          {contact.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white mb-1 print:text-xs">Pricing & Order Notes</h3>
                <ul className="space-y-0.5 text-[0.65rem] print:text-[0.6rem] text-gray-300 print:text-gray-200">
                  {[
                    "Prices in USD, exclusive of VAT",
                    "Bulk discounts available",
                    "Delivery charges apply",
                    "Custom formulations available",
                    `Valid until December 31, ${currentYear}`
                  ].map((note, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-400 font-bold mr-1">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t print:border-t-[0.5pt] border-gray-700 print:border-gray-600 text-center text-gray-400 text-[0.6rem] print:text-gray-500 print:pt-1 print:mt-2">
              <p className="mb-0.5 print:mb-0">&copy; {currentYear} FeedSport Inc. | Reg. No. 42586A0252025</p>
              <p className="text-[0.6rem] text-gray-500 no-print">
                Specifications may change. Contact sales for current information.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CataloguePage;
