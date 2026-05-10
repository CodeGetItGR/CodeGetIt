import { AnimatePresence, motion } from 'framer-motion';

import { HeroCtas, HeroMockupDescription, HeroMockupStage } from './index';

import { useLocale } from '@/i18n/UseLocale.tsx';
import { useMemo } from 'react';
import { cn } from '@/lib/utils.ts';

interface HeroConversationProps {
    activeIndex: number | null;
    onSelect: (index: number) => void;
}

export function HeroConversation({ activeIndex, onSelect }: HeroConversationProps) {
    const { t } = useLocale();
    const active = activeIndex ?? 0;
    const conversationTokens = useMemo(() => t.landing.hero.conversation, [t]);
    const mockups = useMemo(() => t.landing.hero.mockups, [t]);
    const selected = conversationTokens.options[active];

    return (
        <div className="relative overflow-hidden p-5 sm:p-7 lg:p-8">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3">
                <div className="col-span-1 flex flex-col gap-6 sm:gap-8 lg:col-span-2">
                    {/* AI INTRO */}
                    <div className="max-w-2xl">
                        <div className="mb-3 flex items-center gap-3">
                            <div>
                                <p className="text-sm font-medium text-white">CodeGetIt</p>
                            </div>
                        </div>

                        <div className="rounded-3xl rounded-tl-md border border-white/6 bg-slate-950/40 px-5 py-4">
                            <p className="text-[1rem] leading-7 text-slate-200">{conversationTokens.intro}</p>
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
                                    className={cn(
                                        'group relative overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all duration-500',
                                        'backdrop-blur-xl',
                                        'before:absolute before:inset-0 before:rounded-2xl before:opacity-0 before:transition-opacity before:duration-500',
                                        'hover:-translate-y-0.5 hover:scale-[1.01]',
                                        activeState
                                            ? [
                                                  'border-cyan-400/30 bg-white/8',
                                                  'shadow-[0_0_40px_rgba(34,211,238,0.12)]',
                                                  'before:bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_70%)]',
                                                  'before:opacity-100',
                                              ]
                                            : [
                                                  'border-white/10 bg-white/3',
                                                  'hover:border-white/20 hover:bg-white/5',
                                                  'hover:shadow-[0_0_30px_rgba(255,255,255,0.04)]',
                                              ]
                                    )}
                                >
                                    {/* top glow line */}
                                    <div
                                        className={cn(
                                            'absolute inset-x-0 top-0 h-px transition-opacity duration-500',
                                            activeState
                                                ? 'bg-linear-to-r from-transparent via-cyan-300/80 to-transparent opacity-100'
                                                : 'bg-linear-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100'
                                        )}
                                    />

                                    {/* ambient glow */}
                                    <div
                                        className={cn(
                                            'absolute -top-10 -right-10 h-28 w-28 rounded-full blur-3xl transition-all duration-500',
                                            activeState ? 'bg-cyan-400/20 opacity-100' : 'bg-white/5 opacity-0 group-hover:opacity-100'
                                        )}
                                    />

                                    <div className="relative z-10 flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={cn(
                                                    'h-2 w-2 rounded-full transition-all duration-300',
                                                    activeState
                                                        ? 'bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]'
                                                        : 'bg-slate-600 group-hover:bg-slate-400'
                                                )}
                                            />
                                            <span
                                                className={cn(
                                                    'text-sm font-semibold tracking-tight transition-colors duration-300',
                                                    activeState ? 'text-cyan-50' : 'text-slate-100'
                                                )}
                                            >
                                                {option.label}
                                            </span>
                                        </div>

                                        <span
                                            className={cn(
                                                'mt-2 pl-4 text-xs leading-relaxed transition-colors duration-300',
                                                activeState ? 'text-cyan-100/70' : 'text-slate-500'
                                            )}
                                        >
                                            {option.helper}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* TEXT RESPONSE */}
                    <div className={'hidden lg:block'}>
                        <h1 className="mb-5 text-[2.4rem] leading-[1.02] font-black text-white lg:text-[3.6rem]">
                            {selected.headline}
                            <span className="block bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                                {selected.highlight}
                            </span>
                        </h1>

                        <p className="max-w-[56ch] text-[1rem] leading-8 text-slate-400">{selected.description}</p>
                    </div>

                    <HeroCtas />
                </div>

                <div className={'mt-10 flex-1 lg:mt-0'}>
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
                                <HeroMockupStage activeIndex={active} />
                                <div className="mt-5">
                                    <HeroMockupDescription description={mockups.descriptions[active]} />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
