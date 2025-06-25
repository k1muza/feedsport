// app/page.tsx
"use client";

import React from 'react';
import { FaDownload, FaGithub, FaLinkedin, FaEnvelope, FaGlobe, FaPhone } from 'react-icons/fa';
import { Merriweather, Orbitron, Inter } from 'next/font/google';

const inter = Inter({
  weight: '400',
  subsets: ['latin'],
})

const orbi = Orbitron({
  weight: '400',
  subsets: ['latin'],
})

const cvData = {
  name: 'Kelvin Muza',
  title: 'Senior Full‑Stack Software Engineer',
  location: 'Harare, Zimbabwe',
  email: 'k1muza@gmail.com',
  website: 'k1muza.github.io',
  linkedin: 'linkedin.com/in/kelvin-muza-05656660',
  phone: '+263 77 468 4534',
  github: 'github.com/k1muza',

  contact: [
    { icon: FaEnvelope, text: 'k1muza@gmail.com', href: 'mailto:k1muza@gmail.com' },
    { icon: FaGlobe, text: 'k1muza.github.io', href: 'https://k1muza.github.io' },
    { icon: FaLinkedin, text: 'linkedin.com/in/kelvin-muza-05656660', href: 'https://www.linkedin.com/in/kelvin-muza-05656660/' },
    { icon: FaGithub, text: 'github.com/k1muza', href: 'https://github.com/k1muza' },
    { icon: FaPhone, text: '+263 77 468 4534', href: 'tel:+263774684534' },
  ],

  intro: 'Full‑stack engineer with deep experience across Django APIs, React/Next.js front‑ends and AWS infrastructure. I enjoy building data‑driven products— from real‑time sports platforms to AI‑assisted feed‑formulation engines— and setting up the DevOps, testing and analytics needed to keep them humming.',

  skills: {
    'AWS Cloud': [
      'EC2',
      'S3',
      'CloudFront',
      'RDS',
      'Lambda',
      'CloudWatch',
      'Secrets Manager',
      'Route53',
      'SQS',
      'ElastiCache'
    ],
    'Cloud & DevOps': [
      'CI/CD (GitHub Actions, GitLab Runner)',
      'Docker',
      'Heroku',
      'Metabase'
    ],
    'Backend Engineering': [
      'Django',
      'NestJS',
      'Flask',
      'FastAPI',
      'GraphQL',
      'Express',
      'REST APIs'
    ],
    'Frontend Engineering': [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Bootstrap',
      'Angular'
    ],
    'Mobile': [
      'Native Android',
      'Flutter',
      'Ionic',
    ],
    'Databases': [
      'PostgreSQL',
      'MySQL',
      'Redis',
      'MongoDB',
      'SQLite',
      'Firebase Firestore'
    ],
    'Programming Languages': [
      'Python',
      'PHP',
      'JavaScript',
      'TypeScript',
      'Java',
    ]
  },

  experience: [
    {
      role: 'Senior Software Engineer',
      company: 'HyperionDev',
      dates: 'Jan 2022 - Present',
      location: 'Remote',
      description: [
        'Led a five-engineer team decomposing monolithic Django VLE into cloud-native React + GraphQL LMS, boosting page-load speed 45% and enabling weekly frontend releases',
        'Authored an architecture design doc and built a Python/Django Q distributed task queue, cutting p95 API latency from 5 – 20 s to < 1 s (-97 %) for 50 k+ daily requests.',
        'Upgraded the core platform from Django 2.x to Django 4.x and migrated the caching tier from Memcached to Redis (AWS ElastiCache) with zero‑downtime blue‑green releases.',
        'Built GitLab CI/CD pipeline reducing deployment time from 30min to <5 minutes',
        'Instrumented CloudWatch disk‑space metrics and automated alerts, eliminating unplanned outages for 50k+ users',
        '(Ongoing) Run a weekly “Engineering Craft” design-upskilling session for an 8-person squad—hands-on drills in TDD, secure-coding (OWASP Top 10), and Clean Code/SOLID patterns. Test coverage climbed 0 % → 50 %',
        'Integrated 10+ third-party services (Xero, Livestorm, Nutshell CRM, Sendgrid + 7 others) with HMAC/OAuth 2.0 flows—expanding the product ecosystem with zero security incidents.'
      ],
    },
    {
      role: 'Lead Developer (part-time)',
      company: 'Afriscores',
      dates: 'Jan 2014 - Nov 2024',
      location: 'Harare',
      description: [
        'Architected Afriscores’ green-field live-scores platform—authored ERD, queue-flow & WebSocket diagrams, chose an auto-scaling micro-services stack on AWS (EC2 + ASG + ALB) and enabled zero-downtime blue/green deploys.',
        'Shipped MVP in three sprints; platform now streams real-time scores for 500+ leagues, pushes 5 M WebSocket events/day, and sustains 99.95 % uptime during peak match windows.',
        'Built a GraphQL fan-out API fronted by Redis edge cache, cutting egress bandwidth 60 % and trimming p95 request latency to 1.8 s.',
        'Automated a Python match-statistics pipeline that eliminated 2 hrs/day of manual data wrangling and unlocked next-day analytics for editorial partners.',
        'Implemented GitHub-Actions CI/CD, reducing deploy time from 30 min to 5 min and shrinking MTTR to <10 min.'
      ]
    },
    {
      role: 'IT Manager',
      company: 'AXA Holdings',
      dates: 'Dec 2015 - Jan 2022',
      location: 'Harare',
      description: [
        'Architected AngularJS + Firestore accounting platform improving loan-tracking accuracy by 30%',
        'Modernised AXA Holdings’ digital presence by architecting 6 brand-compliant WordPress sites; shaved agency costs 30 %.',
        'Implemented email infrastructure reaching 100K+ subscribers',
      ],
    }
  ],

  education: [
    {
      degree: 'BEng Electronic Engineering',
      institution: 'National University of Science and Technology, Zimbabwe',
      dates: '2008 - 2012',
      achievement: 'Academic Achievement: Robotics project selected for Zimbabwe International Trade Fair (2012)'
    },
  ],

  projects: [
    {
      name: 'Animal Feed Formulation Engine',
      description: 'An ambitious project aimed at helping livestock farmers mix their own feed. Next.js front‑end atop Django API that leverages linear algebra and optimization algorithms (simplex and coordinate-descent).',
      link: 'https://github.com/k1muza/feedsport',
      tech: 'Next.js · TypeScript · Tailwind · Django',
    },
    {
      name: 'Schooler',
      description: 'Comprehensive and scalable school management system designed to streamline the operations of educational institutions.',
      link: 'https://github.com/k1muza/schooler',
      tech: 'Django · React · PostgreSQL · Docker · GraphQL',
    },
    {
      name: 'Inventory Management System',
      description: 'GraphQL‑powered inventory platform tracking products, sales, purchases and margins with rich financial reporting.',
      link: 'https://github.com/k1muza/inventory',
      tech: 'Django · Strawberry GraphQ · Redis · PostgreSQL'
    },
    {
      name: 'Flutter POS',
      description: 'Offline‑first point‑of‑sale app with Bluetooth weight‑scale integration and real‑time sync to Inventory Management System.',
      link: 'https://github.com/k1muza/pos',
      tech: 'Flutter · Dart · Firebase · SQLite · Bluetooth'
    },
    {
      name: 'Imagizer',
      description: 'FastAPI micro‑service for dynamic image resizing, face‑centering and Redis caching, deployable on Heroku.',
      link: 'https://github.com/k1muza/imagizer',
      tech: 'FastAPI · Python · Redis',
    },
  ],

  achievements: [
    'Honorable mention on Power FM (200k+ listeners) for Soccer24 app development',
    'Honorable mention on Technology Zimbabwe blog (50k+ readers)'
  ],

  tools: ['Git Flow', 'Jira', 'Asana', 'Sentry', 'GoAccess', 'Postman', 'Figma', 'VSCode', 'Android Studio', 'Mermaid', 'MySQL Workbench', 'Mira', 'LucidChart'],
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <section className="mb-8">
    <div className="flex items-center mb-4 break-inside-avoid">
      <div className="bg-gradient-to-r from-cyan-500 to-teal-500 w-3 h-8 rounded-md mr-3" />
      <h2 className="text-xl font-bold text-gray-800 font-heading tracking-wide">{title}</h2>
    </div>
    {children}
  </section>
);

