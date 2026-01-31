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
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    color: 'from-gray-800 to-gray-900',
    client: 'TechRetail Co.',
    result: '37% increase in checkout conversions',
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
    result: 'Reduced booking time by 60%',
  },
];
