import { DollarSign, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  {
    label: 'Revenue',
    value: '$48.2k',
    change: '+12%',
    icon: DollarSign,
  },
  {
    label: 'Customers',
    value: '1,284',
    change: '+8%',
    icon: Users,
  },
  {
    label: 'Orders',
    value: '392',
    change: '+18%',
    icon: ShoppingCart,
  },
  {
    label: 'Growth',
    value: '24%',
    change: '+6%',
    icon: TrendingUp,
  },
];

const chartHeights = [40, 48, 42, 60, 56, 68, 72, 78, 74, 86, 90, 100];

export function AnalyticsScreen() {
  return (
      <div className="flex h-full flex-col overflow-hidden p-4">
        {/* Header */}
        <div className="mb-4 flex shrink-0 items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-white">Business Overview</h3>
            <p className="mt-0.5 text-xs text-slate-400">Revenue & customer analytics</p>
          </div>
          <div className="h-8 w-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/10" />
        </div>

        {/* Stats Grid */}
        <div className="grid shrink-0 grid-cols-2 gap-2.5">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
                <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="rounded-2xl border border-white/6 bg-white/[0.03] p-3"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <Icon className="h-4 w-4 text-cyan-400" />
                    <span className="text-xs text-emerald-400">{item.change}</span>
                  </div>
                  <div className="text-xl font-bold text-white">{item.value}</div>
                  <div className="mt-0.5 text-xs text-slate-500">{item.label}</div>
                </motion.div>
            );
          })}
        </div>

        {/* Chart — fills remaining height */}
        <div className="mt-4 flex min-h-0 flex-1 flex-col rounded-2xl border border-white/6 bg-white/[0.03] p-3">
          <div className="mb-3 flex shrink-0 items-center justify-between">
            <span className="text-sm font-medium text-white">Monthly Growth</span>
            <div className="flex items-center gap-1 text-xs text-emerald-400">
              <TrendingUp className="h-3 w-3" />
              +18%
            </div>
          </div>
          {/* Chart bars fill the remaining space inside the card */}
          <div className="flex min-h-0 flex-1 items-end gap-1">
            {chartHeights.map((height, index) => (
                <motion.div
                    key={index}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.15 + index * 0.03 }}
                    style={{ height: `${height}%` }}
                    className="flex-1 origin-bottom rounded-t bg-gradient-to-t from-cyan-400 to-blue-500"
                />
            ))}
          </div>
        </div>
      </div>
  );
}