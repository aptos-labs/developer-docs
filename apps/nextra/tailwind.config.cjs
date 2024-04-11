const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
const createOklchColors = require("./oklchColorsPlugin");

const { themeColors, colorsPlugin } = createOklchColors((oklch) => ({
  colors: {
    general: {
      white: oklch(100, 0, 0),
      black: oklch(0, 0, 0),
      transparent: oklch(0, 0, 0, 0),
      red: oklch(78, 0.13, 25),
      aqua: oklch(78, 0.13, 184),
      green: oklch(78, 0.13, 139),
    },
    brand: {
      blue: oklch(78, 0.13, 192),
      lightBlue: oklch(92, 0.13, 193),
    },
    spectral: {
      red: {
        200: oklch(84, 0.02, 30),
        500: oklch(84, 0.08, 30),
        800: oklch(72, 0.15, 30),
        900: oklch(40, 0.1, 30),
      },
      yellow: {
        200: oklch(84, 0.02, 100),
        500: oklch(84, 0.08, 100),
        800: oklch(72, 0.15, 100),
        900: oklch(40, 0.1, 100),
      },
      orange: {
        200: oklch(84, 0.02, 65),
        500: oklch(84, 0.08, 65),
        800: oklch(72, 0.15, 65),
        900: oklch(40, 0.1, 65),
      },
      green: {
        200: oklch(84, 0.02, 170),
        500: oklch(84, 0.08, 170),
        800: oklch(72, 0.15, 170),
        900: oklch(40, 0.1, 170),
      },
      blue: {
        200: oklch(84, 0.02, 240),
        500: oklch(84, 0.08, 240),
        800: oklch(72, 0.15, 240),
        900: oklch(40, 0.1, 240),
      },
      violet: {
        200: oklch(84, 0.02, 310),
        500: oklch(84, 0.08, 310),
        800: oklch(72, 0.15, 310),
        900: oklch(40, 0.1, 310),
      },
    },
  },
  semanticColors: {
    text: {
      primary: { base: "general-white" },
      secondary: { base: oklch(90, 0, 0) },
      muted: { base: oklch(66, 0.02, 219) },
      link: {
        DEFAULT: { base: "brand-blue" },
        hover: { base: "brand-lightBlue" },
      },
      label: { base: oklch(90, 0, 0) },
      success: { base: "spectral-green-800" },
      error: { base: "spectral-red-800" },
      warning: { base: "spectral-orange-800" },
      disabled: { base: "general-white/20" },
    },
    background: {
      primary: { base: oklch(18, 0.02, 221) },
      secondary: { base: oklch(22, 0.03, 216) },
      tertiary: { base: oklch(24, 0.03, 214) },
      elevated: { base: oklch(21, 0.03, 219) },
      disabled: { base: oklch(37, 0.02, 222) },
    },
    border: {
      primary: { base: "general-white/15" },
      secondary: { base: oklch(66, 0.02, 219) },
      success: { base: "spectral-green-800" },
      error: { base: "spectral-red-800" },
      warning: { base: "spectral-orange-800" },
      interactive: {
        DEFAULT: { base: oklch(33, 0.02, 220) },
        hover: { base: oklch(33, 0.02, 220) },
        active: { base: oklch(33, 0.02, 220) },
        disabled: { base: oklch(33, 0.02, 220) },
        focus: { base: oklch(51, 0.08, 195) },
      },
      divider: { base: "general-white/5" },
    },
    icon: {
      primary: { base: "general-white" },
      secondary: { base: oklch(90, 0, 0) },
      tertiary: { base: oklch(66, 0.02, 219) },
    },
  },
}));

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./{components,pages}/**/*.{mdx,tsx}", "./theme.config.tsx"],
  theme: {
    extend: {
      width: {
        prose: "65ch",
      },
      colors: themeColors,
      fontFamily: {
        landing: ["Satoshi", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        12: "0.75rem",
        14: "0.875rem",
        16: "1rem",
        18: "1.125rem",
        24: "1.5rem",
        30: "1.875rem",
        39: "2.4375rem",
        51: "3.1875rem",
        68: "4.25rem",
        110: "6.875rem",
      },
      lineHeight: {
        16: "1rem",
        18: "1.125rem",
        20: "1.25rem",
        22: "1.375rem",
        24: "1.5rem",
        26: "1.625rem",
        34: "2.125rem",
        42: "2.625rem",
        52: "3.25rem",
        62: "3.875rem",
        72: "4.5rem",
        116: "7.25rem",
      },
      borderRadius: {
        0: "0px",
        100: "8px",
        200: "12px",
        300: "16px",
        400: "32px",
        full: "9999px",
      },
      borderWidth: {
        0: "0px",
        100: "1px",
        200: "2px",
      },
      boxShadow: {
        low: "0px 2px 30px 0px rgba(24, 24, 27, 0.06)",
        mid: "0px 3.206px 32.056px 0px rgba(24, 24, 27, 0.08)",
        high: "0px 6px 80px 0px rgba(24, 24, 27, 0.15)",
        top: "0px 6px 50px 0px rgba(24, 24, 27, 0.18)",
      },
      zIndex: {
        dialog: "100",
        popover: "200",
        toast: "300",
      },
    },
  },
  plugins: [
    colorsPlugin,
    plugin(function addTextStyles({ addComponents, theme }) {
      addComponents({
        // Component Regular Text Styles
        ".component-100": {
          fontFamily: theme("fontFamily.landing"),
          fontSize: theme("fontSize.14"),
          lineHeight: theme("lineHeight.16"),
          fontWeight: theme("fontWeight.regular"),
        },
        ".component-200": {
          fontFamily: theme("fontFamily.landing"),
          fontSize: theme("fontSize.16"),
          lineHeight: theme("lineHeight.16"),
          fontWeight: theme("fontWeight.regular"),
        },
        ".component-300": {
          fontFamily: theme("fontFamily.landing"),
          fontSize: theme("fontSize.18"),
          lineHeight: theme("lineHeight.24"),
          fontWeight: theme("fontWeight.regular"),
        },
        ".component-400": {
          fontFamily: theme("fontFamily.landing"),
          fontSize: theme("fontSize.24"),
          lineHeight: theme("lineHeight.24"),
          fontWeight: theme("fontWeight.regular"),
        },

        // Component Semibold Text Styles
        ".component-100-semibold": {
          fontFamily: theme("fontFamily.landing"),
          fontSize: theme("fontSize.14"),
          lineHeight: theme("lineHeight.16"),
          fontWeight: theme("fontWeight.semibold"),
        },
        ".component-200-semibold": {
          fontFamily: theme("fontFamily.landing"),
          fontSize: theme("fontSize.16"),
          lineHeight: theme("lineHeight.16"),
          fontWeight: theme("fontWeight.semibold"),
        },
        ".component-300-semibold": {
          fontFamily: theme("fontFamily.landing"),
          fontSize: theme("fontSize.18"),
          lineHeight: theme("lineHeight.24"),
          fontWeight: theme("fontWeight.semibold"),
        },
        ".component-400-semibold": {
          fontFamily: theme("fontFamily.landing"),
          fontSize: theme("fontSize.24"),
          lineHeight: theme("lineHeight.24"),
          fontWeight: theme("fontWeight.semibold"),
        },

        // Body Text Styles
        ".body-100": {
          fontFamily: theme("fontFamily.landing"),
          fontSize: theme("fontSize.14"),
          lineHeight: theme("lineHeight.22"),
          fontWeight: theme("fontWeight.regular"),
        },
        ".body-200": {
          fontFamily: theme("fontFamily.landing"),
          fontSize: theme("fontSize.16"),
          lineHeight: theme("lineHeight.22"),
          fontWeight: theme("fontWeight.regular"),
        },
        ".body-300": {
          fontFamily: theme("fontFamily.landing"),
          fontSize: theme("fontSize.18"),
          lineHeight: theme("lineHeight.26"),
          fontWeight: theme("fontWeight.regular"),
        },

        // Label Text Styles
        ".label-100": {
          fontFamily: theme("fontFamily.landing"),
          fontSize: theme("fontSize.14"),
          lineHeight: theme("lineHeight.22"),
          fontWeight: theme("fontWeight.semibold"),
        },
        ".label-200": {
          fontFamily: theme("fontFamily.landing"),
          fontSize: theme("fontSize.16"),
          lineHeight: theme("lineHeight.22"),
          fontWeight: theme("fontWeight.semibold"),
        },
        ".label-300": {
          fontFamily: theme("fontFamily.landing"),
          fontSize: theme("fontSize.18"),
          lineHeight: theme("lineHeight.26"),
          fontWeight: theme("fontWeight.semibold"),
        },

        // Heading Text Styles
        ".heading-100": {
          fontFamily: theme("fontFamily.landing"),
          fontSize: theme("fontSize.24"),
          lineHeight: theme("lineHeight.34"),
          fontWeight: theme("fontWeight.medium"),
        },
        ".heading-200": {
          fontFamily: theme("fontFamily.landing"),
          fontSize: theme("fontSize.30"),
          lineHeight: theme("lineHeight.42"),
          fontWeight: theme("fontWeight.medium"),
        },
        ".heading-300": {
          fontFamily: theme("fontFamily.landing"),
          fontSize: theme("fontSize.39"),
          lineHeight: theme("lineHeight.52"),
          fontWeight: theme("fontWeight.medium"),
        },

        // Display Text Styles
        ".display-100": {
          fontFamily: theme("fontFamily.landing"),
          fontSize: theme("fontSize.51"),
          lineHeight: theme("lineHeight.62"),
          fontWeight: theme("fontWeight.medium"),
        },
        ".display-200": {
          fontFamily: theme("fontFamily.landing"),
          fontSize: theme("fontSize.68"),
          lineHeight: theme("lineHeight.72"),
          fontWeight: theme("fontWeight.medium"),
        },
        ".display-300": {
          fontFamily: theme("fontFamily.landing"),
          fontSize: theme("fontSize.110"),
          lineHeight: theme("lineHeight.116"),
          fontWeight: theme("fontWeight.medium"),
        },
      });
    }),
  ],
};
