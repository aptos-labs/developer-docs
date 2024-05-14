import { cva } from "class-variance-authority";
import { Children, useEffect, useRef, useState } from "react";
import { cn } from "utils/cn";

// TODO: Currently, this component doesn't accept a value prop and therefore isn't controlled.
// If the user is on desktop and shrinks their browser to a mobile size, they can trigger a state
// de-sync. Once they scroll the carousel, it will be re-synced. This is an edge case so we can
// revisit it later once we have the rest of the site done. Syncing the scroll position with a
// value prop will likely be non-trivial to implement.

export interface CarouselProps {
  /** Each JSX.Element passed will be its own step of the carousel */
  children: JSX.Element[];
  /** When the current step changes, the key of the element will be given to this function */
  onChange?: (key: string) => void;
  /** Class name applied to the outermost wrapper of this component */
  className?: string;
}

export function Carousel({ children, onChange, className }: CarouselProps) {
  const [curIndex, setCurIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onChange) return;
    Children.forEach(children, (child, i) => {
      if (curIndex === i && child.key !== null) onChange(child.key);
    });
  }, [curIndex]);

  const onScroll = () => {
    if (!listRef.current) return;
    const listRect = listRef.current.getBoundingClientRect();
    Array.from(listRef.current.children).forEach((child, index) => {
      if (Math.abs(child.getBoundingClientRect().left - listRect.left) < 40) {
        setCurIndex(index);
      }
    });
  };

  const scrollToIndex = (index: number) => () => {
    if (!listRef.current) return;
    const selectedChild = listRef.current.children[index];
    if (!selectedChild) return;
    selectedChild.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={cn("flex flex-col w-full", className)}>
      <div
        ref={listRef}
        onScroll={onScroll}
        className="flex w-full overflow-auto snap-x snap-mandatory"
      >
        {Children.map(children, (child, i) => (
          <div
            className="snap-start w-full shrink-0"
            aria-current={curIndex === i || undefined}
          >
            {child}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center p-6">
        {Children.map(children, (_, i) => (
          <button
            key={i}
            className="p-2"
            aria-current={curIndex === i || undefined}
            onClick={scrollToIndex(i)}
          >
            <div className={progressDotStyles({ active: curIndex === i })} />
          </button>
        ))}
      </div>
    </div>
  );
}

const progressDotStyles = cva("h-2.5 w-2.5 rounded-full transition-colors", {
  variants: {
    active: {
      true: "bg-carousel-progressDot-active",
      false: "bg-carousel-progressDot",
    },
  },
});
