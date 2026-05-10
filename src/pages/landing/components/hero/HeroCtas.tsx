import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {useLocale} from "@/i18n/UseLocale.tsx";
import {useMemo} from "react";

export function HeroCtas() {
  const { t } = useLocale();
  const ctaTokens = useMemo(() => t.landing.hero.ctas, [t.landing.hero.ctas])

  return (
      <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className={'hidden lg:block'}
      >
        {/* Intro */}
        <div className="mb-6">
          <div className="mb-2 text-sm font-medium text-cyan-400">
            Ready to launch?
          </div>

          <p className="text-sm leading-relaxed text-slate-400">
            {ctaTokens.note}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-[#0f1729] shadow-lg shadow-cyan-400/25 transition-all sm:w-auto sm:px-8"
          >
            {ctaTokens.primary}

            <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2.5}
            />
          </motion.a>

          {/*<a*/}
          {/*    href="#projects"*/}
          {/*    className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-700 bg-slate-800/50 px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-slate-800 sm:w-auto sm:px-8"*/}
          {/*>*/}
          {/*  {ctaTokens.secondary}*/}
          {/*</a>*/}
        </div>
      </motion.div>
  );
}