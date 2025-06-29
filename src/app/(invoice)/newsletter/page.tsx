'use client';

import { Check, X } from 'lucide-react';
import { Merriweather, Orbitron } from 'next/font/google';
import type { ReactElement, ReactNode } from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import Image from 'next/image';

const merri = Merriweather({
  weight: '400',
  subsets: ['latin'],
})

const major = Orbitron({
  weight: '400',
  subsets: ['latin'],
})

const PrintWatermark = ({ children }: { children: ReactNode }): ReactElement => (
  <div className='font-serif'>
    {children}
  </div>
);

const Heading = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): ReactElement => (
  <h1 className={`${merri.className} ${className}`}>{children}</h1>
)

const NumberedItem = ({ children, className }: { children: ReactNode; className?: string }): ReactElement => {
  const classNames = "w-12 h-12 flex flex-none items-center justify-center bg-gradient-to-br from-green-100 to-green-50 border-2 border-green-200 text-2xl font-bold text-green-800 rounded-full shadow-lg shadow-green-100/50 hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-green-300 print:bg-white print:border print:border-gray-300";

  return (
    <div className={`${major.className} ${classNames} ${className}`}>
      {children}
    </div>
  )
}


export default function EbookGuide() {
  return (
    <PrintWatermark>
      <div className="min-h-screen bg-white">
        <div className="max-w-2xl mx-auto px-4 pb-12 pt-4">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <Image
              src="/images/favicon.ico" // Replace with your actual logo path
              alt="FeedSport Logo"
              width={200}
              height={200}
              className="mx-auto mb-8 w-32 h-32 rounded-full border-2 border-gray-200" // Customize size/border as needed
            />
          </div>

          {/* Cover Section */}
          <div className="text-center mb-16 border-b pb-8">
            <Heading className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
              How to Mix Your Own Livestock Feed:<br />
              <span className="text-gray-600">A Practical Guide</span>
            </Heading>
            <p className="text-gray-600 mt-6">
              The rainy season has ended, and farmers are reaping the rewards of their hard work with bountiful harvests.
              For livestock farmers, this is the perfect opportunity to explore mixing your own feed—saving costs while
              potentially boosting your animals' health and productivity.
            </p>
            <p className="text-gray-600 mt-2">
              In this guide, we'll walk you through the process of creating a customized feed mix for your livestock.
              Whether you're a small-scale farmer or a large-scale operation, this guide will guide you through the
              essential steps to mix your own feed.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-12 text-gray-800 leading-relaxed">
            {/* Section 1 */}
            <section className="print:break-before-page">
              <div className="flex items-center gap-3 mb-6">
                <NumberedItem>1</NumberedItem>
                <Heading className="text-2xl font-semibold">Understand Your Animals’ Nutritional Needs</Heading>
              </div>
              <p className="mb-4">
                This is the first and crucial step. Before diving into mixing, it’s crucial to know what your animals require. Animal's do not have the same nutritional needs. The needs vary based on:
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-6">
                <li><span className="font-bold">Breed and Species:</span> A chicken's diet differs vastly from a cow’s.</li>
                <li><span className="font-bold">Age or Growth Stage:</span> Young animals (like chicks) need more protein for muscle development, while older ones may require energy-rich feeds.</li>
                <li><span className="font-bold">Purpose:</span> What is your target market? Are you fattening cattle, maintaining dairy cows, or raising layers for eggs? Each goal demands a unique nutritional approach.</li>
              </ul>
              <p className="mb-4">
                Thankfully, you don’t have to guess. Reputable breeders like Cobb, Ross, and Hyline publish detailed nutritional guidelines for their breeds. For example:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><a href="https://www.cobbgenetics.com/assets/Cobb-Files/2022-Cobb500-Broiler-Performance-Nutrition-Supplement.pdf" target="_blank" rel="noopener noreferrer" className="font-medium underline">Cobb 500</a> (broiler chickens)</li>
                <li><a href="https://www.hyline.com/filesimages/Hy-Line-Products/Hy-Line-Product-PDFs/Brown/BRN%20STD%20ENG.pdf" target="_blank" rel="noopener noreferrer" className="font-medium underline">Hyline layers</a> (egg-producing hens)</li>
                <li><a href="https://aviagen.com/assets/Tech_Center/Ross_Broiler/Ross-BroilerNutritionSpecifications2022-EN.pdf" target="_blank" rel="noopener noreferrer" className="font-medium underline">Ross 308</a> (another broiler breed)</li>
              </ul>
              <p className="italic mt-4">
                These resources are goldmines for crafting the right feed. After all, even <span className="font-bold">the world's top commercial feed manufacturers rely on these</span> very standards!
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <NumberedItem>2</NumberedItem>
                <Heading className="text-2xl font-semibold">Analyze the Nutritional Value of Your Ingredients</Heading>
              </div>
              <p className="mb-4">
                Now, take stock of the grains and crops at your disposal. What’s in your harvest? For instance:
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-6">
                <li><span className="font-bold">Maize:</span> Packed with carbohydrates but low in protein.</li>
                <li><span className="font-bold">Wheat:</span> Rich in carbohydrates and fiber.</li>
                <li><span className="font-bold">Sorghum:</span> A good source of carbohydrates and vitamins.</li>
                <li><span className="font-bold">Soya beans:</span> A powerhouse of protein.</li>
                <li><span className="font-bold">Sunflower meal:</span> Rich in fats and fiber.</li>
              </ul>
              <p className='mb-4'>
                Websites like <a href="https://www.feedipedia.org/" target='_blank' className="font-medium underline">Feedipedia</a> or <a href='https://feedtables.com/' target='_blank' className="font-medium underline">Feedtables</a> offer free, detailed nutritional data for countless ingredients. For a more structured reference, consider the <a href="https://nutrinews.com/en/the-5th-edition-of-the-brazilian-tables-for-poultry-and-swine/" target='_blank' className="font-medium underline">Brazilian Feed Tables for Poultry and Swine</a>.
              </p>
              <p className="mb-4">
                Bear in mind some of the ingredients may naturally contain some anti-digestive elements, and might need to be processed. For example:
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-6">
                <li><span className="font-medium">Cottonseed cake:</span> Requires heat treatment to reduce gossypol content</li>
                <li><span className="font-medium">Cassava:</span> Needs proper soaking or drying to remove cyanogenic compounds</li>
                <li><span className="font-medium">Raw soybeans:</span> Must be toasted to deactivate trypsin inhibitors</li>
              </ul>
              <blockquote className='italic'>Check with FeedSport to see if your ingredients require any special processing!</blockquote>
            </section>

            {/* Section 3 */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <NumberedItem>3</NumberedItem>
                <Heading className="text-2xl font-semibold">Tally Needs vs. Available Ingredients</Heading>
              </div>

              <p className="mb-4">
                The next step is to “tally up” exactly what you need versus what your on-farm ingredients will deliver. This ensures you don’t run short on critical nutrients.
              </p>
              {/* <div className="bg-gray-50 p-6 rounded-lg mb-4"> */}
              <h3 className="font-semibold mb-4">Practical Tally Process</h3>
              <ol className="list-decimal pl-6 space-y-1 mb-4">
                <li>List all required nutrients (from Section 1)</li>
                <li>Record nutritional values of your ingredients (from Section 2)</li>
                <li>For each required nutrient, identify ingredients with the highest level of the nutrient</li>
                <li>Highlight nutrients for which your supply falls short of the target levels</li>
              </ol>
              {/* </div> */}
              <div className="bg-gray-50 p-6 rounded-lg mb-4 text-sm">
                <h3 className="font-bold mb-4 border-b pb-2">Example Ingredient Analysis</h3>
                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span>Required Protein</span>
                    <span className="font-medium">16-18%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Soya meal (46–48%)</span>
                    <Check className="text-green-500" />
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Required Sodium</span>
                    <span className="font-medium">0.18-0.23%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Salt (39.3-40%)</span>
                    <Check className="text-green-500" />
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Required Phosphorus</span>
                    <span>0.4-0.5%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Wheat Bran Phosphorus (1.2-1.5%)</span>
                    <Check className="text-green-500" />
                  </div>
                  <div className="flex justify-between border-b pb-2 text-red-700">
                    <span className="font-medium">Required Calcium</span>
                    <span>4.4-4.5%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 text-red-700">
                    <span>Soya meal (0.38-0.39%)</span>
                    <X className="text-red-500" />
                  </div>
                  <div className="flex justify-between border-b pb-2 text-red-700">
                    <span>...</span>
                  </div>
                </div>
              </div>

              <p className="mb-4">
                Most of the time, you will need to add additional ingredients to meet your nutritional needs. You might source these locally.
                However there are some requirements that cannot be met by the raw ingredients you have on hand.
              </p>

              {/* Common Gaps */}
              <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-300 mb-4">
                <h3 className="font-bold mb-4">Common Missing Components</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>
                    <span className="font-bold">Calcium & Phosphorus:</span>
                    Critical for eggshell formation in layers (often missing in grain-based diets)
                  </li>
                  <li>
                    <span className="font-bold">Trace Minerals:</span>
                    Zinc, copper, and selenium deficiencies common in homemade mixes
                  </li>
                  <li>
                    <span className="font-bold">Vitamins:</span>
                    Particularly A, D3, and E degrade quickly in raw ingredients
                  </li>
                  <li>
                    <span className="font-bold">Amino Acids:</span>
                    Methionine and lysine often need supplementation
                  </li>
                </ul>
              </div>

              <p className="mb-4 italic">
                To cater for these missing nutrients, at FeedSport we have a wide range of <span className='font-bold'>PREMIXES</span> (with published nutrient profiles) that you can add to your mix, plus the often needed <span className='font-bold'>SOYA MEAL</span>
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <NumberedItem>4</NumberedItem>
                <Heading className="text-2xl font-semibold">Formulate Your Feed (The Fun Part!)</Heading>
              </div>
              <p className="mb-4">
                Once you’ve tallied up your ingredients and requirements, it’s time for some number crunching. You will need a bit of math to come up with the right formula.
                We created a <span className='font-bold'>FREE</span> mobile app for exactly this. Go ahead and:
              </p>
              <ol className="list-decimal pl-6 space-y-1 mb-6">
                <li>Choose your animal and growth stage (e.g., broiler chickens, 4–6 weeks old).</li>
                <li>Select your ingredients (maize, soya, sunflower, etc.).</li>
                <li>Input cost of crop per kg.</li>
                <li>Let the app work its magic to create the most affordable, balanced formula.</li>
              </ol>
              <p className="mb-4">
                Notice we said <span className='italic'>"Input cost of crop..."</span>, this is because the app also helps you optimize for cost. For example you might have multiple sources of carbohydrates but some might be costlier than others, the application will prioritize what's cheaper. At the end of the day you should end up with a formular that gives you the <span className='font-bold italic'>most affordable overall feed</span>.
              </p>
              <p className='italic'>
                Too busy for calculations? FeedSport also offers pre-made formulas or can customize one for you. Just reach out, and we’ll handle the numbers while you focus on farming.
              </p>
            </section>

            {/* Bonus Section */}
            <section>
              <Heading className="text-2xl font-semibold mb-6">Bonus: Elevate Your Feed</Heading>
              <p className="mb-4">
                Want to take your feed to the next level? Here are some extras you can add to your feed:
              </p>
              <ul className="list-disc pl-6 space-y-3 mb-6">
                <li><span className="font-bold">Enzymes:</span> Unlock more nutrients from raw ingredients.</li>
                <li><span className="font-bold">Pelletizing:</span> Reduce waste and improve digestion.</li>
                <li><span className="font-bold">Medications:</span> Add coccidiostats to prevent common diseases.</li>
              </ul>
              <p className='italic'>
                These extras aren’t one-size-fits-all, so let’s discuss what works best for your herd or flock.
              </p>
            </section>

            {/* Summary Graphic Section */}
            <section className="mt-4 pt-4 print:break-before-page">
              <Heading className="text-2xl font-semibold mb-12">
                Feed Formulation Roadmap
              </Heading>

              <div className="relative max-w-3xl mx-auto">
                {/* Vertical timeline line */}
                <div className="hidden md:block absolute left-5 top-0 bottom-0 w-px bg-gray-200"></div>

                <ol className="space-y-12 pl-0 md:pl-12">
                  {/* Step 1 */}
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-9 h-9 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center">
                      <span className="text-green-700 font-medium">1</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-lg text-gray-900">
                        Nutrition Analysis
                      </h3>
                      <p className="text-sm text-gray-600">Breed × Age × Purpose</p>
                    </div>
                  </li>

                  {/* Step 2 */}
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-9 h-9 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center">
                      <span className="text-green-700 font-medium">2</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-lg text-gray-900">
                        Ingredient Audit
                      </h3>
                      <div className="mt-1 flex flex-wrap gap-2 text-sm text-gray-600">
                        <span className="bg-green-50 px-2 py-1 rounded-md">Carbs</span>
                        <span className="bg-green-50 px-2 py-1 rounded-md">Protein</span>
                        <span className="bg-green-50 px-2 py-1 rounded-md">Fiber</span>
                      </div>
                    </div>
                  </li>

                  {/* Step 3 */}
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-9 h-9 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center">
                      <span className="text-green-700 font-medium">3</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-lg text-gray-900">
                        Assess Ingredients
                      </h3>
                      <ul className="mt-2 text-sm text-gray-600 space-y-2">
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-300 rounded-full" />
                          Identify shortfalls
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-300 rounded-full" />
                          Add supplements
                        </li>
                      </ul>
                    </div>
                  </li>

                  {/* Step 4 */}
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-9 h-9 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center">
                      <span className="text-green-700 font-medium">4</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-lg text-gray-900">
                        Number Crunching
                      </h3>
                      <ul className="mt-2 text-sm text-gray-600 space-y-2">
                        {["Choose animal", "Specify age", "Add ingredients", "Formulate"].map((step) => (
                          <li key={step} className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-300 rounded-full" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                </ol>
              </div>
            </section>


            {/* Contact Section */}
            <section className="text-center border-t pt-12 print:break-before-page">
              <p className="text-lg mb-4">Ready to Mix Smarter?</p>
              <p className="mb-4">
                Contact FeedSport Solutions today for expert advice, ready-made formulas, or top-quality ingredients to complete your mix.
              </p>

              <a href="whatsapp://send?phone=+263715788572" className="font-semibold text-gray-900 text-lg mb-4">
                <FaWhatsapp className="inline-block mr-2" /> +263 71 578 8572
              </a>
              <p className="text-sm text-gray-600">
                Happy farming, and here’s to healthier, happier livestock!
              </p>
            </section>
          </div>

          {/* Footer Navigation */}
          <div className="mt-8 text-gray-700 border-t border-gray-200 pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Our Popular Products
            </h2>

            {/* Soya Meal Section */}
            <div className="bg-white p-6 rounded-lg border-l-4 border-emerald-500 shadow-sm mb-6">
              <h3 className="font-semibold mb-3 text-gray-900">Premium Soya Meal Profile</h3>
              <p className="mb-4">
                High-protein foundation for optimal livestock nutrition:
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 py-1 border-b border-gray-100">
                  <span className="font-medium text-emerald-700">Protein</span>
                  <span className="text-gray-600">48%</span>
                </div>
                <div className="flex items-center gap-2 py-1 border-b border-gray-100">
                  <span className="font-medium text-emerald-700">Fat Content</span>
                  <span className="text-gray-600">1.5%</span>
                </div>
                <div className="flex items-center gap-2 py-1 border-b border-gray-100">
                  <span className="font-medium text-emerald-700">Fiber</span>
                  <span className="text-gray-600">3.5%</span>
                </div>
                <div className="flex items-center gap-2 py-1 border-b border-gray-100">
                  <span className="font-medium text-emerald-700">Energy</span>
                  <span className="text-gray-600">2,400 kcal/kg</span>
                </div>
              </div>
              <div className="mt-4 text-sm text-emerald-700">
                <p className="font-medium">Universal Application:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Poultry formulations</li>
                  <li>Swine rations</li>
                  <li>Dairy cattle feed</li>
                  <li>Beef cattle pen fattening</li>
                </ul>
              </div>
            </div>

            {/* Premix Sections */}
            <div className="space-y-6">
              {/* Broiler Premix */}
              <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500 shadow-sm">
                <h3 className="font-semibold mb-3 text-gray-900">Broiler Growth Enhancer (Premix)</h3>
                <p className="mb-3">
                  Muscle development and metabolic support formula:
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 py-1">
                    <span className="text-blue-600">●</span>
                    <span>L-Lysine HCl (Amino Acids)</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <span className="text-blue-600">●</span>
                    <span>Zinc Bacitracin (Minerals)</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <span className="text-blue-600">●</span>
                    <span>Phytase Enzymes</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <span className="text-blue-600">●</span>
                    <span>Vitamin B12 Complex</span>
                  </div>
                </div>
                <div className="mt-4 text-sm text-blue-700">
                  <p>Possible starter recipes:</p>
                  <ul className="list-disc list-inside">
                    <li>
                      maize + soybean meal + premix
                    </li>
                    <li>
                      maize + soybean meal + wheat bran + premix
                    </li>
                    <li>
                      maize + sunflower meal + fishmeal + premix
                    </li>
                  </ul>
                </div>
              </div>

              {/* Layer Premix */}
              <div className="bg-white p-6 rounded-lg border-l-4 border-amber-500 shadow-sm">
                <h3 className="font-semibold mb-3 text-gray-900">Layer Production Optimizer (Premix)</h3>
                <p className="mb-3">
                  Egg quality and shell strength formulation:
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 py-1">
                    <span className="text-amber-600">●</span>
                    <span>Calcium Carbonate Blend</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <span className="text-amber-600">●</span>
                    <span>Vitamin D3 Complex</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <span className="text-amber-600">●</span>
                    <span>Sodium Selenite</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <span className="text-amber-600">●</span>
                    <span>Choline Chloride</span>
                  </div>
                </div>
                <div className="mt-4 text-sm text-amber-700">
                  <p>Possible starter recipes:</p>
                  <ul className="list-disc list-inside">
                    <li>
                      maize + soybean meal + premix
                    </li>
                    <li>
                      maize + soybean meal + wheat bran + premix
                    </li>
                    <li>
                      maize + wheat middlings + soybean meal + premix
                    </li>
                  </ul>
                </div>
              </div>

              {/* Swine Premix */}
              <div className="bg-white p-6 rounded-lg border-l-4 border-purple-500 shadow-sm print:break-before-page">
                <h3 className="font-semibold mb-3 text-gray-900">Swine Development Blend (Premix)</h3>
                <p className="mb-3">
                  Digestive health and growth support formula:
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 py-1">
                    <span className="text-purple-600">●</span>
                    <span>L-Threonine Complex</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <span className="text-purple-600">●</span>
                    <span>Copper Supplement</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <span className="text-purple-600">●</span>
                    <span>Protease Enzymes</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <span className="text-purple-600">●</span>
                    <span>Probiotic Blend</span>
                  </div>
                </div>
                <div className="mt-4 text-sm text-purple-700">
                  <p>Possible starter recipes:</p>
                  <ul className="list-disc list-inside">
                    <li>
                      maize + soybean meal + premix + wheat bran
                    </li>
                    <li>
                      maize + soybean meal + rice bran + premix + vegetable oil
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PrintWatermark>
  );
}
