import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-slate-900 text-white shadow-sm hover:bg-slate-800',
        secondary:
          'border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200',
        outline:
          'border-slate-200 text-slate-900 hover:bg-slate-50',
        success:
          'border-transparent bg-teal-100 text-teal-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;

