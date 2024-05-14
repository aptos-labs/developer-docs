import { i18nConfig } from "@docs-config";
import { useRouter } from "nextra/hooks";
import { Section, SectionHeader } from "../components/Section";
import { Carousel } from "../components/Carousel";
import { ReactNode, useMemo, useState } from "react";
import Image from "next/image";
import { IconQuote } from "../components/Icons";
import { LargeCarousel } from "../components/LargeCarousel";

interface Testimonial {
  body: string;
  author: string;
  authorLogo: ReactNode;
}

interface PlaceholderAuthorLogoProps {
  src: string;
  alt: string;
}

const PlaceholderAuthorLogo = ({ src, alt }: PlaceholderAuthorLogoProps) => (
  <Image src={src} alt={alt} height={42} width={42} />
);

export function TestimonialsSection() {
  const { locale } = useRouter();
  const t = i18nConfig[locale!];

  // TODO: Each testimonial should have its own logo based on the organization that the author is from

  const testimonials: Testimonial[] = useMemo(
    () => [
      {
        body: t.testimonial1Body,
        author: t.testimonial1Author,
        authorLogo: (
          <PlaceholderAuthorLogo src="/landing/zabava.png" alt="zabava" />
        ),
      },
      {
        body: t.testimonial2Body,
        author: t.testimonial2Author,
        authorLogo: (
          <PlaceholderAuthorLogo
            src="/landing/aptin-labs.jpeg"
            alt="Aptin Labs logo"
          />
        ),
      },
      {
        body: t.testimonial3Body,
        author: t.testimonial3Author,
        authorLogo: (
          <PlaceholderAuthorLogo
            src="/landing/cellana.svg"
            alt="Cellana logo"
          />
        ),
      },
    ],
    [],
  );

  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  const carouselItems = testimonials.map((testimonial, i) => (
    <div
      key={i}
      className="
        flex flex-col px-8 py-10 gap-8 border-t border-l border-border-divider h-full
        max-md:bg-background-elevated md:[[data-active=true]>&]:bg-background-elevated
        transition-colors duration-300
      "
    >
      <p className="heading-100 text-text-primary">{testimonial.body}</p>
      <div className="flex items-start py-4 gap-4">
        {testimonial.authorLogo}
        <div className="heading-100 text-text-muted">{testimonial.author}</div>
      </div>
    </div>
  ));

  return (
    <Section>
      <SectionHeader>{t.testimonialsSectionHeadline}</SectionHeader>
      <IconQuote className="w-full -my-5 z-[1]" />
      <Carousel
        // This component operates with keys which modeled as string, but in this case,
        // the keys represent the indices of the carousel items.
        onChange={(key) => setActiveTestimonialIndex(Number.parseInt(key))}
        className="md:hidden gap-14 mb-10"
      >
        {carouselItems}
      </Carousel>
      <LargeCarousel
        value={activeTestimonialIndex}
        onChange={setActiveTestimonialIndex}
        className="hidden md:flex max-w-[1512px]"
      >
        {carouselItems}
      </LargeCarousel>
    </Section>
  );
}
