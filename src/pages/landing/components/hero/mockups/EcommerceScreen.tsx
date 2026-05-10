import { Menu, Search, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

export function EcommerceScreen() {
    return (
        <div className="flex h-full flex-col overflow-hidden">
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/6 px-4 py-3">
                <Menu className="h-5 w-5 text-white" />
                <div className="text-sm font-semibold text-white">Nova Store</div>
                <ShoppingCart className="h-5 w-5 text-white" />
            </div>

            {/* Search */}
            <div className="shrink-0 px-4 pt-3 pb-2">
                <div className="flex items-center gap-2 rounded-2xl border border-white/6 bg-white/3 px-3 py-2.5">
                    <Search className="h-4 w-4 text-slate-500" />
                    <span className="text-sm text-slate-500">Search products...</span>
                </div>
            </div>

            {/* Featured */}
            <div className="shrink-0 px-4 py-2">
                <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 p-4">
                    <div className="mb-3 flex items-start justify-between">
                        <div>
                            <div className="mb-1 text-xs text-cyan-400">Featured Product</div>
                            <div className="text-base font-semibold text-white">Wireless Headphones</div>
                            <div className="mt-0.5 text-xl font-bold text-white">$249</div>
                        </div>
                        <div className="h-14 w-14 rounded-2xl bg-white/8" />
                    </div>
                    <button className="w-full rounded-2xl bg-cyan-400 py-2.5 text-sm font-semibold text-[#0f1729]">
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Product Grid — flex-1 fills the rest, overflow-hidden clips it clean */}
            <div className="grid min-h-0 flex-1 grid-cols-2 content-start gap-2.5 overflow-hidden px-4 py-2">
                {Array.from({ length: 4 }).map((_, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04 }}
                        className="rounded-2xl border border-white/6 bg-white/3 p-3"
                    >
                        <div className="mb-2.5 h-16 rounded-xl bg-white/6" />
                        <div className="mb-1.5 h-2.5 rounded bg-white/8" />
                        <div className="h-2.5 w-1/2 rounded bg-white/8" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}