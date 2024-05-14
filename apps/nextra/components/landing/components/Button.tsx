import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "utils/cn";
import { clsx } from "clsx/lite";

type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonVariants = VariantProps<typeof buttonStyles>;

export interface ButtonProps extends ButtonAttributes, ButtonVariants {
  children: ReactNode;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant, size, iconOnly, children, asChild, className, ...props },
    ref,
  ) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        ref={ref}
        className={cn(buttonStyles({ variant, size, iconOnly }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
Button.displayName = "Button";

const buttonStyles = cva(
  "flex items-center justify-center gap-2 rounded-none cursor-pointer disabled:cursor-not-allowed transition-colors border no-underline",
  {
    variants: {
      variant: {
        primary: clsx(
          "bg-button-primary-background text-button-primary-text border-button-primary-background",
          "hover:bg-button-primary-hovered-background hover:text-button-primary-hovered-text hover:border-button-primary-hovered-background",
          "active:bg-button-primary-pressed-background active:text-button-primary-pressed-text active:border-button-primary-pressed-background",
          "disabled:bg-button-primary-disabled-background disabled:text-button-primary-disabled-text disabled:border-button-primary-disabled-background",
          "shadow-[4px_4px_0_-1px_var(--button-primary-border-inset),4px_4px_0_0_var(--button-primary-border)]",
        ),
        secondary: clsx(
          "bg-button-secondary-background text-button-secondary-text border-button-secondary-border",
          "hover:bg-button-secondary-hovered-background hover:text-button-secondary-hovered-text hover:border-button-secondary-hovered-border",
          "active:bg-button-secondary-pressed-background active:text-button-secondary-pressed-text active:border-button-secondary-pressed-border",
          "disabled:bg-button-secondary-disabled-background disabled:text-button-secondary-disabled-text disabled:border-button-secondary-disabled-background",
        ),
      },
      size: {
        sm: "component-200-semibold px-4 py-2 max-h-9 [&_svg]:h-5 [&_svg]:w-5",
        md: "component-300-semibold px-5 py-2.5 max-h-11 [&_svg]:h-5 [&_svg]:w-5",
        lg: "component-400-semibold px-5 py-4 max-h-14 [&_svg]:h-6 [&_svg]:w-6",
      },
      iconOnly: {
        true: "",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        iconOnly: true,
        class: "p-1.5 max-h-10 max-w-8",
      },
      {
        size: "md",
        iconOnly: true,
        class: "p-2.5 max-h-10 max-w-10",
      },
      {
        size: "lg",
        iconOnly: true,
        class: "p-3 max-h-10 max-w-12",
      },
    ],
    defaultVariants: { variant: "primary", size: "md" },
  },
);
