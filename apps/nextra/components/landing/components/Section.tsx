export function Section({ children }: React.PropsWithChildren) {
  return (
    <section className="flex flex-col items-center pt-16 lg:pt-24 gap-8 md:gap-12 lg:gap-24 overflow-hidden">
      {children}
    </section>
  );
}

export function SectionHeader({ children }: React.PropsWithChildren) {
  return (
    <h2
      className="
        title-100 md:title-200 text-text-secondary text-center w-full pb-16 lg:pb-0 px-8 lg:px-12
        border-b-border-divider border-b-100 lg:border-none
      "
    >
      {children}
    </h2>
  );
}
