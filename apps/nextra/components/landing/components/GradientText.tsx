import { Slot } from "@radix-ui/react-slot";
import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "utils/cn";

export interface GradientTextProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  asChild?: boolean;
}

export const GradientText = forwardRef<HTMLDivElement, GradientTextProps>(
  ({ children, asChild, className, ...props }, ref) => {
    const Component = asChild ? Slot : "div";
    return (
      <Component
        ref={ref}
        className={cn(
          "text-text-secondary",
          // Only apply gradient when in dark mode
          "dark:bg-clip-text dark:[-webkit-text-fill-color:transparent] dark:bg-[radial-gradient(circle_at_100%_20%,_#C97E64_0%,_#D8A679_8%,_#97D9D7_70%,_#E99E52_110%)]",
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
GradientText.displayName = "GradientText";
