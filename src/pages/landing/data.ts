export type Stat = {
  value: number;
  label: string;
  suffix?: string;
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  color: string;
};

export const stats: Stat[] = [
  { value: 150, label: 'Projects Delivered', suffix: '+' },
  { value: 98, label: 'Client Satisfaction', suffix: '%' },
  { value: 50, label: 'Happy Clients', suffix: '+' },
  { value: 5, label: 'Years Experience', suffix: '+' },
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
];

