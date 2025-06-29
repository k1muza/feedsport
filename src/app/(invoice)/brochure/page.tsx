'use client';
import { Badge, Beef, Bird, Droplets, Egg, Leaf, Mail, MapPin, Phone, ShieldCheck, Sun, TestTube2, Truck, Wheat } from 'lucide-react';
import Head from 'next/head';
import Image from 'next/image';
import type { FC, ReactNode, SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  features: string[];
  specifications: { label: string; value: string }[];
  sampleRatio: string; // NEW: Added sample ratio
  packaging: string;
  target: string;
  priceUSD: string;
  moq: string;
  image: string;
  icon?: ReactNode;
}

const getProductImage = (imagePath: string, productName: string) => {
  if (imagePath && imagePath.startsWith('/images/catalog/')) {
    return imagePath;
  }
  return `https://placehold.co/100x100/F3F3F3/333333?text=${encodeURIComponent(productName.substring(0, 15))}`;
};

const PRODUCTS_DATA: Product[] = [
  {
    id: 1,
    name: "Cattle Pen Fattening Premix",
    description: "Accelerated weight gain formula for beef cattle",
    features: [
      "High-energy blend with vitamins (A, D, E)",
      "Minerals (Zn, Cu, Se) & rumen buffers",
      "Promotes muscle development"
    ],
    specifications: [
      { label: "Protein", value: "18%" },
      { label: "Fat", value: "5.2%" },
      { label: "Fiber", value: "8%" },
      { label: "Calcium", value: "1.2%" },
      { label: "Phosphorus", value: "0.8%" }
    ],
    sampleRatio: "1:10 (Premix:Feed)", // NEW
    packaging: "25kg woven bags",
    target: "Finish cattle 30% faster",
    priceUSD: '$35.00',
    moq: "1 bag",
    image: '/images/catalog/cattle.png',
    icon: <Beef size={24} className="text-green-700" />,
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
    specifications: [
      { label: "Protein", value: "22%" },
      { label: "Fat", value: "6.5%" },
      { label: "Fiber", value: "5%" },
      { label: "Calcium", value: "1.0%" },
      { label: "Phosphorus", value: "0.7%" }
    ],
    sampleRatio: "1:8 (Premix:Feed)", // NEW
    packaging: "20kg woven polypropylene bags",
    target: "Uniform flock growth in 5 weeks",
    priceUSD: "$35.00",
    moq: "1 bag",
    image: '/images/catalog/broiler.png',
    icon: <Bird size={24} className="text-orange-500" />,
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
    specifications: [
      { label: "Protein", value: "16%" },
      { label: "Fat", value: "4.5%" },
      { label: "Fiber", value: "12%" },
      { label: "Calcium", value: "0.9%" },
      { label: "Phosphorus", value: "0.6%" }
    ],
    sampleRatio: "1:12 (Premix:Feed)", // NEW
    packaging: "10kg/25kg woven polypropylene bags",
    target: "20% higher daily weight gain",
    priceUSD: '$30.00',
    moq: "1 bag",
    image: '/images/catalog/goat.png',
    icon: <Badge size={24} className="text-lime-600" />,
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
    specifications: [
      { label: "Protein", value: "17%" },
      { label: "Fat", value: "3.8%" },
      { label: "Fiber", value: "6%" },
      { label: "Calcium", value: "4.2%" },
      { label: "Phosphorus", value: "0.5%" }
    ],
    sampleRatio: "1:9 (Premix:Feed)", // NEW
    packaging: "25kg woven polypropylene bags",
    target: "95%+ laying rate",
    priceUSD: '$35.00',
    moq: "1 bag",
    image: '/images/catalog/layers.png',
    icon: <Egg size={24} className="text-yellow-500" />,
  },
  {
    id: 5,
    name: "Soybean Meal",
    description: "High-protein plant-based supplement",
    features: [
      "48% crude protein",
      "Solvent-extracted & non-GMO",
      "Low anti-nutritional factors"
    ],
    specifications: [
      { label: "Protein", value: "48%" },
      { label: "Fat", value: "1.5%" },
      { label: "Fiber", value: "3.2%" },
      { label: "Calcium", value: "0.3%" },
      { label: "Phosphorus", value: "0.7%" }
    ],
    sampleRatio: "10-20% of total ration", // NEW
    packaging: "50kg poly-lined bulk bags",
    target: "Base for ruminant/poultry rations",
    priceUSD: '$30.00',
    moq: "1 bag",
    image: '/images/catalog/soybean.png',
    icon: <Leaf size={24} className="text-green-700" />,
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
    specifications: [
      { label: "Protein", value: "34%" },
      { label: "Fat", value: "1.8%" },
      { label: "Fiber", value: "25%" },
      { label: "Calcium", value: "0.4%" },
      { label: "Phosphorus", value: "1.0%" }
    ],
    sampleRatio: "15-25% of total ration", // NEW
    packaging: "50kg woven polypropylene bags",
    target: "Dairy cows & poultry diets",
    priceUSD: '$26.00',
    moq: "1 bag",
    image: '/images/catalog/sunflower.png',
    icon: <Sun size={24} className="text-yellow-400" />,
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
    specifications: [
      { label: "Protein", value: "80%" },
      { label: "Fat", value: "1.2%" },
      { label: "Fiber", value: "1.5%" },
      { label: "Calcium", value: "0.3%" },
      { label: "Phosphorus", value: "0.2%" }
    ],
    sampleRatio: "2-5% of total ration", // NEW
    packaging: "25kg woven polypropylene bags",
    target: "Aquaculture & swine starter feeds",
    priceUSD: '$40.00',
    moq: "1 bag",
    image: '/images/catalog/blood.png',
    icon: <Droplets size={24} className="text-red-500" />,
  },
  {
    id: 8,
    name: 'Wheat Bran',
    description: 'Fiber-rich wheat bran, aiding digestion and providing essential nutrients.',
    features: ['High in Fiber', 'Aids Digestion', 'Source of B-Vitamins', 'Cost-effective filler'],
    specifications: [
      { label: "Protein", value: "15%" },
      { label: "Fat", value: "4%" },
      { label: "Fiber", value: "12%" },
      { label: "Calcium", value: "0.1%" },
      { label: "Phosphorus", value: "1.2%" }
    ],
    sampleRatio: "10-15% of total ration", // NEW
    packaging: '40kg woven bags',
    target: 'Improves gut health in livestock',
    priceUSD: '$30.00',
    moq: '1 bag',
    image: '/images/catalog/wheat.png',
    icon: <Wheat size={24} className="text-amber-600" />,
  },
];

