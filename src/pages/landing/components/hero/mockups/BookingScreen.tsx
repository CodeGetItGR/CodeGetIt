import { Calendar, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const appointments = [
  {
    name: 'Sarah Johnson',
    time: '09:00 AM',
  },
  {
    name: 'Michael Chen',
    time: '11:30 AM',
  },
  {
    name: 'Emma Wilson',
    time: '02:00 PM',
  },
];

export function BookingScreen() {
  return (
      <div className="flex h-full overflow-hidden">
        {/* Sidebar */}
        <div className="flex w-14 shrink-0 flex-col items-center gap-3 border-r border-white/6 bg-slate-900/50 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
            <Calendar className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/[0.04]">
            <Users className="h-4 w-4 text-slate-500" />
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/[0.04]">
            <Clock className="h-4 w-4 text-slate-500" />
          </div>
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col p-4">
          {/* Header */}
          <div className="mb-4 flex shrink-0 items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-white">Appointment Schedule</h3>
              <p className="mt-0.5 text-xs text-slate-400">Manage meetings & bookings</p>
            </div>
            <button className="rounded-xl bg-cyan-400 px-3 py-1.5 text-xs font-semibold text-[#0f1729]">
              New Booking
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="mb-4 grid shrink-0 grid-cols-7 gap-1.5">
            {Array.from({ length: 21 }).map((_, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.01 }}
                    className={[
                      'flex aspect-square items-center justify-center rounded-xl text-xs',
                      index === 12
                          ? 'bg-cyan-400 font-bold text-[#0f1729]'
                          : 'border border-white/6 bg-white/[0.03] text-slate-300',
                    ].join(' ')}
                >
                  {index + 1}
                </motion.div>
            ))}
          </div>

          {/* Appointments — flex-1 so they fill the rest */}
          <div className="flex min-h-0 flex-1 flex-col justify-end gap-2">
            {appointments.map((appointment, index) => (
                <motion.div
                    key={appointment.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-center justify-between rounded-2xl border border-white/6 bg-white/[0.03] px-3 py-2.5"
                >
                  <div>
                    <div className="text-sm font-medium text-white">{appointment.name}</div>
                    <div className="mt-0.5 text-xs text-slate-500">Consultation call</div>
                  </div>
                  <div className="text-xs text-slate-400">{appointment.time}</div>
                </motion.div>
            ))}
          </div>
        </div>
      </div>
  );
}