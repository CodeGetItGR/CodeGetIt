import type { ReactNode } from 'react';

interface HeroMockupFrameProps {
    children: ReactNode;
    activeIndex: number;
}

const urls = ['padoliving.com', 'analytics.codegetit.dev', 'bookings.codegetit.dev'];

export function HeroMockupFrame({ children, activeIndex }: HeroMockupFrameProps) {
    return (
        <div className="relative mx-auto w-full max-w-100 lg:w-130">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-slate-900/90 pb-1 shadow-2xl backdrop-blur-xl">
                {/* Browser top bar */}
                <div className="flex items-center gap-3 border-b border-white/6 bg-slate-900/95 px-4 py-3">
                    <div className="flex items-center gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>

                    <div className="flex-1 rounded-xl border border-white/6 bg-slate-800/70 px-4 py-2 text-xs text-slate-500">
                        {urls[activeIndex] ?? urls[0]}
                    </div>
                </div>

                {/* Screen content */}
                <div className="relative aspect-3/4 overflow-hidden bg-[#12182d]">{children}</div>
            </div>

            {/* Pado Living credit — only shown on tab 0 */}
            {activeIndex === 0 && (
                <div className="mt-3 flex items-center justify-between px-1">
                    <p className="text-xs text-slate-600">Featured project</p>
                    <a
                        href="https://padoliving.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-cyan-600 transition-colors hover:text-cyan-400"
                    >
                        padoliving.com ↗
                    </a>
                </div>
            )}
        </div>
    );
}
