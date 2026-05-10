import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay },
});

export function PadoLivingScreen() {
    return (
        <div className="flex h-full flex-col overflow-hidden bg-[#f7f4ef]">
            {/* Site nav */}
            <motion.div {...fadeUp(0)} className="flex shrink-0 items-center justify-between border-b border-black/8 bg-white px-4 py-3">
                <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-stone-800">
                        <span className="text-[9px] font-bold text-white">R</span>
                    </div>
                    <span className="text-xs font-semibold tracking-widest text-stone-800 uppercase">Rooms</span>
                </div>
                <div className="flex items-center gap-4">
                    {['Rooms', 'Location', 'Book'].map((item) => (
                        <span key={item} className="text-[10px] text-stone-400">
                            {item}
                        </span>
                    ))}
                </div>
            </motion.div>

            {/* Hero split */}
            <div className="grid min-h-0 flex-1 grid-cols-5">
                {/* Left — image blocks */}
                <motion.div {...fadeUp(0.05)} className="col-span-3 grid grid-rows-2 gap-1 bg-stone-200 p-1">
                    {/* Main image */}
                    <div className="relative overflow-hidden rounded-sm bg-stone-300">
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,#c4b49a_0%,#a89070_100%)]" />
                        {/* Simulated bedding texture */}
                        <div className="absolute right-4 bottom-4 left-4 h-12 rounded-sm bg-white/20" />
                        <div className="absolute bottom-4 left-4 h-8 w-28 rounded-sm bg-white/30" />
                        <div className="absolute top-3 right-3 rounded bg-white/80 px-2 py-0.5 text-[8px] font-medium text-stone-700">
                            Superior Room
                        </div>
                    </div>

                    {/* Two thumbnails */}
                    <div className="grid grid-cols-2 gap-1">
                        <div className="relative overflow-hidden rounded-sm bg-stone-300">
                            <div className="absolute inset-0 bg-[linear-gradient(135deg,#b8c4c8_0%,#8fa0a8_100%)]" />
                            <div className="absolute right-2 bottom-2 left-2 h-6 rounded-sm bg-white/20" />
                        </div>
                        <div className="relative overflow-hidden rounded-sm bg-stone-300">
                            <div className="absolute inset-0 bg-[linear-gradient(135deg,#c8c4b8_0%,#a8a090_100%)]" />
                            <div className="absolute inset-x-2 top-2 h-8 rounded-sm bg-white/15" />
                        </div>
                    </div>
                </motion.div>

                {/* Right — copy */}
                <motion.div {...fadeUp(0.12)} className="col-span-2 flex flex-col justify-center gap-3 bg-[#faf7f2] px-4 py-5">
                    <h2 className="text-lg leading-tight font-semibold text-stone-900">
                        Welcome to
                        <br />
                        Rooms
                    </h2>

                    <p className="text-[9px] leading-relaxed text-stone-500">
                        A thoughtfully designed retreat. Modern apartments with quality furnishings and private terraces.
                    </p>

                    <div className="flex flex-col gap-1.5">
                        <button className="rounded bg-stone-900 px-3 py-1.5 text-[9px] font-semibold text-white">Explore our rooms</button>
                        <button className="rounded border border-stone-300 px-3 py-1.5 text-[9px] font-medium text-stone-600">View gallery</button>
                    </div>
                </motion.div>
            </div>

            {/* Section teaser — moments under the open sky */}
            <motion.div {...fadeUp(0.2)} className="flex shrink-0 items-center justify-between border-t border-black/6 bg-white px-4 py-2.5">
                <div>
                    <p className="text-[9px] font-semibold text-stone-800">Moments under the open sky</p>
                    <p className="text-[8px] text-stone-400">Outdoor spaces · Gallery</p>
                </div>
                <ExternalLink className="h-3 w-3 text-stone-300" />
            </motion.div>
        </div>
    );
}
