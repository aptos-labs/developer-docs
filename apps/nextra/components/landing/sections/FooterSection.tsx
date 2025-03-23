import { i18nConfig } from "@docs-config";
import { Link, LocaleSwitch, ThemeSwitch } from "nextra-theme-docs";
import { useRouter } from "nextra/hooks";
import {
  IconAptos,
  IconDiscord,
  IconGithub,
  IconLinkedIn,
  IconTelegram,
  IconTwitter,
} from "../components/Icons";

export function FooterSection() {
  const { locale } = useRouter();
  const t = i18nConfig[locale!];

  return (
    <footer className="flex flex-col max-sm:px-8">
      <div className="flex justify-center border-b md:border-y border-border-divider ">
        <div className="flex flex-col md:flex-row justify-between sm:max-md:px-5 md:pl-8 w-full max-w-[1512px]">
          <div className="flex flex-wrap items-center max-md:justify-between gap-3 max-md:p-3">
            <Link
              href="https://aptosfoundation.org"
              title={t.aptosAlt}
              className="text-text-primary md:py-[calc(theme(spacing.5)-theme(borderWidth.100))]"
            >
              <IconAptos className="h-[34px] w-[92px] sm:h-[42px] sm:w-[114px]" />
            </Link>
            <div className="flex gap-2 sm:gap-3 sm:[&_svg]:h-4 sm:[&_svg]:w-4 [&>*]:text-[var(--text-muted)!important]">
              <LocaleSwitch className="body-100 sm:body-200 sm:[&>*]:gap-3" />
              <ThemeSwitch className="body-100 sm:body-200 sm:[&>*]:gap-3" />
            </div>
          </div>
          <div
            className="
              flex items-center md:gap-2 md:px-6 md:py-[calc(theme(spacing.3)-theme(borderWidth.100))]
              md:border-l md:border-border-divider [&>a]:text-text-primary [&>a]:p-3
            "
          >
            <Link href="https://discord.gg/aptosnetwork" title={t.discordAlt}>
              <IconDiscord />
            </Link>
            <Link
              href="https://github.com/aptos-labs/developer-docs"
              title={t.githubAlt}
            >
              <IconGithub />
            </Link>
            <Link
              href="https://www.linkedin.com/company/aptos-foundation/"
              title={t.linkedinAlt}
            >
              <IconLinkedIn />
            </Link>
            <Link href="https://t.me/aptos" title={t.telegramAlt}>
              <IconTelegram />
            </Link>
            <Link href="https://x.com/Aptos" title={t.twitterAlt}>
              <IconTwitter />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center [&>div]:w-full [&>div]:max-w-[1512px] lg:[&>div]:px-24 xl:[&>div]:px-[168px]">
        <div className="flex max-sm:flex-col flex-wrap px-5 py-6 sm:px-8 sm:py-10 gap-6 sm:gap-10">
          <div className="flex flex-1 gap-6 sm:gap-10 max-w-[440px]">
            <LinksColumn
              heading={t.buildHeading}
              links={[
                {
                  label: t.documentationLink,
                  href: `/${locale}/build/get-started`,
                },
                {
                  label: t.governanceLink,
                  href: `/${locale}/network/blockchain/governance`,
                },
                {
                  label: t.networkNumbersLink,
                  href: "https://aptosfoundation.org/#network-numbers",
                },
                {
                  label: t.validatorsLink,
                  href: `/${locale}/network/blockchain/validator-nodes`,
                },
                {
                  label: t.nodeOperationsLink,
                  href: `/${locale}/network/nodes`,
                },
              ]}
            />
            <LinksColumn
              heading={t.discoverHeading}
              links={[
                {
                  label: t.ecosystemHubLink,
                  href: "https://aptosfoundation.org/ecosystem/projects/all",
                },
                {
                  label: t.grantsLink,
                  href: "https://aptosfoundation.org/grants",
                },
                {
                  label: t.pressLink,
                  href: "https://aptosfoundation.org/#press",
                },
              ]}
            />
          </div>
          <div className="h-px w-[calc(100%+theme(spacing.10))] -mx-5 bg-border-divider sm:hidden" />
          <div className="flex flex-1 gap-6 sm:gap-10 max-w-[440px]">
            <LinksColumn
              heading={t.connectHeading}
              links={[
                {
                  label: t.eventsLink,
                  href: "https://aptosfoundation.org/events",
                },
                {
                  label: t.collectiveLink,
                  href: "https://aptosfoundation.org/currents/join-the-aptos-collective",
                },
                {
                  label: t.forumLink,
                  href: "https://forum.aptosfoundation.org/",
                },
              ]}
            />
            <LinksColumn
              heading={t.meetAptosHeading}
              links={[
                {
                  label: t.aboutAptosLink,
                  href: "https://aptosfoundation.org/",
                },
                // { label: t.netZeroPolicyLink, href: "TODO:" },
                {
                  label: t.whitePaperLink,
                  href: `/${locale}/network/blockchain/aptos-white-paper`,
                },
                {
                  label: t.brandLink,
                  href: "https://aptosfoundation.org/brand",
                },
                {
                  label: t.careersLink,
                  href: "https://aptosfoundation.org/ecosystem/jobs",
                },
              ]}
            />
          </div>
        </div>

        <div
          className="
            flex flex-col sm:flex-row px-5 sm:px-8 py-6 gap-4 sm:gap-6 sm:items-center
            max-sm:border-t border-border-divider body-100 sm:body-200 font-medium
          "
        >
          <div className="text-text-muted">
            © {new Date().getFullYear()} Aptos Foundation
          </div>

          <div className="flex gap-6 [&_a]:no-underline [&_a]:text-text-primary">
            <Link href="https://aptosfoundation.org/privacy">
              {t.privacyLink}
            </Link>
            <Link href="https://aptosfoundation.org/terms">{t.termsLink}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface LinksColumnProps {
  heading: string;
  links: Array<{ label: string; href: string }>;
}

function LinksColumn({ heading, links }: LinksColumnProps) {
  return (
    <div className="flex flex-col gap-4 flex-1 whitespace-nowrap">
      <h3 className="title-100 sm:title-200 text-text-muted">{heading}</h3>
      {links.map(({ href, label }) => (
        <Link
          key={label}
          href={href}
          className="body-100 sm:body-300 font-medium text-text-primary no-underline"
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
