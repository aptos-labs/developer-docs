const plugin = require("tailwindcss/plugin");

const oklch = (lightness, chroma, hue, alpha) => ({
  __type: "oklch", // This to distinguish from other objects (ie. nested color structure)
  colorValues:
    alpha === undefined ? `${lightness}% ${chroma} ${hue}` : undefined,
  oklchValue: `oklch(${lightness}% ${chroma} ${hue}${alpha === undefined ? "" : ` / ${alpha}%`})`,
});

/**
 * This function allows you to define a set of colors and semantic colors.
 * 
 * Colors contain static representations of color ie. `red`, `green`, `blue`, etc.
 * 
 * Semantic colors contain theme-based representations of colors that describe a specific purpose
 * ie. `background: { base: "white", dark: "black" }`
 * 
 * All color values must be defined using the provided `oklch` function.
 * 
 * You can convert Hex, RGBA, or HSL colors to OKLCH using this online tool:
 * https://oklch.com/
 * 
 * @returns
 * `themeColors` - A colors object to be passed to the `theme.colors` key of your Tailwind config.
 * 
 * `colorsPlugin` - A plugin to be included in the `plugins` array of your Tailwind config.
 * The plugin is responsible for generating the CSS variables required to make your
 * semantic colors display properly across light and dark mode.
 * 
 * @example
 * ```js
  const { themeColors, colorsPlugin } = createOklchColors((oklch) => ({
    colors: {
      white: oklch(100, 0, 0),
      black: oklch(0, 0, 0),
      red: {
        200: oklch(84, 0.02, 30),
        500: oklch(84, 0.08, 30),
        800: oklch(72, 0.15, 30),
        900: oklch(40, 0.1, 30),
      },
    },
    semanticColors: {
      background: {
        DEFAULT: { base: "white", dark: "black" },
        secondary: { base: oklch(22, 0.03, 216) },
        danger: { base: "red-500", dark: "red-800" },
      },
      text: {
        primary: { base: "black", dark: "white" },
      },
      border: { base: "black/50", dark: "white/50" },
    },
  }));
 * ```
 */
const createOklchColors = (colorsFn) => {
  const { colors, semanticColors } = colorsFn(oklch);

  const oklchObjects = {};
  const themeColors = {};
  const baseCssVars = {};
  const darkCssVars = {};

  const getFinalPath = (path, key) =>
    key === "DEFAULT" ? path.join("-") : [...path, key].join("-");

  function traverseColors(colorObj, path) {
    Object.entries(colorObj).forEach(([key, value]) => {
      if (value?.__type === "oklch") {
        const finalPath = getFinalPath(path, key);
        oklchObjects[finalPath] = value;
        themeColors[finalPath] = value.colorValues
          ? `oklch(${value.colorValues} / <alpha-value>)`
          : value.oklchValue;
      } else {
        traverseColors(value, key === "DEFAULT" ? path : [...path, key]);
      }
    });
  }

  traverseColors(colors, []);

  function traverseSemanticColors(colorObj, path) {
    Object.entries(colorObj).forEach(([key, value]) => {
      if (value?.base) {
        const { base, dark } = value;
        const finalPath = getFinalPath(path, key);

        const processColorValue = (colorValue) => {
          if (typeof colorValue === "string") {
            const [color, alpha] = colorValue.split("/");

            const oklchObject = oklchObjects[color];
            if (!oklchObject) {
              throw new Error(
                `Error at ${finalPath}: ${color} is not a valid theme color.`,
              );
            }

            if (alpha === undefined) {
              return oklchObject.oklchValue;
            } else {
              if (!oklchObject.colorValues) {
                throw new Error(
                  `Error at ${finalPath}: ${color} already has an alpha modifier.`,
                );
              }
              return `oklch(${oklchObject.colorValues} / ${alpha}%)`;
            }
          } else {
            if (colorValue?.__type !== "oklch") {
              throw new Error(`Error: ${finalPath} is not an oklch object`);
            }
            return colorValue.oklchValue;
          }
        };

        themeColors[finalPath] = `var(--${finalPath})`;

        const baseColor = processColorValue(base);
        baseCssVars[`--${finalPath}`] = baseColor;
        if (dark) {
          const darkColor = processColorValue(dark);
          darkCssVars[`--${finalPath}`] = darkColor;
        }
      } else {
        traverseSemanticColors(
          value,
          key === "DEFAULT" ? path : [...path, key],
        );
      }
    });
  }

  traverseSemanticColors(semanticColors, []);

  const colorsPlugin = plugin(function createColorCssVariables({ addBase }) {
    addBase({ ":root": baseCssVars });
    addBase({ ".dark": darkCssVars });
  });

  return { themeColors, colorsPlugin };
};

module.exports = createOklchColors;
