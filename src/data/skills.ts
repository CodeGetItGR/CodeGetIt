export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'database' | 'tools';
}

export const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 95, category: 'frontend' },
  { name: 'TypeScript', level: 95, category: 'frontend' },
  { name: 'Tailwind CSS', level: 90, category: 'frontend' },
  { name: 'Vite', level: 85, category: 'frontend' },

  // Backend
  { name: 'Spring Boot', level: 95, category: 'backend' },
  { name: 'Java', level: 95, category: 'backend' },
  { name: 'REST APIs', level: 95, category: 'backend' },
  { name: 'Maven', level: 85, category: 'backend' },

  // Database
  { name: 'PostgreSQL', level: 90, category: 'database' },
  { name: 'MySQL', level: 85, category: 'database' },
  { name: 'H2 Database', level: 80, category: 'database' },

  // Tools
  { name: 'Git', level: 95, category: 'tools' },
  { name: 'IntelliJ IDEA', level: 90, category: 'tools' },
  { name: 'VS Code', level: 90, category: 'tools' },
  { name: 'Postman', level: 85, category: 'tools' },
];
