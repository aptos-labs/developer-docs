export interface ThemedImage {
  sources: {
    light: string;
    dark: string;
  };
  alt: string;
}

/**
 * ThemedImage Nextra Component
 *
 * Enables users to add a component that displays corresponding images
 * based on the light / dark mode on the page. `light` and `dark`
 * are both used as the `src` fields for the <Image /> component
 *
 * ```ts
 * <ThemedImage sources={{ light: "/docs/stake-state.svg", dark: "/docs/stake-state-dark.svg" }} alt="Stake State" />
 * ```
 */
export function ThemedImage({ sources, alt }: ThemedImage) {
  return (
    <div className="w-full mt-6">
      <img
        loading="eager"
        alt={alt}
        className="w-full block dark:hidden"
        src={sources.light}
      />
      <img
        loading="eager"
        alt={alt}
        className="w-full hidden dark:block"
        src={sources.dark}
      />
    </div>
  );
}

export default ThemedImage;
