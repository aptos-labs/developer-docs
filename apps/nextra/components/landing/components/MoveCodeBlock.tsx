import { CopyToClipboard } from "nextra/components";
import { useRef } from "react";
import { cn } from "utils/cn";
import { IconMoveLang } from "./Icons";

// This component is loosely based on Nextra's `Pre` component.
// I originally tried to use `Pre` directly, but ended up needing more control
// Reference: https://github.com/shuding/nextra/blob/main/packages/nextra/src/components/pre.tsx

export interface MoveCodeBlockProps {
  codeSnippet: TrustedHTML;
  fileName?: string;
  className?: string;
}

export function MoveCodeBlock({
  codeSnippet,
  fileName = "example.move",
  className,
}: MoveCodeBlockProps) {
  const codeContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "px-px pt-px [background-image:linear-gradient(to_bottom,transparent,var(--background-primary)),radial-gradient(#C97E64_0%,_#D8A679_8%,_#97D9D7_70%,_#E99E52_110%)]",
        className,
      )}
    >
      <div className="bg-background-elevated flex items-center justify-between p-2 md:p-4">
        <div className="flex items-center gap-2 text-[8px] md:text-[12px] leading-3 font-medium text-text-secondary">
          <IconMoveLang className="w-[28.831px] h-[9.414px] md:w-[49px] md:h-[16px]" />
          {fileName}
        </div>
        <CopyToClipboard
          className="hidden md:block border-none text-text-secondary -m-1.5"
          getValue={() =>
            codeContainerRef.current?.querySelector("code")?.textContent || ""
          }
        />
      </div>
      <div
        ref={codeContainerRef}
        dangerouslySetInnerHTML={{ __html: codeSnippet }}
        className="
          px-6 py-10 xl:px-8 xl:py-12 bg-[#F0FAFA] dark:bg-[linear-gradient(0deg,_#051419_-26.89%,_#0D262E_100%)]
          [&_span]:text-[8px] md:[&_span]:text-12 xl:[&_span]:text-14 [&_span]:text-[var(--shiki-light)] dark:[&_span]:text-[var(--shiki-dark)]
        "
      />
    </div>
  );
}
