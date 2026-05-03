import type { LucideIcon } from 'lucide-react';
import { Code2, Database, Globe, Lightbulb, Rocket, Zap } from 'lucide-react';

export type Stat = {
  value: number;
  label: string;
  suffix?: string;
};

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  price: string;
  featured?: boolean;
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  color: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export const stats: Stat[] = [
  { value: 150, label: 'Projects Delivered', suffix: '+' },
  { value: 98, label: 'Client Satisfaction', suffix: '%' },
  { value: 50, label: 'Happy Clients', suffix: '+' },
  { value: 5, label: 'Years Experience', suffix: '+' },
];

export const services: Service[] = [
  {
    icon: Globe,
    title: 'Static Websites',
    description:
      'Fast, elegant websites for brands that need clarity, speed, and a strong first impression.',
    features: ['Responsive Design', 'SEO Optimization', 'Fast Loading', 'Easy Maintenance'],
    price: 'From $2,500',
  },
  {
    icon: Code2,
    title: 'Web Applications',
    description:
      'Interactive applications with custom workflows, dashboards, and business logic tailored to your needs.',
    features: ['Custom Features', 'User Authentication', 'Real-time Updates', 'API Integration'],
    price: 'From $8,000',
    featured: true,
  },
  {
    icon: Database,
    title: 'Full-Stack Solutions',
    description:
      'End-to-end systems with backend services, databases, admin tools, and production-ready deployment.',
    features: ['Database Design', 'Backend API', 'Admin Dashboard', 'Cloud Deployment'],
    price: 'From $15,000',
  },
];

export const comparisonRows = [
  { feature: 'Design', static: true, fullStack: true },
  { feature: 'Frontend', static: true, fullStack: true },
  { feature: 'Backend', static: false, fullStack: true },
  { feature: 'Database', static: false, fullStack: true },
  { feature: 'User Authentication', static: false, fullStack: true },
  { feature: 'Admin Dashboard', static: false, fullStack: true },
  { feature: 'API Integration', static: false, fullStack: true },
  { feature: 'Maintenance', static: 'Basic', fullStack: 'Full' },
] as const;

export const technologies = [
  { name: 'React', color: '#61DAFB', description: 'Modern UI Framework' },
  { name: 'TypeScript', color: '#3178C6', description: 'Type-Safe Development' },
  { name: 'Node.js', color: '#339933', description: 'Backend Runtime' },
  { name: 'PostgreSQL', color: '#4169E1', description: 'Reliable Database' },
  { name: 'Tailwind CSS', color: '#06B6D4', description: 'Utility-First CSS' },
  { name: 'AWS', color: '#FF9900', description: 'Cloud Infrastructure' },
];

export const steps = [
  {
    icon: Lightbulb,
    number: '01',
    title: 'Planning & Understanding',
    description:
      'We get clear on business goals, audiences, requirements, and success criteria before any design work starts.',
  },
  {
    icon: Zap,
    number: '02',
    title: 'Design & Architecture',
    description:
      'We shape the interface and technical plan together so the experience feels intentional and scalable.',
  },
  {
    icon: Code2,
    number: '03',
    title: 'Building & Testing',
    description:
      'Development moves in focused iterations with testing, review, and feedback baked into each step.',
  },
  {
    icon: Rocket,
    number: '04',
    title: 'Launch & Support',
    description:
      'We ship, monitor, and support the project after launch so it keeps performing as the business grows.',
  },
];

export const projects: Project[] = [
  {
    title: 'E-Commerce Platform',
    description:
      'Online store with payment processing, inventory management, and business analytics.',
    tags: ['React', 'Node.js', 'Stripe', 'PostgreSQL'],
    color: '#FF6B6B',
  },
  {
    title: 'Restaurant Booking System',
    description:
      'Reservation flow with confirmations, calendar updates, and customer notifications.',
    tags: ['React', 'Firebase', 'Twilio'],
    color: '#4ECDC4',
  },
  {
    title: 'Healthcare Dashboard',
    description:
      'Secure operations dashboard built for sensitive data, reporting, and team workflows.',
    tags: ['React', 'Node.js', 'MongoDB', 'AWS'],
    color: '#95E1D3',
  },
  {
    title: 'Financial Analytics API',
    description: 'High-performance API for processing, summarizing, and serving financial data.',
    tags: ['Node.js', 'PostgreSQL', 'Redis'],
    color: '#F38181',
  },
  {
    title: 'Social Media Dashboard',
    description:
      'Unified workspace for managing multiple channels, content, and performance insights.',
    tags: ['React', 'GraphQL', 'MongoDB'],
    color: '#AA96DA',
  },
  {
    title: 'Learning Management System',
    description:
      'Course management, student tracking, and interactive assessments in one platform.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'S3'],
    color: '#FCBAD3',
  },
];

export const testimonials = [
  {
    quote:
      'The team delivered a polished product that was easy to use and clearly built with care. The result felt bigger than the brief.',
    author: 'Sarah Johnson',
    role: 'CEO, RetailCo',
    company: 'E-Commerce Platform',
  },
  {
    quote:
      'Professional, responsive, and highly organized. They turned a complex set of requirements into something elegant.',
    author: 'Michael Chen',
    role: 'CTO, HealthTech Inc',
    company: 'Healthcare Dashboard',
  },
  {
    quote:
      'Outstanding collaboration from start to finish. The booking system worked smoothly and our customers noticed immediately.',
    author: 'Emma Rodriguez',
    role: 'Owner, Bistro Moderne',
    company: 'Restaurant Booking System',
  },
];

export const faqs: FAQItem[] = [
  {
    question: 'How long does a typical project take?',
    answer:
      'Smaller landing pages often take 2 to 4 weeks, while richer applications can take 8 to 16 weeks depending on scope and approvals.',
  },
  {
    question: 'What is included in ongoing support?',
    answer:
      'Support can include bug fixes, security updates, deployment help, performance checks, and small iterations after launch.',
  },
  {
    question: 'Do you handle hosting and deployment?',
    answer:
      'Yes. We can deploy to modern cloud platforms and help choose the right setup for your traffic, budget, and maintenance needs.',
  },
  {
    question: 'Can you work with an existing brand or design system?',
    answer:
      'Absolutely. We can adapt to an existing brand, refine a Figma file, or build a visual direction from scratch if needed.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'We can stay involved after launch to monitor, iterate, and make sure the product keeps running smoothly in the real world.',
  },
  {
    question: 'Do you offer payment plans?',
    answer:
      'For larger projects, milestone-based payment plans are available so the engagement stays predictable for both sides.',
  },
];
