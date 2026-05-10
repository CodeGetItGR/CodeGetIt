import type {ReactNode} from "react";

interface HeroMockupFrameProps {
    children: ReactNode;
}

export function HeroMockupFrame({ children }: HeroMockupFrameProps) {
    return (
        <div className="relative mx-auto w-full max-w-100 lg:w-130">
            <div  className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-slate-900/90 shadow-2xl backdrop-blur-xl pb-1">
                {/* Browser Top Bar */}
                <div className="flex items-center gap-3 border-b border-white/6 bg-slate-900/95 px-4 py-3">
                    <div className="flex items-center gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-400"/>
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400"/>
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-400"/>
                    </div>

                    <div
                        className="flex-1 rounded-xl border border-white/6 bg-slate-800/70 px-4 py-2 text-xs text-slate-500">
                        app.codegetit.dev
                    </div>
                </div>

                {/* App Content */}
                <div className="relative aspect-3/4 overflow-hidden bg-[#12182d]">
                    {children}
                </div>
            </div>
        </div>
    );
}