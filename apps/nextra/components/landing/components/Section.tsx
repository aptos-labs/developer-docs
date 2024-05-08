export function Section({ children }: React.PropsWithChildren) {
  return (
    <section className="flex flex-col items-center overflow-hidden">
      {children}
    </section>
  );
}

export function SectionHeader({ children }: React.PropsWithChildren) {
  return (
    <h2
      className="
        title-200 md:title-300 text-text-secondary text-center
        w-full py-16 lg:py-24 px-8 lg:px-12
      "
    >
      {children}
    </h2>
  );
}
