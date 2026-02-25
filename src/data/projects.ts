export interface Project {
  id: number;
  title: string;
  category: 'Full-Stack' | 'Front-End' | 'Back-End';
  description: string;
  image: string;
  tags: string[];
  color: string;
  client?: string;
  link?: string;
  result?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Full-Stack',
    description: 'Modern shopping experience with seamless checkout and real-time inventory management.',
    image: '/projects/ecommerce.jpg',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
    color: 'from-slate-900 via-slate-800 to-gray-900',
    client: 'TechRetail Co.',
    link: 'https://giorgosts.com',
    result: '37% increase in checkout conversions',
  },
  {
    id: 2,
    title: 'Restaurant Booking System',
    category: 'Full-Stack',
    description: 'Streamlined reservation platform with table management and customer reviews.',
    image: '/projects/restaurant.jpg',
    tags: ['Next.js', 'PostgreSQL', 'Prisma', 'TypeScript'],
    color: 'from-gray-900 via-slate-800 to-zinc-900',
    client: 'Gourmet Dining Group',
    link: 'https://resy.com',
    result: 'Reduced booking time by 60%',
  },
  {
    id: 3,
    title: 'Healthcare Dashboard',
    category: 'Front-End',
    description: 'Real-time patient monitoring system with advanced analytics and reporting.',
    image: '/projects/healthcare.jpg',
    tags: ['React', 'TypeScript', 'Chart.js', 'Material-UI'],
    color: 'from-slate-900 via-blue-950 to-slate-900',
    client: 'MediCare Solutions',
    link: 'https://dashboard.stripe.com',
    result: '50% faster data access for doctors',
  },
  {
    id: 4,
    title: 'Financial Analytics API',
    category: 'Back-End',
    description: 'High-performance API processing millions of transactions with real-time insights.',
    image: '/projects/finance.jpg',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker'],
    color: 'from-zinc-900 via-slate-900 to-gray-900',
    client: 'FinTech Innovations',
    result: '99.99% uptime, 200ms avg response time',
  },
  {
    id: 5,
    title: 'Social Media Dashboard',
    category: 'Full-Stack',
    description: 'Unified platform for managing multiple social media accounts with AI-powered insights.',
    image: '/projects/social.jpg',
    tags: ['React', 'Node.js', 'MongoDB', 'OpenAI', 'WebSockets'],
    color: 'from-slate-900 via-cyan-950 to-slate-900',
    client: 'SocialBuzz Agency',
    link: 'https://buffer.com',
    result: '3x improvement in content scheduling',
  },
  {
    id: 6,
    title: 'Learning Management System',
    category: 'Full-Stack',
    description: 'Interactive e-learning platform with video streaming and progress tracking.',
    image: '/projects/lms.jpg',
    tags: ['Next.js', 'AWS', 'PostgreSQL', 'FFmpeg', 'Stripe'],
    color: 'from-gray-900 via-slate-900 to-zinc-900',
    client: 'EduTech Pro',
    link: 'https://www.udemy.com',
    result: '85% course completion rate',
  },
];
