import { i18nConfig } from "@docs-config";
import { Link } from "nextra-theme-docs";
import { useData, useRouter } from "nextra/hooks";
import { useMemo, useState } from "react";
import { Accordion } from "../components/Accordion";
import { Carousel } from "../components/Carousel";
import { CodeBlock } from "../components/CodeBlock";
import { GradientText } from "../components/GradientText";
import { IconArrowRight, IconMoveLang } from "../components/Icons";
import { Section, SectionHeader } from "../components/Section";

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
        href: `/${locale}/build/smart-contracts/aptos-coin`,
        codeSnippet: coinsCodeSnippet,
      },
      objects: {
        label: t.objectsExampleLabel,
        description: t.objectsExampleDescription,
        href: `/${locale}/build/smart-contracts/objects`,
        codeSnippet: objectsCodeSnippet,
      },
      fungibleAssets: {
        label: t.fungibleAssetsExampleLabel,
        description: t.fungibleAssetsExampleDescription,
        href: `/${locale}/build/smart-contracts/fungible-asset`,
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
    <Section>
      <SectionHeader>{t.moveSectionHeadline}</SectionHeader>
      <div
        className="
          flex flex-col lg:flex-row lg:gap-12 justify-between items-center
          w-full max-w-[1200px] xl:max-w-[1280px] lg:px-12
          border-t border-t-border-divider lg:border-none max-lg:pt-8 
        "
      >
        <div className="flex flex-col gap-8 md:gap-12 max-md:mb-8 max-lg:mb-12 px-8 lg:px-0">
          <GradientText
            asChild
            className="title-200 md:title-300 lg:max-w-[336px]"
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
          <CodeBlock
            codeSnippet={moveExamples[activeExample].codeSnippet}
            fileIcon={
              <IconMoveLang className="w-[28.831px] h-[9.414px] md:w-[49px] md:h-[16px]" />
            }
            fileName="example.move"
            className="md:w-[666px] xl:w-[780px] max-md:h-[415px] lg:h-[635px] xl:h-[735px]"
          />
        </div>
        <Carousel onChange={setActiveExample} className="md:hidden">
          {exampleItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 p-8 w-full border-b-border-divider border-b"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="label-300 text-text-primary">{item.label}</h3>
                <Link href={item.href}>
                  <IconArrowRight className="text-text-primary h-[26px] w-[26px]" />
                </Link>
              </div>
              <p className="body-100 text-text-muted">{item.description}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </Section>
  );
}
