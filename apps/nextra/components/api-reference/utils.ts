export async function fetchApiReference() {
  const url =
    "https://raw.githubusercontent.com/aptos-labs/aptos-core/main/api/doc/spec.json";
  const result = await fetch(url);
  const reference = await result.json();

  return {
    props: {
      ssg: {
        reference,
      },
    },
  };
}

/**
 * Convert to Dark Mode
 *
 * Some components do not have a "system" theme like Nextra does
 * e.g., Nextra has `"light" | "dark" | "system"`.
 *
 * This converts Nextra's theme into a theme that is compatible for components
 * which only have `"light" | "dark"`
 */
export const convertDarkMode = (mode?: string): "dark" | "light" => {
  // Convert "system" to the appropriate dark/light mode
  if (mode === "system") {
    // Check the system preference for dark mode
    const isDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return isDarkMode ? "dark" : "light";
  }

  // Return the mode if it's already "dark" or "light"
  return (mode || "light") as "dark" | "light";
};

export default fetchApiReference;
