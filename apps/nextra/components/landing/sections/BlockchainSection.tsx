import { i18nConfig } from "@docs-config";
import { useRouter } from "nextra/hooks";
import { Section, SectionHeader } from "../components/Section";
import { ReactNode } from "react";
import { cn } from "utils/cn";
import { PerformanceIllustration } from "../components/Illustrations/PerformanceIllustration";
import { ParallelExecutionIllustration } from "../components/Illustrations/ParallelExecutionIllustration";
import { ValidatorsIllustration } from "../components/Illustrations/ValidatorsIllustration";
import { Link } from "nextra-theme-docs";

export function BlockchainSection() {
  const { locale } = useRouter();
  const t = i18nConfig[locale!];

  const illustrationStyles = "w-full h-[150px] md:h-[200px]";

  return (
    <Section>
      <SectionHeader>{t.blockchainSectionHeadline}</SectionHeader>
      <div className="grid w-full sm:max-w-[591px] lg:max-w-[1176px] lg:grid-cols-[repeat(auto-fit,minmax(341px,1fr))]">
        <FeatureCard
          illustration={
            <PerformanceIllustration className={illustrationStyles} />
          }
          label={t.performanceLabel}
          description={t.performanceDescription}
          href="" // TODO: Add link to relevant docs page
        />
        <FeatureCard
          illustration={
            <ParallelExecutionIllustration className={illustrationStyles} />
          }
          label={t.parallelExecutionLabel}
          description={t.parallelExecutionDescription}
          href="" // TODO: Add link to relevant docs page
        />
        <FeatureCard
          illustration={
            <ValidatorsIllustration className={illustrationStyles} />
          }
          label={t.validatorsLabel}
          description={t.validatorsDescription}
          href="" // TODO: Add link to relevant docs page
        />
        <FeatureCard
          label={t.keylessLabel}
          description={t.keylessDescription}
          href="" // TODO: Add link to relevant docs page
        />
        <FeatureCard
          label={t.passkeysLabel}
          description={t.passkeysDescription}
          href="" // TODO: Add link to relevant docs page
        />
        <FeatureCard
          label={t.randomnessLabel}
          description={t.randomnessDescription}
          href="" // TODO: Add link to relevant docs page
        />
        <FeatureCard
          label={t.feePayerLabel}
          description={t.feePayerDescription}
          href="" // TODO: Add link to relevant docs page
        />
        <FeatureCard
          label={t.multiSigLabel}
          description={t.multiSigDescription}
          href="" // TODO: Add link to relevant docs page
        />
        <FeatureCard
          label={t.gasLabel}
          description={t.gasDescription}
          href="" // TODO: Add link to relevant docs page
        />
        <FeatureCard
          label={t.consensusLabel}
          description={t.consensusDescription}
          href="" // TODO: Add link to relevant docs page
        />
        <FeatureCard
          label={t.storageLabel}
          description={t.storageDescription}
          href="" // TODO: Add link to relevant docs page
        />
        <FeatureCard
          label={t.networkingLabel}
          description={t.networkingDescription}
          href="" // TODO: Add link to relevant docs page
        />
        <FeatureCard
          label={t.mempoolLabel}
          description={t.mempoolDescription}
          href="" // TODO: Add link to relevant docs page
        />
        <FeatureCard
          label={t.stateSyncLabel}
          description={t.stateSyncDescription}
          href="" // TODO: Add link to relevant docs page
        />
      </div>
    </Section>
  );
}

interface FeatureCardProps {
  illustration?: ReactNode;
  label: string;
  description: string;
  href: string;
}

function FeatureCard(props: FeatureCardProps) {
  return (
    <Link
      href={props.href}
      className="
        no-underline flex flex-col p-8 gap-8 border-t border-b sm:border border-border-divider rounded-0
        text-text-primary hover:bg-background-elevated transition-colors
      "
    >
      {props.illustration}
      <div
        className={cn(
          "flex flex-col",
          props.illustration ? "gap-4 md-gap-8" : "gap-4",
        )}
      >
        <h3 className="label-300 md:heading-100">{props.label}</h3>
        <p className="body-200 md:body-300 text-text-muted">
          {props.description}
        </p>
      </div>
    </Link>
  );
}
