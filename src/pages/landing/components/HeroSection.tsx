import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { ArrowRight, CheckCircle2, Code2, LayoutDashboard, ShieldCheck, Zap } from 'lucide-react';
import { useLocale } from '@/i18n/UseLocale';

function FloatingCard({
  children,
  className,
  delay = 0,
  y = [0, -12, 0],
  duration = 4,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number[];
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
    >
      <motion.div
        animate={{ y }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function BrowserMockup({
  browser,
}: {
  browser: {
    url: string;
    revenueLabel: string;
    revenueValue: string;
    usersLabel: string;
    usersValue: string;
    growthLabel: string;
    growthValue: string;
  };
}) {
  return (
    <motion.div
      className="relative w-full max-w-md"
      initial={{ opacity: 0, y: 40, rotateY: -8 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 1, delay: 0.6 }}
    >
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1230] shadow-2xl shadow-cyan-400/5">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <div className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="mx-4 flex-1">
            <div className="rounded-md bg-white/5 px-3 py-1 text-center text-xs text-gray-500">
              {browser.url}
            </div>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-cyan-400/20">
                <LayoutDashboard className="h-3.5 w-3.5 text-cyan-300" />
              </div>
              <div className="h-2 w-16 rounded bg-white/20" />
            </div>
            <div className="flex gap-3">
              <div className="h-2 w-10 rounded bg-white/10" />
              <div className="h-2 w-10 rounded bg-white/10" />
              <div className="h-2 w-10 rounded bg-white/10" />
            </div>
          </div>

          <motion.div
            className="rounded-lg border border-white/5 bg-white/[0.03] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex h-20 items-end justify-between gap-1.5">
              {[35, 55, 40, 70, 50, 85, 65, 90, 75, 95, 80, 60].map((height, index) => (
                <motion.div
                  key={index}
                  className="flex-1 rounded-sm bg-gradient-to-t from-cyan-300/60 to-cyan-300/20"
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.6, delay: 1.4 + index * 0.06 }}
                />
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: browser.revenueLabel, value: browser.revenueValue, color: '#00d4ff' },
              { label: browser.usersLabel, value: browser.usersValue, color: '#6366f1' },
              { label: browser.growthLabel, value: browser.growthValue, color: '#22c55e' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="rounded-lg border border-white/5 bg-white/[0.03] p-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + index * 0.1 }}
              >
                <div className="mb-1 text-[10px] text-gray-500">{stat.label}</div>
                <div className="text-sm font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-2">
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={item}
                className="flex items-center gap-3 py-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.1 + index * 0.1 }}
              >
                <div className="h-6 w-6 rounded-full bg-white/10" />
                <div className="h-2 flex-1 rounded bg-white/10" />
                <div className="h-2 w-12 rounded bg-white/10" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const { t } = useLocale();
  const hero = t.landing.hero;
  const features = hero.features;
  const headlineWords = hero.titleWords;

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#0a0e27] px-6 py-24 md:py-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(99,102,241,0.14),_transparent_28%),linear-gradient(180deg,_#0a0e27_0%,_#151b3d_55%,_#0a0e27_100%)]" />
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-cyan-400/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[520px] w-[520px] rounded-full bg-indigo-400/10 blur-[120px]" />
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent"
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
          <div>
            <motion.div
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="h-2 w-2 rounded-full bg-cyan-300"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.65, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-cyan-100">{hero.badge}</span>
            </motion.div>

            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
              <span className="flex flex-wrap gap-x-4">
                {headlineWords.map((word, index) => (
                  <motion.span
                    key={word}
                    className="inline-block"
                    initial={{ opacity: 0, y: 40, rotateX: -40 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.2 + index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <motion.span
                className="mt-2 block bg-gradient-to-r from-cyan-300 via-indigo-300 to-cyan-300 bg-[length:200%_auto] bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ animation: 'shimmer 4s ease-in-out infinite' }}
              >
                {hero.highlight}
              </motion.span>
            </h1>

            <motion.p
              className="mt-6 mb-10 max-w-lg text-lg leading-relaxed text-slate-300 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {hero.subtitle}
            </motion.p>

            <motion.div
              className="mb-10 flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.08 }}
                  whileHover={{
                    backgroundColor: 'rgba(56, 189, 248, 0.08)',
                    borderColor: 'rgba(56, 189, 248, 0.3)',
                  }}
                >
                  <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                  <span className="text-sm text-slate-300">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-8 py-4 text-lg font-semibold text-slate-950 transition-transform hover:scale-[1.03]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {hero.ctas.primary}
                <ArrowRight className="h-5 w-5" />
              </motion.a>

              <motion.a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-transparent px-8 py-4 text-lg font-semibold text-white transition-colors hover:border-cyan-300/50 hover:bg-cyan-300/5"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {hero.ctas.secondary}
              </motion.a>
            </motion.div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <FloatingCard
              className="absolute -top-4 -left-4 z-20 lg:left-0"
              delay={1.8}
              y={[0, -8, 0]}
              duration={3.5}
            >
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0d1230]/90 px-4 py-3 shadow-lg shadow-cyan-400/5 backdrop-blur-xl">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20">
                  <ShieldCheck className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">{hero.browser.securityLabel}</div>
                  <div className="text-sm font-semibold text-emerald-300">{hero.browser.securityValue}</div>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard
              className="absolute -bottom-2 -right-2 z-20 lg:right-4"
              delay={2.2}
              y={[0, -10, 0]}
              duration={4.5}
            >
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0d1230]/90 px-4 py-3 shadow-lg shadow-cyan-400/5 backdrop-blur-xl">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/20">
                  <Zap className="h-5 w-5 text-cyan-300" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">{hero.browser.performanceLabel}</div>
                  <div className="text-sm font-semibold text-cyan-300">{hero.browser.performanceValue}</div>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard
              className="absolute top-1/2 -right-6 z-20 lg:-right-2"
              delay={2}
              y={[0, -14, 0]}
              duration={5}
            >
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0d1230]/90 px-4 py-3 shadow-lg shadow-cyan-400/5 backdrop-blur-xl">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/20">
                  <Code2 className="h-5 w-5 text-indigo-300" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">{hero.browser.stackLabel}</div>
                  <div className="text-sm font-semibold text-indigo-300">{hero.browser.stackValue}</div>
                </div>
              </div>
            </FloatingCard>

            <BrowserMockup browser={hero.browser} />
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transform"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/20 pt-2">
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-cyan-300"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }
      `}</style>
    </section>
  );
}
