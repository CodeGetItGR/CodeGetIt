import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  LuBell,
  LuCalendarDays,
  LuClock3,
  LuHeart,
  LuPackage,
  LuShoppingBag,
  LuSparkles,
  LuStore,
  LuTrendingUp,
  LuUserRound,
  LuUsers,
} from 'react-icons/lu';

export type ServiceId = 'business' | 'portfolio' | 'shop' | 'booking';

type Stat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  tone: string;
};

type Variant = {
  url: string;
  appName: string;
  appTag: string;
  Icon: IconType;
  chartLabel: string;
  chartDelta: string;
  bars: number[];
  stats: [Stat, Stat, Stat];
  rowIcon: IconType;
  floatTopLabel: string;
  floatTopValue: string;
  FloatTopIcon: IconType;
  floatBottomLabel: string;
  floatBottomValue: string;
  ping: { icon: IconType; title: string; sub: string };
};

const VARIANTS: Record<ServiceId, Variant> = {
  business: {
    url: 'bloomcafe.com',
    appName: 'Bloom Cafe',
    appTag: 'Local business',
    Icon: LuStore,
    chartLabel: 'Visits this month',
    chartDelta: '+18.4%',
    bars: [35, 55, 40, 70, 50, 85, 65, 90, 75, 95, 80, 60],
    stats: [
      { label: 'Visits', value: 8420, tone: 'text-cyan-200' },
      { label: 'Calls', value: 312, tone: 'text-slate-100' },
      { label: 'Reviews', value: 4.9, suffix: '*', decimals: 1, tone: 'text-cyan-300' },
    ],
    rowIcon: LuUsers,
    floatTopLabel: 'New visitors',
    floatTopValue: '+1,284 today',
    FloatTopIcon: LuUsers,
    floatBottomLabel: 'Time to launch',
    floatBottomValue: '2 weeks',
    ping: { icon: LuBell, title: 'New visitor from Google', sub: 'just now' },
  },
  portfolio: {
    url: 'studiovesta.co',
    appName: 'Studio Vesta',
    appTag: 'Portfolio',
    Icon: LuUserRound,
    chartLabel: 'Profile views',
    chartDelta: '+32.7%',
    bars: [25, 45, 35, 60, 55, 75, 70, 85, 80, 90, 95, 88],
    stats: [
      { label: 'Projects', value: 24, tone: 'text-cyan-200' },
      { label: 'Likes', value: 3.2, suffix: 'k', decimals: 1, tone: 'text-slate-100' },
      { label: 'Inquiries', value: 18, prefix: '+', tone: 'text-cyan-300' },
    ],
    rowIcon: LuHeart,
    floatTopLabel: 'Profile views',
    floatTopValue: '+842 this week',
    FloatTopIcon: LuHeart,
    floatBottomLabel: 'Featured on',
    floatBottomValue: 'Awwwards',
    ping: { icon: LuHeart, title: 'Someone loved your work', sub: '2s ago' },
  },
  shop: {
    url: 'shopvelvet.com',
    appName: 'Velvet Goods',
    appTag: 'Online shop',
    Icon: LuShoppingBag,
    chartLabel: 'Revenue last 12 wks',
    chartDelta: '+24.1%',
    bars: [40, 50, 45, 65, 60, 80, 70, 88, 85, 92, 78, 95],
    stats: [
      { label: 'Revenue', value: 48.2, prefix: '$', suffix: 'k', decimals: 1, tone: 'text-cyan-200' },
      { label: 'Orders', value: 1284, tone: 'text-slate-100' },
      { label: 'AOV', value: 37, prefix: '$', tone: 'text-cyan-300' },
    ],
    rowIcon: LuPackage,
    floatTopLabel: 'Orders today',
    floatTopValue: '+126 sales',
    FloatTopIcon: LuPackage,
    floatBottomLabel: 'Conversion',
    floatBottomValue: '3.8%',
    ping: { icon: LuShoppingBag, title: 'New order - $84', sub: 'just now' },
  },
  booking: {
    url: 'bookwith.me',
    appName: 'Calm Studio',
    appTag: 'Booking page',
    Icon: LuCalendarDays,
    chartLabel: 'Bookings this month',
    chartDelta: '+41.2%',
    bars: [20, 35, 50, 45, 65, 60, 75, 85, 70, 90, 88, 95],
    stats: [
      { label: 'Booked', value: 248, tone: 'text-cyan-200' },
      { label: 'Leads', value: 612, tone: 'text-slate-100' },
      { label: 'No-show', value: 2.1, suffix: '%', decimals: 1, tone: 'text-cyan-300' },
    ],
    rowIcon: LuClock3,
    floatTopLabel: 'Bookings',
    floatTopValue: '+38 this week',
    FloatTopIcon: LuCalendarDays,
    floatBottomLabel: 'Avg. response',
    floatBottomValue: '< 2 min',
    ping: { icon: LuCalendarDays, title: 'New booking confirmed', sub: 'just now' },
  },
};

const useCountUp = (target: number, duration = 900, deps: unknown[] = []) => {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const from = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (target - from) * eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return value;
};

const formatNum = (n: number, decimals = 0) => {
  if (decimals > 0) {
    return n.toFixed(decimals);
  }
  return Math.round(n).toLocaleString('en-US');
};

function StatCounter({ stat, variant }: { stat: Stat; variant: ServiceId }) {
  const value = useCountUp(stat.value, 900, [variant, stat.label]);

  return (
    <div className={`text-sm font-semibold tabular-nums ${stat.tone}`}>
      {stat.prefix ?? ''}
      {formatNum(value, stat.decimals ?? 0)}
      {stat.suffix ?? ''}
    </div>
  );
}

