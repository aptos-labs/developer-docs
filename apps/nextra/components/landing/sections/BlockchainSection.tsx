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
      <div
        className="
          grid w-full sm:max-w-[591px] lg:max-w-[1176px] lg:grid-cols-[repeat(auto-fit,minmax(341px,1fr))]
          sm:border-t sm:border-l border-border-divider sm:-mb-px
        "
      >
        <FeatureCard
          illustration={
            <PerformanceIllustration className={illustrationStyles} />
          }
          label={t.performanceLabel}
          description={t.performanceDescription}
          href="https://aptosfoundation.org/#network-numbers"
        />
        <FeatureCard
          illustration={
            <ParallelExecutionIllustration className={illustrationStyles} />
          }
          label={t.parallelExecutionLabel}
          description={t.parallelExecutionDescription}
          href="https://medium.com/aptoslabs/block-stm-how-we-execute-over-160k-transactions-per-second-on-the-aptos-blockchain-3b003657e4ba"
        />
        <FeatureCard
          illustration={
            <ValidatorsIllustration className={illustrationStyles} />
          }
          label={t.validatorsLabel}
          description={t.validatorsDescription}
          href={`/${locale}/network/blockchain/validator-nodes`}
        />
        <FeatureCard
          label={t.keylessLabel}
          description={t.keylessDescription}
          href={`/${locale}/build/guides/aptos-keyless`}
        />
        <FeatureCard
          label={t.passkeysLabel}
          description={t.passkeysDescription}
          href="https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-66.md" // TODO: Add link to relevant docs page
        />
        <FeatureCard
          label={t.randomnessLabel}
          description={t.randomnessDescription}
          href={`/${locale}/build/smart-contracts/randomness`}
        />
        <FeatureCard
          label={t.feePayerLabel}
          description={t.feePayerDescription}
          href={`/${locale}/build/sdks/ts-sdk/building-transactions/sponsoring-transactions`}
        />
        {/* <FeatureCard
          label={t.multiSigLabel}
          description={t.multiSigDescription}
          href={`/${locale}/build/sdks/ts-sdk/building-transactions/multi-agent-transactions`}
        /> */}
        <FeatureCard
          label={t.gasLabel}
          description={t.gasDescription}
          href={`/${locale}/network/blockchain/gas-txn-fee`}
        />
        {/* <FeatureCard
          label={t.consensusLabel}
          description={t.consensusDescription}
          href={`/${locale}/network/blockchain/blockchain-deep-dive#consensus`}
        /> */}
        <FeatureCard
          label={t.storageLabel}
          description={t.storageDescription}
          href={`/${locale}/network/blockchain/blockchain-deep-dive#storage`}
        />
        <FeatureCard
          label={t.networkingLabel}
          description={t.networkingDescription}
          href={`/${locale}/network/blockchain/node-networks-sync`}
        />
        <FeatureCard
          label={t.mempoolLabel}
          description={t.mempoolDescription}
          href={`/${locale}/network/blockchain/blockchain-deep-dive#mempool`}
        />
        <FeatureCard
          label={t.stateSyncLabel}
          description={t.stateSyncDescription}
          href={`/${locale}/network/nodes/configure/state-sync`}
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
        no-underline flex flex-col p-8 gap-8 text-text-primary hover:bg-background-elevated transition-colors
        rounded-0 max-sm:border-t sm:border-b sm:border-r border-border-divider
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
