import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-ghibli-blue text-white shadow-sm hover:bg-ghibli-blue/80",
        secondary: "border-transparent bg-ghibli-yellow text-secondary-foreground shadow-sm hover:bg-ghibli-yellow/80",
        destructive: "border-transparent bg-ghibli-pink text-white shadow-sm hover:bg-ghibli-pink/80",
        outline: "text-foreground border-2 border-ghibli-blue-light",
        success: "border-transparent bg-ghibli-green text-white shadow-sm hover:bg-ghibli-green/80",
        warning: "border-transparent bg-ghibli-yellow text-secondary-foreground shadow-sm hover:bg-ghibli-yellow/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }

