import { motion } from 'framer-motion';
import { useLocale } from '@/i18n/UseLocale.tsx';

export function HeroBenefits() {
    const { t } = useLocale();

    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="grid gap-4 sm:grid-cols-2"
        >
            {t.landing.hero.benefits.map((benefit) => (
                <div
                    key={benefit.title}
                    className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-sm transition-all hover:border-cyan-400/30 hover:bg-slate-900/70"
                >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10">
                        <div className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                    </div>

                    <h3 className="mb-2 font-semibold text-white">{benefit.title}</h3>

                    <p className="text-sm leading-relaxed text-slate-400">{benefit.description}</p>
                </div>
            ))}
        </motion.div>
    );
}
