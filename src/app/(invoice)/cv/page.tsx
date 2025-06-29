// app/page.tsx
"use client";

import type { FC, ReactNode } from 'react';
import { FaDownload, FaGithub, FaLinkedin, FaEnvelope, FaGlobe, FaPhone } from 'react-icons/fa';


const cvData = {
  /* ───────────────────── Header ───────────────────── */
  name: 'Kelvin Muza',
  title: 'Principal Cloud Architect & Full-Stack Engineering Leader',
  location: 'Harare • Remote-first',
  email: 'k1muza@gmail.com',
  website: 'k1muza.github.io',
  linkedin: 'linkedin.com/in/kelvin-muza-05656660',
  phone: '+263 77 468 4534',
  github: 'github.com/k1muza',

  contact: [
    { icon: FaEnvelope, text: 'k1muza@gmail.com', href: 'mailto:k1muza@gmail.com' },
    { icon: FaGlobe,   text: 'k1muza.github.io',  href: 'https://k1muza.github.io' },
    { icon: FaLinkedin,text: 'linkedin.com/in/kelvin-muza-05656660', href: 'https://www.linkedin.com/in/kelvin-muza-05656660/' },
    { icon: FaGithub,  text: 'github.com/k1muza', href: 'https://github.com/k1muza' },
    { icon: FaPhone,   text: '+263 77 468 4534',  href: 'tel:+263774684534' },
  ],

  /* ───────────────────── Elevator Pitch ───────────────────── */
  intro:
    'Principal engineer with 10+ years turning green-field ideas into cloud-native products that scale to millions of users and 9-figure GMV. ' +
    'Brings a rare blend of deep Python & TypeScript expertise, hands-on AWS/Kubernetes architecture, and servant leadership that lifts entire teams. ' +
    'Track record: slashed P95 latency 97 %, boosted deployment frequency 10×, and grew engineering squads from 3 to 15 while maintaining elite DORA metrics.',

  /* ───────────────────── Key Skills ───────────────────── */
  skills: {
    'Cloud Platforms': [
      'AWS (EC2, ECS, EKS, Lambda, S3, RDS, DynamoDB, CloudFront, Route 53)',
      'GCP (GKE, Cloud Run, Pub/Sub)',
      'Azure (AKS, Functions, Cosmos DB)'
    ],
    'DevOps & SRE': [
      'Kubernetes • Helm • Terraform',
      'CI/CD (GitHub Actions, GitLab CI, Argo CD)',
      'Observability: Prometheus, Grafana, Loki, Datadog',
      'Site Reliability • Chaos Engineering • DORA KPIs'
    ],
    'Backend Engineering': [
      'Python (Django, FastAPI, Celery, Strawberry GraphQL)',
      'Node.js / NestJS',
      'Event-driven: Kafka, Amazon Kinesis, SQS',
      'REST • GraphQL • gRPC'
    ],
    'Frontend & Mobile': [
      'React • Next.js • Remix',
      'TypeScript • Tailwind • Radix UI',
      'Flutter • React Native'
    ],
    'Data & AI': [
      'PostgreSQL • Redis • MongoDB • ElasticSearch',
      'pandas • NumPy • scikit-learn',
      'LangChain • OpenAI API • Vector DBs'
    ],
    'Languages': [
      'Python • TypeScript • Go • Java • Dart'
    ],
    'Leadership & Process': [
      'Agile / Scrum-Ban',
      'OKRs • Tech Road-mapping',
      'Mentorship • Hiring • Budget Ownership'
    ],
  },

  /* ───────────────────── Experience ───────────────────── */
  experience: [
    {
      role: 'Principal Software Engineer & Architect',
      company: 'HyperionDev',
      dates: 'Jan 2022 – Present',
      location: 'Remote',
      description: [
        'Drove cloud-native re-platform of monolithic LMS to React + GraphQL micro-frontends on EKS; page-load time ↓45 %, weekly release cadence ↑8×.',
        'Designed and rolled out event-driven architecture (Kafka + Redis streams) powering 50 k+ real-time notifications/min with < 100 ms end-to-end latency.',
        'Instituted trunk-based GitLab CI/CD with blue-green deployments; meantime-to-recovery (MTTR) now < 5 min, change failure rate < 1 %.',
        'Championed observability stack (Prometheus, Grafana, Loki); proactive alerts cut P1 incidents 60 %.',
        'Scaled team from 5 to 12 engineers while mentoring three to senior level and embedding SOLID / Clean-Architecture best practices.'
      ],
    },
    {
      role: 'Founder & Lead Architect',
      company: 'Afriscores (SportsTech SaaS)',
      dates: 'Jan 2014 – Nov 2024',
      location: 'Harare / Remote',
      description: [
        'Bootstrapped live-scores platform streaming 5 M WebSocket events/day for 500+ leagues; 99.95 % SLA sustained across 3 World Cups.',
        'Orchestrated autoscaling micro-services (AWS ALB + ASG) saving 40 % infra cost vs. static fleet.',
        'Implemented edge caching (CloudFront + Lambda@Edge) cutting global TTFB by 300 ms.',
        'Commercialised API; secured 30 B2B sports-media clients and > $400 k ARR by year 3.'
      ]
    },
    {
      role: 'IT Manager → Engineering Lead',
      company: 'AXA Holdings',
      dates: 'Dec 2015 – Jan 2022',
      location: 'Harare',
      description: [
        'Modernised legacy loan-tracking to cloud-first Angular + Firestore stack; reduced reconciliation time 75 %.',
        'Launched six corporate sites with Jamstack + WordPress headless CMS; boosted organic traffic 3×.',
        'Owned $250 k annual tech budget and vendor negotiations, saving 30 % on SaaS spend.'
      ],
    }
  ],

  /* ───────────────────── Education & Certifications ───────────────────── */
  education: [
    {
      degree: 'B.Eng. Electronic Engineering (1st Class)',
      institution: 'National University of Science & Technology, Zimbabwe',
      dates: '2008 – 2012',
      achievement: 'Robotics capstone exhibited at Zimbabwe Int’l Trade Fair'
    },
    {
      degree: 'AWS Certified Solutions Architect – Professional',
      institution: 'Amazon Web Services',
      dates: '2024',
      achievement: ''
    },
  ],

  /* ───────────────────── Flagship Projects ───────────────────── */
  projects: [
    {
      name: 'AI-Driven Feed Formulation Engine',
      description:
        'Next.js SaaS that slashes livestock feed cost 18 % via linear programming & Gen AI-powered nutrient suggestions; served 5 k diet plans first 90 days.',
      link: 'https://github.com/k1muza/feedsport',
      tech: 'Next.js • TypeScript • Tailwind • Django • Pyomo'
    },
    {
      name: 'Inventory Management + POS',
      description:
        'Offline-first Flutter POS with Bluetooth scale, real-time sync to GraphQL backend; processes 2 M transactions / month across 150 stores.',
      link: 'https://github.com/k1muza/pos',
      tech: 'Flutter • Dart • GraphQL • Redis • PostgreSQL'
    },
    {
      name: 'Imagizer',
      description:
        'FastAPI micro-service for real-time image resizing & face-centering; 2 TB/month throughput behind CloudFront.',
      link: 'https://github.com/k1muza/imagizer',
      tech: 'FastAPI • Python • Pillow • Redis'
    },
  ],

  /* ───────────────────── Awards & Highlights ───────────────────── */
  achievements: [
    'Power FM feature: “Top 5 Zimbabwean Devs to Watch” (200 k+ listeners)',
    'Talks @ PyCon Africa ’23 & AWS Community Day ’24 (rated 4.8/5)',
    'Open-source contributor: Django, Strawberry GraphQL, Backstage plugins'
  ],

  /* ───────────────────── Tooling ───────────────────── */
  tools: [
    'Git (Git Flow + Trunk-Based)', 'Jira', 'Azure Boards', 'Sentry', 'Datadog',
    'Grafana', 'Postman', 'Figma', 'VS Code', 'Android Studio', 'Mermaid',
    'Lucidchart', 'Miro'
  ],
};


interface SectionProps {
  title: string;
  children: ReactNode;
}

const Section: FC<SectionProps> = ({ title, children }) => (
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
