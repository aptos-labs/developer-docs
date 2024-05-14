import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Button } from "./Button";
import { IconArrowTopRight } from "./Icons";
import { Link } from "nextra-theme-docs";
import { cn } from "utils/cn";

export interface AccordionItem {
  id: string;
  label: string;
  description: string;
  href: string;
}

export interface AccordionProps {
  value: string;
  onChange: (value: string) => void;
  items: AccordionItem[];
  HeadingLevel: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

export function Accordion({
  value,
  onChange,
  items,
  HeadingLevel,
  className,
}: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      type="single"
      value={value}
      onValueChange={onChange}
      className={cn("border border-border-divider", className)}
    >
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item.id}
          value={item.id}
          className="flex flex-col overflow-hidden data-[state=open]:bg-background-elevated [&:not(:first-child)]:border-t border-border-divider transition-colors"
        >
          <AccordionPrimitive.Header asChild>
            <HeadingLevel
              aria-label={item.label}
              className="label-300 text-text-secondary data-[state=open]:text-text-primary transition-colors"
            >
              <AccordionPrimitive.Trigger className="text-left w-full p-3 cursor-pointer">
                {item.label}
              </AccordionPrimitive.Trigger>
            </HeadingLevel>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="data-[state=open]:animate-accordion-open data-[state=closed]:animate-accordion-close">
            <div className="flex flex-col gap-3 p-3 pt-0">
              <p className="body-200 text-text-muted -mt-1.5">
                {item.description}
              </p>
              <Button iconOnly asChild className="self-end">
                <Link href={item.href}>
                  <IconArrowTopRight />
                </Link>
              </Button>
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