interface ProductImageProps {
  src: string;
  alt: string;
  productName: string;
}

const ProductImage: FC<ProductImageProps> = ({ src, alt, productName }) => {
  const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = `https://placehold.co/100x100/F3F3F3/333333?text=${encodeURIComponent(productName.substring(0, 15))}`;
  };

  return (
    <div className="bg-gray-50 border border-gray-200 flex items-center justify-center w-20 h-20">
      <Image
        src={src}
        alt={alt}
        width={100}
        height={100}
        className="w-full h-full object-contain"
        onError={handleError}
      />
    </div>
  );
};

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: FC<ProductDetailsProps> = ({ product }) => (
  <div className="flex-grow flex flex-col">
    {/* Product Header */}
    <div className="flex px-4 pt-4 justify-between items-start">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {product.icon}
          <ProductTitle className="text-lg font-semibold text-gray-900">{product.name}</ProductTitle>
        </div>
        <Price>{product.priceUSD}</Price>
        <p className="text-gray-600 mt-1 text-xs">
          {product.description}
        </p>
      </div>
      <ProductImage
        src={getProductImage(product.image, product.name)}
        alt={product.name}
        productName={product.name}
      />
    </div>

    {/* Technical Specifications */}
    <div className="mt-3 px-4">
      <h4 className="font-semibold text-gray-800 flex items-center text-xs mb-2 pb-1 border-b border-gray-200">
        TECHNICAL SPECIFICATIONS
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {product.specifications.map((spec, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-[0.65rem] font-medium text-gray-500">{spec.label}</span>
            <span className="font-semibold text-gray-900 text-sm">{spec.value}</span>
          </div>
        ))}
        {/* NEW: Sample Ratio */}
        <div className="flex flex-col col-span-2 sm:col-span-1">
          <span className="text-[0.65rem] font-medium text-gray-500">Mixing Ratio</span>
          <span className="font-semibold text-blue-700 text-sm">{product.sampleRatio}</span>
        </div>
      </div>
    </div>

    {/* Key Features */}
    <div className="mt-3 px-4">
      <h4 className="font-semibold text-gray-800 flex items-center text-xs mb-1 pb-1 border-b border-gray-200">
        KEY FEATURES
      </h4>
      <ul className="space-y-1">
        {product.features.map((feature, idx) => (
          <li key={idx} className="flex items-start text-xs">
            <span className="text-green-600 mr-1 mt-0.5 flex-shrink-0">•</span>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Product Meta */}
    <div className="mt-auto pt-3 px-4 pb-4 border-t border-gray-200">
      <div className="grid grid-cols-3 gap-3 mb-2">
        <div className="text-center">
          <p className="text-[0.6rem] font-medium text-gray-500 uppercase">Packaging</p>
          <p className="font-semibold text-gray-800 text-xs">{product.packaging}</p>
        </div>
        <div className="text-center">
          <p className="text-[0.6rem] font-medium text-gray-500 uppercase">Target</p>
          <p className="font-semibold text-gray-800 text-xs">{product.target}</p>
        </div>
        <div className="text-center">
          <p className="text-[0.6rem] font-medium text-gray-500 uppercase">MOQ</p>
          <p className="font-semibold text-gray-800 text-xs">{product.moq}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-1">
        <button className="bg-green-600 hover:bg-green-700 text-white text-xs py-1.5 px-4 rounded-sm transition-colors shadow-sm print:hidden">
          Order Now
        </button>
      </div>
    </div>
  </div>
);

const ProductCard: FC<{ product: Product }> = ({ product }) => (
  <article className="bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-shadow print:break-inside-avoid">
    <ProductDetails product={product} />
  </article>
);

const Price = ({ children }: { children: ReactNode }) => (
  <span className={`font-bold text-base text-green-700 sans-serif`}>{children}</span>
);

const ProductTitle = ({ children, className }: { children: ReactNode; className?: string }) => (
  <h2 className={`sans-serif text-lg font-semibold text-gray-800 leading-tight ${className}`}>{children}</h2>
);

const CataloguePage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setProducts(PRODUCTS_DATA);
  }, []);

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
        <title>FeedSport - Technical Product Catalogue {currentYear}</title>
        <meta name="description" content={`Technical specifications and mixing ratios for high-quality animal feed products from FeedSport. ${currentYear} catalogue.`} />
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
            .border {
              border-width: 0.5pt !important;
            }
          }
        `}</style>
      </Head>

      <div className={`min-h-screen bg-gray-100 font-segoe print:bg-white sans-serif`}>
        {/* Header Section */}
        <header className="bg-green-700 text-white p-4 print-bg-green-700 print-text-white">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center">
              <Image
                width={40}
                height={40}
                src="/favicon.ico"
                alt="FeedSport Logo"
                className="w-10 h-10 mr-3 print:w-8 print:h-8"
              />
              <div>
                <h1 className="text-xl font-semibold print:text-lg">
                  <span className="text-white">Feed</span>Sport
                </h1>
                <p className="text-green-100 text-xs print:text-[0.6rem]">
                  Technical Product Catalogue {currentYear}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Catalogue Title Section */}
        <section className="print:p-3 bg-white print:bg-white py-4">
          <div className="container mx-auto px-4 text-center">
            <ProductTitle className="font-bold text-xl">
              Agricultural Products with Mixing Ratios
            </ProductTitle>
            <p className="text-xs text-gray-600 max-w-3xl mx-auto mt-1 print:text-[0.65rem]">
              Scientifically formulated feeds with recommended mixing ratios
            </p>
            <div className="w-20 h-0.5 bg-green-600 mx-auto mt-2 print:bg-green-700"></div>
          </div>
        </section>

        {/* Products Grid Section */}
        <main className="container mx-auto p-4 print:p-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 print:gap-3">
            {products.map((product) => (
              <div key={product.id} className="product-card-container">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </main>

        {/* Mixing Ratio Guidance Section */}
        <section className="mt-6 print:mt-4 bg-white print:bg-white border border-gray-200 rounded-sm p-4 mx-auto max-w-3xl print:max-w-full print:px-3 print:py-3">
          <h2 className="text-base font-semibold mb-3 text-center text-gray-800 print:text-sm border-b pb-2">
            Mixing Ratio Guidance
          </h2>
          <div className="grid grid-cols-1 gap-2 text-xs text-gray-700">
            <p className="text-center mb-2"><strong>Understanding Premix Ratios:</strong></p>
            <ul className="space-y-1 pl-5">
              <li className="flex items-start">
                <span className="text-green-600 mr-1 mt-0.5">•</span>
                <span><strong>1:10 ratio</strong> = 1kg premix per 10kg feed</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-1 mt-0.5">•</span>
                <span>Gradually introduce new feeds over 5-7 days</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-1 mt-0.5">•</span>
                <span>Always provide clean drinking water</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-1 mt-0.5">•</span>
                <span>Consult nutritionist for customized formulations</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Quality Assurance Section */}
        <section className="mt-6 print:mt-4 bg-white print:bg-white border border-gray-200 rounded-sm p-4 mx-auto max-w-7xl print:max-w-full print:px-2 print:py-3 print:break-before-page">
          <h2 className="text-base font-semibold mb-3 text-center text-gray-800 print:text-sm border-b pb-2">
            Quality Assurance & Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:gap-2 text-center">
            {qualityAssuranceItems.map(item => (
              <div key={item.title} className="border border-gray-200 bg-gray-50 p-3 rounded-sm print:p-2">
                <div className="flex justify-center mb-2">
                  <item.IconComponent className="h-6 w-6 text-green-600 print:text-green-700" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm print:text-xs">{item.title}</h3>
                <p className="text-gray-600 text-xs print:text-[0.6rem] mt-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact and Footer Section */}
        <footer className="bg-gray-800 text-gray-300 p-6 mt-6 print:mt-4 print-bg-gray-800 print-text-gray-300">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 print:gap-3">
              <div>
                <h3 className="text-sm font-semibold text-white mb-2 print:text-xs">Contact Information</h3>
                <p className="text-xs text-green-100 mb-2 print:text-[0.6rem]">
                  Technical support and feeding ratio advice:
                </p>
                <div className="space-y-2">
                  {contactItems.map(contact => (
                    <a
                      key={contact.label}
                      href={contact.href}
                      target={contact.label === "Headquarters" || contact.label === "Email" ? "_blank" : undefined}
                      rel={contact.label === "Headquarters" || contact.label === "Email" ? "noopener noreferrer" : undefined}
                      className="flex items-start group transition-colors hover:text-white"
                    >
                      <contact.Icon className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <div>
                        <p className="text-xs font-medium text-green-200 print:text-green-100 print:text-[0.6rem]">
                          {contact.label}
                        </p>
                        <p className="text-xs text-gray-300 print:text-[0.6rem] print:text-gray-200">
                          {contact.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-2 print:text-xs">Product Notes</h3>
                <ul className="space-y-1 text-xs print:text-[0.6rem] text-gray-300 print:text-gray-200">
                  {[
                    "All prices in USD, exclusive of VAT",
                    "Volume discounts available for orders > 10 bags",
                    "Delivery charges calculated based on location",
                    "Custom formulations available upon request",
                    `Specifications valid until December 31, ${currentYear}`,
                    "Lab analysis reports available for all products",
                    "Mixing ratios are recommended starting points"
                  ].map((note, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-400 font-bold mr-1">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-700 print:border-t-[0.5pt] print:border-gray-600 text-center text-gray-400 text-xs print:text-[0.6rem] print:pt-2 print:mt-3">
              <p className="mb-1 print:mb-0">&copy; {currentYear} FeedSport Inc. | Reg. No. 42586A0252025</p>
              <p className="text-[0.6rem] text-gray-500 no-print">
                Technical specifications and mixing ratios subject to change. Contact our nutrition team for customized feeding programs.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CataloguePage;
