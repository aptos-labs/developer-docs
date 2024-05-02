import { i18nConfig } from "@docs-config";
import { Section, SectionHeader } from "../components/Section";
import { Button } from "../components/Button";
import { Link } from "nextra-theme-docs";
import { useRouter } from "nextra/hooks";
import { IconArrowTopRight } from "../components/Icons";
import { ChainIllustration } from "../components/Illustrations/ChainIllustration";

export function DevelopersSection() {
  const { locale } = useRouter();
  const t = i18nConfig[locale!];

  return (
    <Section>
      <SectionHeader>{t.developersSectionHeadline}</SectionHeader>
      <div className="relative overflow-hidden flex flex-col lg:flex-row justify-center items-center lg:items-stretch w-full max-w-full sm:w-max">
        <ChainIllustration
          className="
            absolute top-2 left-1/2 max-sm:-translate-x-1/2 max-lg:w-auto max-sm:h-[210px]
            sm:top-[-4px] sm:left-[-90px] max-lg:h-[330px]
            lg:top-[-140px] lg:left-[-56px]
          "
        />
        <DevelopersCard
          label={t.developerDiscussionsLabel}
          description={t.developerDiscussionsDescription}
          linkLabel={t.developerDiscussionsLink}
          href="" // TODO: Add link to relevant docs page
        />
        <DevelopersCard
          label={t.officeHoursLabel}
          description={t.officeHoursDescription}
          linkLabel={t.officeHoursLink}
          href="" // TODO: Add link to relevant docs page
        />
        <DevelopersCard
          label={t.grantsLabel}
          description={t.grantsDescription}
          linkLabel={t.grantsLink}
          href="" // TODO: Add link to relevant docs page
        />
      </div>
    </Section>
  );
}

interface DevelopersCard {
  label: string;
  description: string;
  linkLabel: string;
  href: string;
}

function DevelopersCard(props: DevelopersCard) {
  return (
    <div
      className="
        flex flex-col flex-1 p-8 w-full sm:max-w-[591px] lg:max-w-[393px] gap-8
        border-t border-b sm:border border-border-divider rounded-0
        text-text-primary hover:bg-background-elevated transition-colors
      "
    >
      <div
        className="
          w-full hidden [:first-of-type>&]:block lg:block z-[1]
          max-sm:[:first-of-type>&]:h-[160px] max-lg:[:first-of-type>&]:h-[250px] lg:h-[325px]
        "
      />
      <div className="flex flex-col flex-1 gap-8 items-start justify-between z-[1]">
        <div className="flex flex-col gap-4 md:gap-8">
          <h3 className="label-300 md:heading-100">{props.label}</h3>
          <p className="body-200 md:body-300 text-text-muted">
            {props.description}
          </p>
        </div>
        <Button asChild variant="secondary">
          <Link href={props.href}>
            {props.linkLabel} <IconArrowTopRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
