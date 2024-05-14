import { Children, useRef } from "react";
import { cn } from "utils/cn";
import { useIsomorphicLayoutEffect } from "utils/useIsomorphicLayoutEffect";
import { IconArrowLeft, IconArrowRight } from "./Icons";

export interface LargeCarouselProps {
  /** The index of the active items in the carousel */
  value: number;
  /** A callback to be invoked when the active item is changed */
  onChange: (value: number) => void;
  /** The list of `JSX.Element`s to be rendered as items in the carousel */
  children: JSX.Element[];
  /** A class name to apply additional styles to the outer element of the carousel */
  className?: string;
}

/** A carousel with arrow button navigation suited for larger viewport sizes. */
export function LargeCarousel({
  value,
  onChange,
  children,
  className,
}: LargeCarouselProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const previousRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const items = Children.toArray(children);
  const getWrappedIndex = createGetWrappedIndex(items.length);

  const slideCarousel = (direction: "forward" | "backward") => () => {
    if (isAnimating.current) return;
    const slider = sliderRef.current;
    if (!slider) {
      // If the slider ref if null for some reason, just trigger `onChange` without
      // performing any animations.
      onChange(getWrappedIndex(value + (direction === "forward" ? 1 : -1)));
      return;
    }

    isAnimating.current = true;
    const durationMs = 300;

    // Slide the carousel
    slider.style.transition = `transform ${durationMs}ms ease-in-out`;
    slider.style.transform = `translateX(${direction === "forward" ? -125 : -25}%)`;

    // Update the currently active carousel item to trigger any CSS animations
    // present on the carousel items
    if (currentRef.current) currentRef.current.dataset.active = undefined;
    if (direction === "forward" && nextRef.current) {
      nextRef.current.dataset.active = "true";
    }
    if (direction === "backward" && previousRef.current) {
      previousRef.current.dataset.active = "true";
    }

    window.setTimeout(() => {
      // Do clean up and trigger the `onChange` callback once the animation is finished
      slider.style.transition = "";
      onChange(getWrappedIndex(value + (direction === "forward" ? 1 : -1)));
      isAnimating.current = false;
    }, durationMs);
  };

  useIsomorphicLayoutEffect(() => {
    // Whenever `value` is updated, we want to make sure that the translation is reset before
    // the browser paints. Using a layout effect instead of a regular effect will ensure that
    // the last frame of the animation and the first paint with the updated `value` match.
    const slider = sliderRef.current;
    if (!slider) return;
    slider.style.transform = "translateX(-75%)";
  }, [value]);

  return (
    <div className={cn("relative flex w-full overflow-hidden", className)}>
      {/* Carousel Items */}
      <div ref={sliderRef} className="flex w-full translate-x-[-75%]">
        <div className="w-1/2 shrink-0">
          {items[getWrappedIndex(value - 2)]}
        </div>
        <div
          // Add a key to preserve any changes to the element during the animation
          key={getWrappedIndex(value - 1)}
          ref={previousRef}
          className="w-1/2 shrink-0"
        >
          {items[getWrappedIndex(value - 1)]}
        </div>
        <div
          // Add a key to preserve any changes to the element during the animation
          key={getWrappedIndex(value)}
          ref={currentRef}
          className="w-1/2 shrink-0"
          data-active={true}
        >
          {items[getWrappedIndex(value)]}
        </div>
        <div
          // Add a key to preserve any changes to the element during the animation
          key={getWrappedIndex(value + 1)}
          ref={nextRef}
          className="w-1/2 shrink-0"
        >
          {items[getWrappedIndex(value + 1)]}
        </div>
        <div className="w-1/2 shrink-0">
          {items[getWrappedIndex(value + 2)]}
        </div>
      </div>

      {/* Left Shadow */}
      <div className="absolute left-0 h-full w-1/4 [background:linear-gradient(90deg,_var(--background-primary)_20%,_transparent_110%)]" />
      {/* Right Shadow */}
      <div className="absolute right-0 h-full w-1/4 [background:linear-gradient(90deg,_transparent_-10%,_var(--background-primary)_80%)]" />

      {/* Navigation Arrows */}
      <button
        aria-label="Previous"
        className="absolute left-0 text-carousel-arrow flex items-center h-full p-8 cursor-pointer"
        onClick={slideCarousel("backward")}
      >
        <IconArrowLeft className="h-[85px] w-[85px]" />
      </button>
      <button
        aria-label="Next"
        className="absolute right-0 text-carousel-arrow flex items-center h-full p-8 cursor-pointer"
        onClick={slideCarousel("forward")}
      >
        <IconArrowRight className="h-[85px] w-[85px]" />
      </button>
    </div>
  );
}

/**
 * This function returns a function that will adjust a given index to remain within
 * the bounds of the collection. It will handle wrapping the index forward or backwards
 * through the collection.
 *
 * For example, if `collectionLength` is `3` and `index` is `4`, the adjusted index will
 * be `1`. If `index` is `-1`, the adjusted index will be `2`.
 */
const createGetWrappedIndex = (collectionLength: number) => (index: number) =>
  ((index % collectionLength) + collectionLength) % collectionLength;
