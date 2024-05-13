import { cn } from "utils/cn";
import { IconBump } from "./components/Icons";
import { BlockchainSection } from "./sections/BlockchainSection";
import { DevelopersSection } from "./sections/DevelopersSection";
import { FooterSection } from "./sections/FooterSection";
import { MoveSection } from "./sections/MoveSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { TitleSection } from "./sections/TitleSection";
import { ToolingSection } from "./sections/ToolingSection";

/** Entry point of landing page content */
export function Landing() {
  return (
    <main className="landing-page bg-background-primary text-text-primary font-landing">
      <TitleSection />
      <Divider />
      <MoveSection />
      <Divider />
      <ToolingSection />
      <Divider />
      <DevelopersSection />
      <Divider />
      <BlockchainSection />
      <Divider />
      <TestimonialsSection />
      <Divider className="max-md:h-24" />
      <div className="w-full md:h-24" />
      <FooterSection />
    </main>
  );
}

interface DividerProps {
  className?: string;
}

function Divider({ className }: DividerProps) {
  return (
    <div
      className={cn(
        "flex items-end h-7 border-t-border-divider border-t-100",
        className,
      )}
    >
      <div className="h-px w-1/6 border-b-border-divider border-b-100" />
      <IconBump className="shrink-0 text-border-divider" />
      <div className="h-px w-full border-b-border-divider border-b-100" />
    </div>
  );
}
