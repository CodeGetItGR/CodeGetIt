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
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Full-Stack',
    description: 'Modern shopping experience with seamless checkout and real-time inventory management.',
    image: '/projects/ecommerce.jpg',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    color: 'from-gray-800 to-gray-900',
    client: 'TechRetail Co.',
  },
  {
    id: 2,
    title: 'Restaurant Booking System',
    category: 'Full-Stack',
    description: 'Streamlined reservation platform with table management and customer reviews.',
    image: '/projects/restaurant.jpg',
    tags: ['Next.js', 'PostgreSQL', 'Prisma'],
    color: 'from-gray-700 to-gray-800',
    client: 'Gourmet Dining Group',
  },
  {
    id: 3,
    title: 'Social Media Dashboard',
    category: 'Front-End',
    description: 'Analytics platform for managing multiple social media accounts and campaigns.',
    image: '/projects/social.jpg',
    tags: ['React', 'TypeScript', 'Chart.js', 'Tailwind'],
    color: 'from-gray-600 to-gray-700',
    client: 'Digital Marketing Pro',
  },
  {
    id: 4,
    title: 'Real Estate Portal',
    category: 'Full-Stack',
    description: 'Property listing platform with virtual tours and mortgage calculators.',
    image: '/projects/realestate.jpg',
    tags: ['React', 'Django', 'Maps API', 'PostgreSQL'],
    color: 'from-gray-900 to-black',
    client: 'Urban Properties LLC',
  },
  {
    id: 5,
    title: 'API Gateway Service',
    category: 'Back-End',
    description: 'Microservices architecture with authentication, rate limiting, and load balancing.',
    image: '/projects/api.jpg',
    tags: ['Node.js', 'Express', 'Redis', 'JWT'],
    color: 'from-gray-800 to-black',
    client: 'FinTech Solutions',
  },
  {
    id: 6,
    title: 'Task Management App',
    category: 'Full-Stack',
    description: 'Collaborative project management tool with real-time updates and team features.',
    image: '/projects/taskmanager.jpg',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    color: 'from-gray-700 to-gray-900',
    client: 'ProductivityHub',
  },
];
