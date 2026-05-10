import { motion } from 'framer-motion';
import { Check, Clock } from 'lucide-react';

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, delay },
});

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const dates = [5, 6, 7, 8, 9, 10, 11];
const todayIndex = 3;

const appointments = [
    {
        time: '09:00',
        duration: '45 min',
        client: 'Sarah Johnson',
        type: 'Initial consultation',
        status: 'confirmed',
    },
    {
        time: '11:30',
        duration: '30 min',
        client: 'Michael Chen',
        type: 'Follow-up review',
        status: 'confirmed',
    },
    {
        time: '14:00',
        duration: '60 min',
        client: 'Emma Wilson',
        type: 'Strategy session',
        status: 'pending',
    },
];

const statusColors: Record<string, string> = {
    confirmed: 'text-emerald-400',
    pending: 'text-amber-400',
};

const statusLabels: Record<string, string> = {
    confirmed: 'Confirmed',
    pending: 'Pending',
};

export function BookingScreen() {
    return (
        <div className="flex h-full flex-col overflow-hidden bg-[#0d1220]">
            {/* Header */}
            <motion.div {...fadeUp(0)} className="flex shrink-0 items-center justify-between border-b border-white/6 px-4 py-2.5">
                <div>
                    <p className="text-xs font-semibold text-white">Appointments</p>
                    <p className="text-[9px] text-slate-500">Thursday, 8 May</p>
                </div>
                <button className="rounded-lg bg-cyan-400 px-3 py-1.5 text-[9px] font-semibold text-slate-950">+ New booking</button>
            </motion.div>

            {/* Week strip */}
            <motion.div {...fadeUp(0.06)} className="flex shrink-0 items-center justify-between border-b border-white/6 px-3 py-2">
                {days.map((d, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                        <span className="text-[8px] text-slate-600">{d}</span>
                        <div
                            className={[
                                'flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-medium',
                                i === todayIndex ? 'bg-cyan-400 text-slate-950' : 'text-slate-400',
                            ].join(' ')}
                        >
                            {dates[i]}
                        </div>
                        {/* appointment dot */}
                        {[0, 1, 2].includes(i) && (
                            <div className={['h-1 w-1 rounded-full', i === todayIndex ? 'bg-cyan-400' : 'bg-slate-600'].join(' ')} />
                        )}
                        {![0, 1, 2].includes(i) && <div className="h-1 w-1" />}
                    </div>
                ))}
            </motion.div>

            {/* Stats row */}
            <motion.div {...fadeUp(0.1)} className="grid shrink-0 grid-cols-3 gap-px border-b border-white/6 bg-white/6">
                {[
                    { label: "Today's bookings", value: '3' },
                    { label: 'Completion rate', value: '94%' },
                    { label: 'Avg. duration', value: '45 min' },
                ].map((s) => (
                    <div key={s.label} className="flex flex-col gap-0.5 bg-[#0d1220] px-3 py-2">
                        <p className="text-[8px] text-slate-500">{s.label}</p>
                        <p className="text-sm font-bold text-white">{s.value}</p>
                    </div>
                ))}
            </motion.div>

            {/* Schedule */}
            <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden px-3 py-3">
                <div className="mb-1 flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-slate-600" />
                    <p className="text-[8px] font-medium tracking-wider text-slate-600 uppercase">Today's schedule</p>
                </div>
                {appointments.map((apt, i) => (
                    <motion.div
                        key={apt.client}
                        {...fadeUp(0.15 + i * 0.06)}
                        className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/3 px-3 py-2.5"
                    >
                        {/* Time col */}
                        <div className="w-10 shrink-0 text-right">
                            <p className="text-[10px] font-semibold text-slate-300">{apt.time}</p>
                            <p className="text-[8px] text-slate-600">{apt.duration}</p>
                        </div>

                        {/* Divider */}
                        <div className="h-8 w-px shrink-0 bg-white/8" />

                        {/* Info */}
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-[10px] font-medium text-white">{apt.client}</p>
                            <p className="truncate text-[8px] text-slate-500">{apt.type}</p>
                        </div>

                        {/* Status */}
                        <div className={['flex shrink-0 items-center gap-1 text-[8px] font-medium', statusColors[apt.status]].join(' ')}>
                            {apt.status === 'confirmed' && <Check className="h-2.5 w-2.5" />}
                            {statusLabels[apt.status]}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
