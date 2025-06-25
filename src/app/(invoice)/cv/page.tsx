// app/page.tsx
"use client";

import React from 'react';
import {
  FaDownload,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaGlobe,
  FaPhone,
} from 'react-icons/fa';
import { Orbitron, Inter } from 'next/font/google';

const inter = Inter({ weight: '400', subsets: ['latin'] });
const orbi = Orbitron({ weight: '400', subsets: ['latin'] });

// -----------------------------------------------------------------------------
//  DATA
// -----------------------------------------------------------------------------

const cvData = {
  name: 'Kelvin Muza',
  title: 'Senior Full‑Stack Software Engineer',
  location: 'Harare, Zimbabwe',
  email: 'k1muza@gmail.com',
  phone: '+263 77 123 4567',
  website: 'k1muza.github.io',
  linkedin: 'linkedin.com/in/kelvin-muza-05656660',
  github: 'github.com/k1muza',

  contact: [
    {
      icon: FaPhone,
      text: '+263 77 123 4567',
      href: 'tel:+263771234567',
    },
    {
      icon: FaEnvelope,
      text: 'k1muza@gmail.com',
      href: 'mailto:k1muza@gmail.com',
    },
    { icon: FaGlobe, text: 'k1muza.github.io', href: 'https://k1muza.github.io' },
    {
      icon: FaLinkedin,
      text: 'linkedin.com/in/kelvin-muza-05656660',
      href: 'https://www.linkedin.com/in/kelvin-muza-05656660/',
    },
    {
      icon: FaGithub,
      text: 'github.com/k1muza',
      href: 'https://github.com/k1muza',
    },
  ],

  intro:
    'Full‑stack engineer specialising in Django APIs and React/Next.js on AWS. I build data‑driven platforms—from real‑time sports apps to AI feed‑formulation engines—and set up the DevOps, testing and analytics that keep them humming.',

  skills: {
    'Cloud & DevOps': [
      'AWS (EC2, S3, RDS, CloudFront, Route 53, Lambda, SQS, ElastiCache, CloudWatch, Secrets Mgr)',
      'CI/CD (GitHub Actions, GitLab Runner)',
      'Docker',
      'Heroku',
      'Metabase',
    ],
    'Backend Engineering': [
      'Django',
      'NestJS',
      'Flask',
      'FastAPI',
      'GraphQL',
      'Express',
      'REST APIs',
    ],
    'Frontend Engineering': [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Bootstrap',
      'Angular',
    ],
    Databases: ['PostgreSQL', 'MySQL', 'Redis', 'MongoDB', 'SQLite', 'Firebase'],
    'Programming Languages': [
      'Python',
      'PHP',
      'JavaScript',
      'TypeScript',
      'Java',
    ],
  },

  experience: [
    {
      role: 'Senior Software Engineer',
      company: 'HyperionDev',
      dates: 'Jan 2022 – Present',
      location: 'Remote',
      description: [
        'Led a five‑engineer team to decompose a monolithic Django VLE into a cloud‑native React + GraphQL LMS, boosting page‑load speed by 45 % and enabling weekly FE releases.',
        'Engineered a Python/Django‑Q distributed task queue that cut API latency from 5‑20 s to 0.5‑1 s (‑97 %).',
        'Migrated the caching tier from Memcached to Redis (AWS ElastiCache) with zero‑downtime blue‑green releases.',
        'Built a GitLab CI/CD pipeline that reduced deployment time from 30 min to < 5 min.',
        'Instrumented CloudWatch metrics and automated alerts, eliminating unplanned outages for 50 k+ users.',
        'Driving a test‑automation programme (Pytest‑Django/Selenium) that has increased coverage from 0 % to 50 %.',
        'Integrated 10+ third‑party services (Xero, Livestorm, Nutshell CRM, SendGrid, Intercom, Zendesk, Stripe, PayFast, etc.) using secure HMAC/OAuth 2.0 flows with zero security incidents.',
      ],
    },
    {
      role: 'Lead Developer',
      company: 'Afriscores',
      dates: 'Jan 2014 – Nov 2024',
      location: 'Harare',
      description: [
        'Architected micro‑services on auto‑scaling AWS EC2 (ASG + ALB) enabling zero‑downtime deploys.',
        'Implemented real‑time notifications via WebSockets delivering alerts < 500 ms to 10 k+ concurrent users.',
        'Provisioned a GraphQL API with Redis edge cache, cutting bandwidth by 60 % and p95 latency to 1.8 s.',
        'Automated a Python statistics pipeline, saving two hours of manual work daily.',
        'Designed CI/CD and monitoring for a live sports‑data ecosystem.',
      ],
    },
    {
      role: 'Software Architect',
      company: 'AXA Holdings',
      dates: 'Dec 2015 – Jan 2022',
      location: 'Harare',
      description: [
        'Architected an AngularJS accounting platform that improved loan‑tracking accuracy by 30 %.',
        'Delivered Ionic/Java Android apps for field operations used by 200+ sales agents.',
        'Implemented an email‑marketing infrastructure reaching 100 k+ subscribers.',
      ],
    },
  ],

  education: [
    {
      degree: 'BEng Electronic Engineering',
      institution: 'National University of Science & Technology, Zimbabwe',
      dates: '2008 – 2012',
      achievement:
        'Robotics project selected for the Zimbabwe International Trade Fair (2012)',
    },
  ],

  projects: [
    {
      name: 'Animal Feed Formulation Engine',
      description:
        'Next.js front‑end atop a Django API leveraging simplex & coordinate‑descent optimisation to help farmers mix their own feed.',
      link: 'https://github.com/k1muza/feedsport',
      tech: 'Next.js · TypeScript · Tailwind',
    },
    {
      name: 'Schooler',
      description:
        'Comprehensive school‑management system built with Django, React, PostgreSQL & Redis—fully containerised with Docker.',
      link: 'https://github.com/k1muza/schooler',
      tech: 'Django · React · PostgreSQL',
    },
    {
      name: 'Inventory Management System',
      description:
        'GraphQL‑powered inventory platform tracking products, sales, purchases and margins with rich financial reporting.',
      link: 'https://github.com/k1muza/inventory',
      tech: 'Django · Strawberry GraphQL · Redis',
    },
    {
      name: 'Imagizer',
      description:
        'FastAPI micro‑service for dynamic image resizing, face‑centering and Redis caching—deployable on Heroku.',
      link: 'https://github.com/k1muza/imagizer',
      tech: 'FastAPI · Python · Redis',
    },
  ],

  achievements: [
    'Honourable mention on Power FM (200 k+ listeners) for Soccer24 app development',
    'Featured on Technology Zimbabwe blog (50 k+ readers)',
  ],
};

