import { HiCode, HiUsers, HiLightningBolt, HiTrendingUp, HiStar, HiClock } from 'react-icons/hi';

export interface Stat {
  icon: React.ElementType;
  value: string;
  label: string;
  color: string;
}

export const heroStats: Stat[] = [
  {
    icon: HiCode,
    value: '15+',
    label: 'Projects',
    color: 'from-gray-700 to-gray-900',
  },
  {
    icon: HiUsers,
    value: '10+',
    label: 'Clients',
    color: 'from-gray-800 to-black',
  },
  {
    icon: HiLightningBolt,
    value: '100%',
    label: 'Quality',
    color: 'from-gray-600 to-gray-800',
  },
];

// Alternative stats you can use:
export const alternativeStats: Stat[] = [
  {
    icon: HiTrendingUp,
    value: '2+',
    label: 'Years',
    color: 'from-gray-700 to-gray-900',
  },
  {
    icon: HiStar,
    value: '5.0',
    label: 'Rating',
    color: 'from-gray-800 to-black',
  },
  {
    icon: HiClock,
    value: 'Fast',
    label: 'Delivery',
    color: 'from-gray-600 to-gray-800',
  },
];
