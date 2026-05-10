import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, delay },
});

const stats = [
    { label: 'Revenue', value: '$45.2K', change: '+12.5%', positive: true },
    { label: 'Active users', value: '8,282', change: '+23.1%', positive: true },
    { label: 'Orders', value: '1,423', change: '+18.2%', positive: true },
    { label: 'Conversion', value: '3.8%', change: '+0.6pp', positive: true },
];

const chartHeights = [38, 52, 44, 62, 58, 70, 68, 80, 76, 88, 84, 100];

const tableRows = [
    { source: 'Organic search', sessions: '4,821', conv: '4.2%', rev: '$18.4K' },
    { source: 'Direct', sessions: '2,109', conv: '3.9%', rev: '$14.1K' },
    { source: 'Referral', sessions: '1,352', conv: '2.8%', rev: '$8.7K' },
];

export function AnalyticsScreen() {
    return (
        <div className="flex h-full flex-col overflow-hidden bg-[#0d1220]">
            {/* Top bar */}
            <motion.div {...fadeUp(0)} className="flex shrink-0 items-center justify-between border-b border-white/6 px-4 py-2.5">
                <div>
                    <p className="text-xs font-semibold text-white">Business Overview</p>
                    <p className="text-[9px] text-slate-500">Last 30 days · Updated just now</p>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/4 px-2.5 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[9px] text-slate-400">Live</span>
                </div>
            </motion.div>

            {/* KPI row */}
            <motion.div {...fadeUp(0.06)} className="grid shrink-0 grid-cols-4 gap-px border-b border-white/6 bg-white/6">
                {stats.map((s) => (
                    <div key={s.label} className="flex flex-col gap-0.5 bg-[#0d1220] px-3 py-2.5">
                        <p className="text-[8px] text-slate-500">{s.label}</p>
                        <p className="text-sm font-bold text-white">{s.value}</p>
                        <p className="text-[8px] text-emerald-400">{s.change}</p>
                    </div>
                ))}
            </motion.div>

            {/* Chart */}
            <motion.div {...fadeUp(0.12)} className="shrink-0 border-b border-white/6 px-4 py-3">
                <div className="mb-2 flex items-center justify-between">
                    <p className="text-[10px] font-medium text-slate-300">Revenue trend</p>
                    <div className="flex items-center gap-1 text-[9px] text-emerald-400">
                        <TrendingUp className="h-3 w-3" />
                        +18.2% vs prev period
                    </div>
                </div>
                <div className="flex h-14 items-end gap-px">
                    {chartHeights.map((h, i) => (
                        <motion.div
                            key={i}
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 0.18 + i * 0.025, duration: 0.3 }}
                            style={{ height: `${h}%` }}
                            className={['flex-1 origin-bottom rounded-t-sm', i === chartHeights.length - 1 ? 'bg-cyan-400' : 'bg-slate-700'].join(
                                ' '
                            )}
                        />
                    ))}
                </div>
                <div className="mt-1.5 flex justify-between">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                        <span key={m} className="text-[7px] text-slate-600">
                            {m}
                        </span>
                    ))}
                </div>
            </motion.div>

            {/* Traffic table */}
            <motion.div {...fadeUp(0.2)} className="min-h-0 flex-1 overflow-hidden px-4 py-3">
                <p className="mb-2 text-[9px] font-medium tracking-wider text-slate-400 uppercase">Top traffic sources</p>
                <div className="flex flex-col gap-px overflow-hidden rounded-lg border border-white/6">
                    <div className="grid grid-cols-4 bg-white/4 px-3 py-1.5">
                        {['Source', 'Sessions', 'Conv.', 'Revenue'].map((h) => (
                            <span key={h} className="text-[8px] font-medium text-slate-500">
                                {h}
                            </span>
                        ))}
                    </div>
                    {tableRows.map((row, i) => (
                        <motion.div key={row.source} {...fadeUp(0.25 + i * 0.04)} className="grid grid-cols-4 border-t border-white/4 px-3 py-2">
                            <span className="text-[9px] text-slate-300">{row.source}</span>
                            <span className="text-[9px] text-slate-400">{row.sessions}</span>
                            <span className="text-[9px] text-emerald-400">{row.conv}</span>
                            <span className="text-[9px] font-medium text-white">{row.rev}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
