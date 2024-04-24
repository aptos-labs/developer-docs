import { IconBump } from "./components/Icons";
import { MoveSection } from "./sections/MoveSection";
import { TitleSection } from "./sections/TitleSection";

/** Entry point of landing page content */
export function Landing() {
  return (
    <div className="landing-page bg-background-primary text-text-primary font-landing">
      <TitleSection />
      <Divider />
      <MoveSection />
      <Divider />
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-end h-7 border-t-border-divider border-t-100">
      <div className="h-px w-1/6 border-b-border-divider border-b-100" />
      <IconBump className="shrink-0 text-border-divider" />
      <div className="h-px w-full border-b-border-divider border-b-100" />
    </div>
  );
}
