import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 transform hover:scale-[1.02]",
  {
    variants: {
      variant: {
        default: "bg-ghibli-blue text-primary-foreground hover:bg-ghibli-blue/90 shadow-md hover:shadow-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg",
        outline: "border-2 border-ghibli-blue-light bg-background hover:bg-ghibli-blue-light/10 hover:text-ghibli-blue",
        secondary: "bg-ghibli-yellow text-secondary-foreground hover:bg-ghibli-yellow/90 shadow-md hover:shadow-lg",
        ghost: "hover:bg-ghibli-blue-light/20 hover:text-ghibli-blue",
        link: "text-ghibli-blue underline-offset-4 hover:underline",
        green: "bg-ghibli-green text-white hover:bg-ghibli-green/90 shadow-md hover:shadow-lg",
        pink: "bg-ghibli-pink text-white hover:bg-ghibli-pink/90 shadow-md hover:shadow-lg",
        brown: "bg-ghibli-brown text-white hover:bg-ghibli-brown/90 shadow-md hover:shadow-lg",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-xl px-8",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

