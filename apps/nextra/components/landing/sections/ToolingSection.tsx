import { i18nConfig } from "@docs-config";
import Image from "next/image";
import { Link } from "nextra-theme-docs";
import { useRouter } from "nextra/hooks";
import { ReactNode } from "react";
import { IconArrowRight } from "../components/Icons";
import { Section, SectionHeader } from "../components/Section";

export function ToolingSection() {
  const { locale } = useRouter();
  const t = i18nConfig[locale!];

  return (
    <Section>
      <SectionHeader>{t.toolingSectionHeadline}</SectionHeader>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch w-full">
        <ToolingCard
          illustration={
            <>
              <Image
                className="block dark:hidden"
                src="/landing/indexer-illustration-light.svg"
                alt={t.indexerIllustrationAlt}
                fill
              />
              <Image
                className="hidden dark:block"
                src="/landing/indexer-illustration-dark.svg"
                alt={t.indexerIllustrationAlt}
                fill
              />
            </>
          }
          logo={
            <Image
              src="/landing/graphql-logo.svg"
              alt={t.graphqlLogoAlt}
              width={56}
              height={65}
            />
          }
          label={t.indexerLabel}
          description={t.indexerDescription}
          href="" // TODO: Add link to relevant docs page
        />
        <ToolingCard
          illustration={
            <>
              <Image
                className="block dark:hidden"
                src="/landing/sdk-illustration-light.svg"
                alt={t.sdkIllustrationAlt}
                fill
              />
              <Image
                className="hidden dark:block"
                src="/landing/sdk-illustration-dark.svg"
                alt={t.sdkIllustrationAlt}
                fill
              />
            </>
          }
          logo={
            <Image
              src="/landing/typescript-logo.svg"
              alt={t.typescriptLogoAlt}
              width={60}
              height={59}
            />
          }
          label={t.sdkLabel}
          description={t.sdkDescription}
          href="" // TODO: Add link to relevant docs page
        />
      </div>
    </Section>
  );
}

interface ToolingCardProps {
  illustration: ReactNode;
  logo: ReactNode;
  label: string;
  description: string;
  href: string;
}

function ToolingCard(props: ToolingCardProps) {
  return (
    <Link
      href={props.href}
      className="
        no-underline flex flex-col flex-1 p-8 w-full sm:max-w-[591px] gap-8
        border-t border-b sm:border border-border-divider rounded-0
        text-text-primary hover:bg-background-elevated transition-colors
      "
    >
      <div className="relative w-full aspect-[525/294]">
        {props.illustration}
      </div>
      <div className="flex gap-4 md:gap-8 items-start">
        {props.logo}
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="label-300 md:heading-100">{props.label}</h3>
            <IconArrowRight className="h-[26px] w-[26px] md:h-[46px] md:w-[46px]" />
          </div>
          <p className="body-100 md:body-300 text-text-muted">
            {props.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
