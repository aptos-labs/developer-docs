import { useData, useRouter } from "nextra/hooks";
import { useMemo, useState } from "react";
import { GradientText } from "../components/GradientText";
import { MoveCodeBlock } from "../components/MoveCodeBlock";
import { i18nConfig } from "@docs-config";
import { Accordion } from "../components/Accordion";
import { Carousel } from "../components/Carousel";
import { Link } from "nextra-theme-docs";
import { IconArrowRight } from "../components/Icons";

interface MoveExample {
  label: string;
  description: string;
  href: string;
  codeSnippet: TrustedHTML;
}

export function MoveSection() {
  const { locale } = useRouter();
  const t = i18nConfig[locale!];
  const { coinsCodeSnippet, objectsCodeSnippet, fungibleAssetsCodeSnippet } =
    useData();

  const moveExamples: Record<string, MoveExample> = useMemo(
    () => ({
      coins: {
        label: t.coinsExampleLabel,
        description: t.coinsExampleDescription,
        href: "", // TODO: Add link to relevant docs page
        codeSnippet: coinsCodeSnippet,
      },
      objects: {
        label: t.objectsExampleLabel,
        description: t.objectsExampleDescription,
        href: "", // TODO: Add link to relevant docs page
        codeSnippet: objectsCodeSnippet,
      },
      fungibleAssets: {
        label: t.fungibleAssetsExampleLabel,
        description: t.fungibleAssetsExampleDescription,
        href: "", // TODO: Add link to relevant docs page
        codeSnippet: fungibleAssetsCodeSnippet,
      },
    }),
    [],
  );

  const [activeExample, setActiveExample] = useState(
    Object.keys(moveExamples)[0],
  );

  const exampleItems = Object.entries(moveExamples).map(([key, value]) => ({
    id: key,
    label: value.label,
    description: value.description,
    href: value.href,
  }));

  return (
    <div className="flex flex-col items-center pt-16 lg:pt-24 gap-8 md:gap-12 lg:gap-24 overflow-hidden">
      <h2
        className="
          title-100 md:title-200 text-text-secondary text-center pb-16 lg:pb-0 px-8 lg:px-12
          border-b-border-divider border-b-100 lg:border-none
        "
      >
        {t.moveSectionHeadline}
      </h2>
      <div className="flex flex-col lg:flex-row lg:gap-12 justify-between items-center w-full max-w-[1200px] xl:max-w-[1280px] lg:px-12">
        <div className="flex flex-col gap-8 md:gap-12 max-md:mb-8 max-lg:mb-12 px-8 lg:px-0">
          <GradientText
            asChild
            className="title-100 md:title-200 lg:max-w-[336px]"
          >
            <p>{t.moveExamplesHeadline}</p>
          </GradientText>
          <Accordion
            value={activeExample}
            onChange={setActiveExample}
            items={exampleItems}
            HeadingLevel="h3"
            className="hidden md:block"
          />
        </div>
        <div className="flex max-w-full px-8 lg:px-0">
          <MoveCodeBlock
            codeSnippet={moveExamples[activeExample].codeSnippet}
            className="md:w-[666px] xl:w-[780px] max-md:h-[415px] lg:h-[635px] xl:h-[735px]"
          />
        </div>
        <Carousel
          onChange={setActiveExample}
          className="md:hidden border-b-border-divider border-b-100"
        >
          {exampleItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 p-8 w-full border-b-border-divider border-b-100"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="label-300 text-text-primary">{item.label}</h3>
                <Link href={item.href}>
                  <IconArrowRight className="text-text-primary" />
                </Link>
              </div>
              <p className="body-100 text-text-muted">{item.description}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
