import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gray-900 text-white shadow-sm",
        secondary:
          "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200",
        outline:
          "border-gray-200 text-gray-900 hover:bg-gray-50",
        success:
          "border-transparent bg-green-100 text-green-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
