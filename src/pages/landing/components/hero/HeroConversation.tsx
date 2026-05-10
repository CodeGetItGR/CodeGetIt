import { AnimatePresence, motion } from 'framer-motion';

import {
    HeroCtas,
    HeroMockupDescription,
    HeroMockupStage,
} from './index';

import {useLocale} from "@/i18n/UseLocale.tsx";
import {useMemo} from "react";

interface HeroConversationProps {
    activeIndex: number | null;
    onSelect: (index: number) => void;
}

export function HeroConversation({ activeIndex, onSelect}: HeroConversationProps) {
    const { t } = useLocale();
    const active = activeIndex ?? 0;
    const conversationTokens = useMemo(() => t.landing.hero.conversation, [t])
    const mockups = useMemo(() => t.landing.hero.mockups, [t])
    const selected = conversationTokens.options[active];

    return (
        <div className="relative overflow-hidden rounded-[2rem] bg-white/1 p-5 sm:p-7 lg:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_55%)]" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3">
                <div className="flex flex-col gap-6 sm:gap-8 col-span-1 lg:col-span-2">
                    {/* AI INTRO */}
                    <div className="max-w-2xl">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-sm font-semibold text-cyan-300">
                                AI
                            </div>

                            <div>
                                <p className="text-sm font-medium text-white">CodeGetIt</p>
                                <p className="text-xs text-slate-500">
                                    Software planning assistant
                                </p>
                            </div>
                        </div>

                        <div className="rounded-3xl rounded-tl-md border border-white/6 bg-slate-950/40 px-5 py-4">
                            <p className="text-[1rem] leading-7 text-slate-200">
                                {conversationTokens.intro}
                            </p>
                        </div>
                    </div>

                    {/* OPTIONS */}
                    <div className="grid gap-3 sm:flex sm:flex-wrap">
                        {conversationTokens.options.map((option, index) => {
                            const activeState = activeIndex === index;
                            return (
                                <button
                                    key={option.id}
                                    onClick={() => onSelect(index)}
                                    className={[
                                        'w-full rounded-2xl border p-4 text-left transition-all duration-300 sm:w-auto',
                                        activeState
                                            ? 'border-cyan-400/40 bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/10'
                                            : 'border-white/6 bg-white/3 hover:border-white/15 hover:bg-white/5',
                                    ].join(' ')}
                                >
                                    <div className="flex flex-col">
                                        <span className={['text-sm font-semibold', activeState ? 'text-slate-950' : 'text-slate-100',].join(' ')}>
                                          {option.label}
                                        </span>

                                        <span className={['mt-1 text-xs', activeState ? 'text-slate-800' : 'text-slate-500'].join(' ')}>
                                          {option.helper}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>


                    {/* TEXT RESPONSE */}
                    <div className={'hidden lg:block'}>
                        <h1 className="mb-5 text-[2.4rem] font-black leading-[1.02] text-white lg:text-[3.6rem]">
                            {selected.headline}
                            <span className="block bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                              {selected.highlight}
                            </span>
                        </h1>

                        <p className="max-w-[56ch] text-[1rem] leading-8 text-slate-400">
                            {selected.description}
                        </p>
                    </div>

                    <HeroCtas/>
                </div>

                <div className={'mt-10 lg:mt-0 flex-1'}>
                    {/* RESPONSE + MOCKUP (CORE EXPERIENCE) */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -14 }}
                            transition={{ duration: 0.45 }}
                            className="gap-10"
                        >

                            {/* MOCKUP */}
                            <div>
                                <HeroMockupStage activeIndex={active}/>
                                <div className="mt-5">
                                    <HeroMockupDescription description={mockups.descriptions[active]}/>
                                </div>
                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}