function TypingUrl({ url }: { url: string }) {
  const [text, setText] = useState('');

  useEffect(() => {
    setText('');
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setText(url.slice(0, i));
      if (i >= url.length) {
        window.clearInterval(id);
      }
    }, 35);

    return () => window.clearInterval(id);
  }, [url]);

  return (
    <span className="font-mono">
      {text}
      <span className="ml-0.5 inline-block h-3 w-px align-middle bg-cyan-300 animate-pulse" />
    </span>
  );
}

interface Props {
  variant?: ServiceId;
}

export function CodeWindow({ variant = 'business' }: Props) {
  const v = VARIANTS[variant];
  const { Icon, FloatTopIcon, rowIcon: RowIcon } = v;
  const PingIcon = v.ping.icon;
  const [pingKey, setPingKey] = useState(0);
  const [pingVisible, setPingVisible] = useState(false);

  useEffect(() => {
    setPingKey((k) => k + 1);
    setPingVisible(true);
    const id = window.setTimeout(() => setPingVisible(false), 2800);
    return () => window.clearTimeout(id);
  }, [variant]);

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-8 rounded-full bg-cyan-300/20 blur-3xl" aria-hidden />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1230]/95 shadow-[0_24px_80px_rgba(2,6,23,0.55)] backdrop-blur-xl transition-all duration-500">
        <div className="flex items-center gap-3 border-b border-white/10 bg-white/5 px-5 py-3.5">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-400/80" />
            <span className="h-3 w-3 rounded-full bg-amber-300/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          </div>

          <div className="flex flex-1 justify-center">
            <div className="min-w-[160px] rounded-md border border-white/10 bg-white/5 px-3 py-1 text-center text-xs text-slate-400">
              <TypingUrl url={v.url} />
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-cyan-200/80">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-300 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-300" />
            </span>
            <span className="hidden font-mono sm:inline">live</span>
          </div>
        </div>

        <div key={`body-${variant}`} className="space-y-4 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-300/15">
                <Icon className="h-4 w-4 text-cyan-200" />
              </div>
              <div>
                <div className="font-semibold leading-tight text-white">{v.appName}</div>
                <div className="mt-0.5 text-[10px] uppercase tracking-widest text-slate-400">
                  {v.appTag}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="h-2 w-8 rounded-full bg-white/10" />
              <div className="h-2 w-8 rounded-full bg-white/10" />
              <div className="h-2 w-8 rounded-full bg-cyan-300/30" />
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LuTrendingUp className="h-3.5 w-3.5 text-cyan-300" />
                <span className="text-xs font-medium text-slate-400">{v.chartLabel}</span>
              </div>
              <span className="text-xs font-mono text-cyan-300">{v.chartDelta}</span>
            </div>

            <div className="flex h-24 items-end gap-1.5">
              {v.bars.map((height, index) => (
                <motion.div
                  key={`${variant}-${index}`}
                  className="flex-1 rounded-sm bg-gradient-to-t from-cyan-300/70 to-cyan-300/20"
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {v.stats.map((stat) => (
              <div key={`${variant}-${stat.label}`} className="rounded-lg border border-white/10 bg-white/5 p-3">
                <div className="mb-1 text-[10px] uppercase tracking-widest text-slate-400">{stat.label}</div>
                <StatCounter stat={stat} variant={variant} />
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-1">
            {[0, 1, 2].map((index) => (
              <div key={`${variant}-row-${index}`} className="flex items-center gap-3 py-1.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-cyan-300/10">
                  <RowIcon className="h-3 w-3 text-cyan-200/80" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
                  <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
                </div>
                <div className="h-1.5 w-10 rounded-full bg-cyan-300/20" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {pingVisible && (
        <div key={pingKey} className="absolute top-16 -right-4 z-20 sm:-right-8">
          <div className="flex max-w-[220px] items-center gap-2.5 rounded-xl border border-white/10 bg-white/10 px-3.5 py-2.5 shadow-[0_18px_48px_rgba(2,6,23,0.35)] backdrop-blur-xl">
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-300/15">
              <PingIcon className="h-4 w-4 text-cyan-200" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-300 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
              </span>
            </div>
            <div className="min-w-0">
              <div className="truncate text-[11px] font-semibold text-white">{v.ping.title}</div>
              <div className="text-[10px] font-mono text-slate-400">{v.ping.sub}</div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute -top-6 -left-10 hidden animate-bounce md:block">
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 shadow-[0_14px_40px_rgba(2,6,23,0.25)] backdrop-blur-xl">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-300/15">
            <FloatTopIcon className="h-4 w-4 text-cyan-200" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              {v.floatTopLabel}
            </div>
            <div className="mt-0.5 text-sm font-semibold text-white">{v.floatTopValue}</div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-8 -right-6 hidden md:block" style={{ animationDelay: '1.5s' }}>
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 shadow-[0_14px_40px_rgba(2,6,23,0.25)] backdrop-blur-xl">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
            {v.floatBottomLabel}
          </div>
          <div className="mt-0.5 text-sm font-semibold text-cyan-200">{v.floatBottomValue}</div>
        </div>
      </div>

      <div className="absolute top-1/2 -right-12 hidden lg:block">
        <div className="rounded-full border border-white/10 bg-white/5 p-3 shadow-[0_0_30px_rgba(34,211,238,0.15)] backdrop-blur-xl">
          <LuSparkles className="h-5 w-5 text-cyan-300" />
        </div>
      </div>
    </div>
  );
}