// -----------------------------------------------------------------------------
//  COMPONENTS
// -----------------------------------------------------------------------------

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <section className="mb-8">
    <div className="flex items-center mb-4 break-inside-avoid">
      <div className="bg-gradient-to-r from-cyan-500 to-teal-500 w-3 h-8 rounded-md mr-3" />
      <h2 className="text-xl font-bold text-gray-800 font-heading tracking-wide">
        {title}
      </h2>
    </div>
    {children}
  </section>
);

// -----------------------------------------------------------------------------
//  PAGE
// -----------------------------------------------------------------------------

export default function CVPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-serif">
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@600;700;800&display=swap"
        rel="stylesheet"
      />

      <main className="container mx-auto max-w-5xl p-4 sm:p-6">
        <div className="relative z-10 p-6 sm:p-10 print:py-0 bg-white shadow-xl rounded-2xl print:shadow-none print:rounded-none">
          {/* Header */}
          <header className="mb-6 pb-4 border-b border-gray-200">
            <div className="flex flex-row gap-6 items-start">
              <img
                src="/images/kelvin.jpg"
                alt="Kelvin Muza"
                className="w-36 h-36 inline-block rounded-xl object-cover border-2 border-teal-500"
              />

              <div className="flex-1">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 font-heading tracking-tight">
                  {cvData.name}
                </h1>
                <p className="text-xl sm:text-2xl text-cyan-600 mt-1 font-heading">
                  {cvData.title}
                </p>

                <div className="mt-3">
                  <p className="text-gray-800 text-sm leading-relaxed max-w-3xl">
                    {cvData.intro}
                  </p>
                </div>
              </div>
            </div>
          </header>

          <div className="flex flex-col lg:flex-row gap-8 print:flex-row">
            {/* Left Column */}
            <aside className="lg:w-1/3 print:w-1/3">
              <Section title="Contact">
                <ul className="space-y-3">
                  {cvData.contact.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                      <a
                        href={item.href}
                        className="text-gray-800 hover:text-cyan-600 transition-colors print:no-underline text-sm"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title="Skills">
                {Object.entries(cvData.skills).map(([category, skills]) => (
                  <div key={category} className="mb-6 break-inside-avoid">
                    <h3 className="font-semibold text-lg text-gray-800 mb-3 font-heading">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </Section>
            </aside>

            {/* Right Column */}
            <div className="lg:w-2/3 print:w-2/3">
              <Section title="Work Experience">
                <div className="space-y-8">
                  {cvData.experience.map((job, index) => (
                    <div key={index} className="break-inside-avoid group">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-cyan-600 transition-colors font-heading">
                            {job.role}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                            <p className="text-md text-cyan-600">{job.company}</p>
                            <span className="hidden sm:inline text-gray-400">•</span>
                            <p className="text-sm text-gray-500">{job.location}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
                          {job.dates}
                        </p>
                      </div>
                      <ul className="list-none pl-0 mt-3 space-y-2 text-gray-800 text-sm">
                        {job.description.map((point, i) => (
                          <li key={i} className="flex items-start">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Section>

              <Section title="Public Repos">
                <div className="grid grid-cols-1 gap-4">
                  {cvData.projects.map((proj, index) => (
                    <div key={index} className="break-inside-avoid">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-gray-800 font-heading">
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-cyan-600 flex items-center gap-2"
                          >
                            <FaGithub className="inline" />
                            {proj.name}
                          </a>
                        </h3>
                        <span className="text-xs bg-cyan-100 text-cyan-800 px-2 py-1 rounded">
                          {proj.tech}
                        </span>
                      </div>
                      <p className="text-gray-800 my-2 text-sm">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </Section>

              <Section title="Education">
                {cvData.education.map((edu, index) => (
                  <div key={index} className="break-inside-avoid">
                    <h3 className="text-lg font-semibold text-gray-800 font-heading">
                      {edu.degree}
                    </h3>
                    <p className="text-md text-cyan-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500 mt-1">{edu.dates}</p>
                    {edu.achievement && (
                      <p className="text-sm text-gray-800 mt-2 italic bg-gray-50 p-3 rounded-lg">
                        {edu.achievement}
                      </p>
                    )}
                  </div>
                ))}
              </Section>
            </div>
          </div>
        </div>
      </main>

      {/* Download Button */}
      <button
        onClick={() => window.print()}
        className="fixed bottom-8 right-8 no-print z-20 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 group font-heading"
        aria-label="Download CV as PDF"
      >
        <FaDownload className="group-hover:animate-bounce" />
        <span>Download PDF</span>
      </button>

      <style jsx global>{`
        .font-heading {
          font-family: 'Montserrat', sans-serif;
        }

        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            background-color: #fff;
            margin: 0;
          }

          .no-print {
            display: none !important;
          }

          .container {
            padding: 0 !important;
            max-width: 100% !important;
          }

          .text-sm {
            font-size: 0.75rem;
          }
        }

        @page {
          size: A4;
          margin: 1cm 0;
        }
      `}</style>
    </div>
  );
}
