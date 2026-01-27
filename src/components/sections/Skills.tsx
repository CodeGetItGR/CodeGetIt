import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section } from '@/components/ui/Section';
import { Progress } from '@/components/ui/progress';
import { skills, type Skill } from '@/data/skills';
import { useLocale } from '@/i18n/UseLocale';

const SkillBar = ({ skill, index }: { skill: Skill; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-body font-semibold text-gray-900">{skill.name}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.05 + 0.3 }}
          className="text-body-sm text-gray-600 font-medium"
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="relative">
        <Progress
          value={isInView ? skill.level : 0}
          className="h-2 bg-gray-200"
        />
      </div>
    </motion.div>
  );
};

export const Skills = () => {
  const { t } = useLocale();

  const categories = {
    frontend: skills.filter(s => s.category === 'frontend'),
    backend: skills.filter(s => s.category === 'backend'),
    database: skills.filter(s => s.category === 'database'),
    tools: skills.filter(s => s.category === 'tools'),
  };

  return (
    <Section id="skills" className="bg-white">
      <div className="max-w-360 mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-gray-900 text-white text-label rounded-full mb-6"
          >
            {t.skills.badge.toUpperCase()}
          </motion.span>
          <h2 className="text-headline-lg md:text-display-sm mb-6">
            {t.skills.title}
          </h2>
          <p className="text-body-lg text-gray-600 max-w-2xl mx-auto">
            {t.skills.subtitle}
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Frontend */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 bg-linear-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl hover:border-gray-900 transition-all duration-300 elegant-shadow"
          >
            <h3 className="text-title-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center text-white text-body">
                FE
              </div>
              {t.skills.frontend}
            </h3>
            <div className="space-y-6">
              {categories.frontend.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Backend */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 bg-linear-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl hover:border-gray-900 transition-all duration-300 elegant-shadow"
          >
            <h3 className="text-title-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center text-white text-body">
                BE
              </div>
              {t.skills.backend}
            </h3>
            <div className="space-y-6">
              {categories.backend.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Database */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 bg-linear-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl hover:border-gray-900 transition-all duration-300 elegant-shadow"
          >
            <h3 className="text-title-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center text-white text-body">
                DB
              </div>
              {t.skills.database}
            </h3>
            <div className="space-y-6">
              {categories.database.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 bg-linear-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl hover:border-gray-900 transition-all duration-300 elegant-shadow"
          >
            <h3 className="text-title-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center text-white text-body">
                TL
              </div>
              {t.skills.tools}
            </h3>
            <div className="space-y-6">
              {categories.tools.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};