export default function CVPage() {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-serif`}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet" />

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
            {/* Left Column (Contact & Skills) */}
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
                    <h3 className="font-semibold text-lg text-gray-800 mb-3 font-heading">{category}</h3>
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

              <Section title="Tools">
                <div className="flex flex-wrap gap-2">
                  {cvData.tools.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Section>
            </aside>

            {/* Right Column (Experience, Projects, Education) */}
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
                      <div className="flex justify-between items-start print:block">
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
                        <span className="text-xs bg-cyan-100 print:bg-cyan-50 text-cyan-800 px-2 py-1 rounded">
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
                    <h3 className="text-lg font-semibold text-gray-800 font-heading">{edu.degree}</h3>
                    <p className="text-md text-cyan-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500 mt-1">{edu.dates}</p>
                    {edu.achievement && (
                      <p className="text-sm text-gray-800 mt-2 italic bg-gray-50 p-3 rounded-lg">{edu.achievement}</p>
                    )}
                  </div>
                ))}
              </Section>
            </div>
          </div>
        </div>
      </main>

      {/* Download Button */}
      <div className="fixed bottom-8 right-8 no-print z-20">
        <button
          onClick={() => window.print()}
          className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 group font-heading"
          aria-label="Download CV as PDF"
        >
          <FaDownload className="group-hover:animate-bounce" />
          <span>Download PDF</span>
        </button>
      </div>

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
          margin: 1cm 0 0.3cm 0;
        }
      `}</style>
    </div>
  );
}
