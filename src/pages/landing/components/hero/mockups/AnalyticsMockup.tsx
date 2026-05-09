import { Bell, DollarSign, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnalyticsMockupProps {
  browserUrl: string;
  title: string;
  subtitle: string;
  revenueLabel: string;
  revenueValue: string;
  revenueChange: string;
  usersLabel: string;
  usersValue: string;
  usersChange: string;
  ordersLabel: string;
  ordersValue: string;
  ordersChange: string;
  growthLabel: string;
  growthValue: string;
  growthChange: string;
  chartTitle: string;
  chartTrend: string;
}

const chartHeights = [45, 62, 58, 75, 70, 82, 78, 88, 85, 92, 90, 100];

const stats = [
  { icon: DollarSign, key: 'revenue' },
  { icon: Users, key: 'users' },
  { icon: ShoppingCart, key: 'orders' },
  { icon: TrendingUp, key: 'growth' },
] as const;

export function AnalyticsMockup({
  browserUrl,
  title,
  subtitle,
  revenueLabel,
  revenueValue,
  revenueChange,
  usersLabel,
  usersValue,
  usersChange,
  ordersLabel,
  ordersValue,
  ordersChange,
  growthLabel,
  growthValue,
  growthChange,
  chartTitle,
  chartTrend,
}: AnalyticsMockupProps) {
  const statCopy = {
    revenue: { label: revenueLabel, value: revenueValue, change: revenueChange },
    users: { label: usersLabel, value: usersValue, change: usersChange },
    orders: { label: ordersLabel, value: ordersValue, change: ordersChange },
    growth: { label: growthLabel, value: growthValue, change: growthChange },
  } as const;

  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="relative rounded-xl border border-slate-800 bg-slate-900 p-2 shadow-2xl sm:rounded-2xl sm:p-3">
        <div className="flex items-center gap-2 rounded-t-lg border-b border-slate-700 bg-slate-800/50 px-3 py-2 sm:rounded-t-xl sm:px-4 sm:py-3">
          <div className="flex gap-1.5 sm:gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500 sm:h-3 sm:w-3" />
            <div className="h-2 w-2 rounded-full bg-yellow-500 sm:h-3 sm:w-3" />
            <div className="h-2 w-2 rounded-full bg-green-500 sm:h-3 sm:w-3" />
          </div>
          <div className="mx-2 flex-1 rounded-lg bg-slate-900/50 px-2 py-1 sm:mx-4 sm:px-4 sm:py-1.5">
            <span className="block truncate text-[10px] text-slate-400 sm:text-xs">{browserUrl}</span>
          </div>
        </div>

        <div className="rounded-b-lg bg-[#1a1f37] p-4 aspect-[16/10] sm:rounded-b-xl sm:p-6">
          <div className="mb-4 flex items-center justify-between sm:mb-6">
            <div>
              <h3 className="mb-0.5 text-sm font-semibold text-white sm:mb-1 sm:text-lg">{title}</h3>
              <p className="text-[10px] text-slate-400 sm:text-xs">{subtitle}</p>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Bell className="h-3 w-3 text-slate-400 sm:h-4 sm:w-4" />
              <div className="h-6 w-6 rounded-full border border-cyan-400/30 bg-cyan-400/20 sm:h-8 sm:w-8" />
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-2 sm:mb-6 sm:grid-cols-4 sm:gap-3">
            {stats.map(({ icon: Icon, key }, index) => {
              const item = statCopy[key];

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="rounded-lg border border-slate-800 bg-slate-800/30 p-3 sm:rounded-xl sm:p-4"
                >
                  <div className="mb-1.5 flex items-center justify-between sm:mb-2">
                    <Icon className="h-3 w-3 text-cyan-400 sm:h-4 sm:w-4" />
                    <div className="text-[10px] text-emerald-400 sm:text-xs">{item.change}</div>
                  </div>
                  <div className="mb-0.5 text-base font-bold text-white sm:mb-1 sm:text-xl">{item.value}</div>
                  <div className="text-[10px] text-slate-400 sm:text-xs">{item.label}</div>
                </motion.div>
              );
            })}
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-800/30 p-3 sm:rounded-xl sm:p-4">
            <div className="mb-3 flex items-center justify-between sm:mb-4">
              <span className="text-xs font-medium text-white sm:text-sm">{chartTitle}</span>
              <div className="flex items-center gap-1 text-[10px] text-emerald-400 sm:text-xs">
                <TrendingUp className="h-3 w-3" />
                <span>{chartTrend}</span>
              </div>
            </div>
            <div className="flex h-16 items-end gap-0.5 sm:h-24 sm:gap-1">
              {chartHeights.map((height, index) => (
                <motion.div
                  key={`${browserUrl}-${index}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.2 + index * 0.04, duration: 0.5 }}
                  className="flex-1 rounded-t bg-gradient-to-t from-cyan-400 to-blue-500"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

