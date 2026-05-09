import { Calendar, FileText, Mail, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookingMockupProps {
  statusTime: string;
  title: string;
  subtitle: string;
  action: string;
  daysOfWeek: [string, string, string, string, string, string, string];
  scheduleTitle: string;
  appointments: Array<{
    time: string;
    client: string;
    type: string;
  }>;
}

export function BookingMockup({
  statusTime,
  title,
  subtitle,
  action,
  daysOfWeek,
  scheduleTitle,
  appointments,
}: BookingMockupProps) {
  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="relative rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-2xl sm:rounded-3xl sm:p-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#1a1f37] sm:rounded-2xl">
          <div className="absolute left-0 right-0 top-0 z-10 flex h-8 items-center justify-between px-4 text-[10px] text-white/90 sm:h-10 sm:px-6 sm:text-xs">
            <span>{statusTime}</span>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-3 rounded-sm border border-white/90 sm:h-3 sm:w-4" />
            </div>
          </div>

          <div className="flex h-full pt-8 sm:pt-10">
            <div className="flex w-14 flex-col items-center gap-3 border-r border-slate-800 bg-slate-800/50 py-4 sm:w-20 sm:gap-4 sm:py-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/20 sm:h-10 sm:w-10 sm:rounded-xl">
                <Calendar className="h-4 w-4 text-cyan-400 sm:h-5 sm:w-5" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700/50 sm:h-10 sm:w-10 sm:rounded-xl">
                <Users className="h-4 w-4 text-slate-400 sm:h-5 sm:w-5" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700/50 sm:h-10 sm:w-10 sm:rounded-xl">
                <FileText className="h-4 w-4 text-slate-400 sm:h-5 sm:w-5" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700/50 sm:h-10 sm:w-10 sm:rounded-xl">
                <Mail className="h-4 w-4 text-slate-400 sm:h-5 sm:w-5" />
              </div>
            </div>

            <div className="flex-1 p-3 sm:p-6">
              <div className="mb-4 flex items-center justify-between sm:mb-6">
                <div>
                  <h3 className="mb-0.5 text-sm font-semibold text-white sm:mb-1 sm:text-lg">{title}</h3>
                  <p className="text-[10px] text-slate-400 sm:text-xs">{subtitle}</p>
                </div>
                <button
                  type="button"
                  className="whitespace-nowrap rounded-lg bg-cyan-400 px-2.5 py-1.5 text-[10px] font-semibold text-[#0f1729] sm:px-4 sm:py-2 sm:text-sm"
                >
                  {action}
                </button>
              </div>

              <div className="mb-3 grid grid-cols-7 gap-1 sm:mb-4 sm:gap-2">
                {daysOfWeek.map((day) => (
                  <div key={day} className="py-1 text-center text-[10px] font-medium text-slate-500 sm:py-2 sm:text-xs">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {Array.from({ length: 28 }, (_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.01 }}
                    className={[
                      'flex aspect-square items-center justify-center rounded-md text-[10px] sm:rounded-lg sm:text-sm',
                      index === 14
                        ? 'bg-cyan-400 font-bold text-[#0f1729]'
                        : index === 7 || index === 21
                          ? 'border border-cyan-400/30 bg-cyan-400/20 text-cyan-400'
                          : 'border border-slate-800 bg-slate-800/30 text-slate-300',
                    ].join(' ')}
                  >
                    {index + 1}
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 sm:mt-6">
                <h4 className="mb-2 text-xs font-medium text-white sm:mb-3 sm:text-sm">{scheduleTitle}</h4>
                <div className="space-y-1.5 sm:space-y-2">
                  {appointments.map((appointment, index) => (
                    <motion.div
                      key={appointment.client}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-800/30 p-2 sm:gap-3 sm:p-3"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/20 sm:h-10 sm:w-10">
                        <Calendar className="h-3 w-3 text-cyan-400 sm:h-4 sm:w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-xs font-medium text-white sm:text-sm">
                          {appointment.client}
                        </div>
                        <div className="text-[10px] text-slate-400 sm:text-xs">{appointment.type}</div>
                      </div>
                      <div className="whitespace-nowrap text-[10px] text-slate-400 sm:text-xs">{appointment.time}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

