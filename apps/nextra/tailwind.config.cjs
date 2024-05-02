const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
const createOklchColors = require("./oklchColorsPlugin");

const { themeColors, colorsPlugin } = createOklchColors((oklch) => ({
  colors: {
    general: {
      white: oklch(100, 0, 0), // #FFF
      black: oklch(0, 0, 0), // #000
      transparent: oklch(0, 0, 0, 0), // #FFFFFF00
      red: oklch(78.11, 0.1275, 25.03), // #FF968E
      aqua: oklch(78.11, 0.134, 184.44), // #1ED3C2
      green: oklch(78.05, 0.134, 138.9), // #8ACC77
    },
    brand: {
      blue: oklch(78.07, 0.1339, 192.33), // #00D2CE
      lightBlue: oklch(91.54, 0.134, 193.32), // #5BFFFC
    },
    spectral: {
      red: {
        200: oklch(83.97, 0.02, 29.56), // #D7C6C3
        500: oklch(84.04, 0.079, 30.42), // #FAB8AC
        800: oklch(71.97, 0.15, 29.58), // #F47C6B
        900: oklch(40.02, 0.1, 30.37), // #742F25
      },
      yellow: {
        200: oklch(83.96, 0.021, 100.64), // #CDCBBC
        500: oklch(83.9, 0.08, 99.98), // #D6CC8F
        800: oklch(71.91, 0.149, 99.69), // #BBA500
        900: oklch(39.94, 0.083, 100.25), // #524800
      },
      orange: {
        200: oklch(83.95, 0.02, 65.1), // #D4C8BD
        500: oklch(83.88, 0.08, 65.14), // #EFC093
        800: oklch(72.06, 0.15, 64.8), // #E48E26
        900: oklch(40.08, 0.0896, 65.41), // #683C00
      },
      green: {
        200: oklch(84.03, 0.02, 167.83), // #BFCFC8
        500: oklch(84.04, 0.08, 170.28), // #95DCC3
        800: oklch(72.12, 0.1429, 169.91), // #00C197
        900: oklch(39.98, 0.079, 170), // #005541
      },
      blue: {
        200: oklch(84.07, 0.021, 238.72), // #BFCDD7
        500: oklch(83.99, 0.08, 240.46), // #9BD2FA
        800: oklch(71.99, 0.15, 239.95), // #30AFF8
        900: oklch(40.08, 0.0919, 240.09), // #004D74
      },
      violet: {
        200: oklch(83.95, 0.021, 308.19), // #CEC7D5
        500: oklch(84.11, 0.079, 310.24), // #DBBDF2
        800: oklch(72, 0.149, 309.88), // #C188EA
        900: oklch(39.95, 0.1, 310.14), // #58366F
      },
    },
  },
  semanticColors: {
    text: {
      primary: {
        base: oklch(18.01, 0.024, 220.99), // #051419
        dark: oklch(92.05, 0.007, 106.53), // #E5E5E0
      },
      secondary: {
        base: oklch(18.01, 0.024, 220.99), // #051419
        dark: oklch(65.68, 0.023, 218.74), // #82959B
      },
      muted: {
        base: oklch(34.81, 0.022, 218.94), // #2D3D42
        dark: oklch(65.68, 0.023, 218.74), // #82959B
      },
      link: {
        DEFAULT: { base: "brand-blue", dark: "brand-blue" },
        hover: { base: "brand-lightBlue", dark: "brand-lightBlue" },
      },
      label: {
        base: oklch(90.06, 0, 0), // #DEDEDE
      },
      success: { base: "spectral-green-800", dark: "spectral-green-800" },
      error: { base: "spectral-red-800", dark: "spectral-red-800" },
      warning: { base: "spectral-orange-800", dark: "spectral-orange-800" },
      disabled: { base: "general-white/20" },
    },
    background: {
      primary: {
        base: oklch(95.87, 0.009, 214.34), // #EBF3F5
        dark: oklch(18.01, 0.024, 220.99), // #051419
      },
      secondary: {
        base: oklch(21.61, 0.028, 215.56), // #081D22
      },
      tertiary: {
        base: oklch(24.01, 0.03, 213.84), // #0C2328
      },
      elevated: {
        base: oklch(98.86, 0.0088, 214.34), // #F5FDFF
        dark: oklch(20.56, 0.025, 219.19), // #091A1F
      },
      disabled: {
        base: oklch(37.45, 0.016, 221.78), // #384347
      },
    },
    border: {
      primary: { base: "general-black/15", dark: "general-white/15" },
      secondary: {
        base: oklch(65.68, 0.023, 218.74), // #82959B
      },
      success: { base: "spectral-green-800", dark: "spectral-green-800" },
      error: { base: "spectral-red-800", dark: "spectral-red-800" },
      warning: { base: "spectral-orange-800", dark: "spectral-orange-800" },
      interactive: {
        DEFAULT: {
          base: oklch(32.75, 0.018, 220.08), // #2B373B
        },
        focus: {
          base: oklch(50.67, 0.079, 194.96), // #1B7373
        },
      },
      divider: {
        base: oklch(18.01, 0.024, 220.99, 30), // #051419 @ 30%
        dark: "general-white/5",
      },
    },
    icon: {
      primary: { base: "general-black", dark: "general-white" },
      secondary: {
        base: oklch(90.06, 0, 0), // #DEDEDE
      },
      tertiary: {
        base: oklch(65.68, 0.023, 218.74), // #82959B
      },
    },
    nav: {
      background: {
        base: oklch(95.87, 0.009, 214.34, 70), // #EBF3F5 @ 70%
        dark: oklch(18.01, 0.024, 220.99, 70), // #051419 @ 70%
      },
    },
    button: {
      primary: {
        DEFAULT: {
          background: { base: "general-white" },
          text: { base: "general-black" },
          border: {
            base: oklch(65.68, 0.023, 218.74), // #82959B
          },
        },
        hovered: {
          background: { base: "brand-blue" },
          text: { base: "general-black" },
        },
        pressed: {
          background: { base: "brand-lightBlue" },
          text: { base: "general-black" },
        },
        disabled: {
          background: {
            base: oklch(37.45, 0.016, 221.78), // #384347
          },
          text: { base: "general-white/20" },
        },
      },
      secondary: {
        DEFAULT: {
          background: { base: "general-transparent" },
          text: { base: "general-black", dark: "general-white" },
          border: { base: "general-black", dark: "general-white" },
        },
        hovered: {
          background: { base: "general-transparent" },
          text: { base: "brand-blue" },
          border: { base: "brand-blue" },
        },
        pressed: {
          background: { base: "general-transparent" },
          text: { base: "brand-lightBlue" },
          border: { base: "brand-lightBlue" },
        },
        disabled: {
          background: {
            base: oklch(37.45, 0.016, 221.78), // #384347
          },
          text: { base: "general-white/20" },
          border: {
            base: oklch(37.45, 0.016, 221.78), // #384347
          },
        },
      },
    },
    carousel: {
      progressDot: {
        DEFAULT: {
          base: oklch(76.78, 0.022, 223.09), // #A5B7BE
          dark: oklch(28.64, 0.04, 219.85), // #102F38
        },
        active: {
          base: oklch(65.72, 0.024, 221.98), // #82959C
          dark: oklch(50.66, 0.078, 221.71), // #266F85
        },
      },
    },
    illustration: {
      line: {
        DEFAULT: {
          base: oklch(46.19, 0.016, 214.47), // #4F5B5E
          dark: "general-white",
        },
        secondary: {
          base: oklch(18.01, 0.024, 220.99), // #051419
          dark: oklch(92.05, 0.007, 106.53), // #E5E5E0
        },
      },
      bg: {
        base: oklch(98.86, 0.0088, 214.34), // #F5FDFF
        dark: oklch(18.01, 0.024, 220.99), // #051419
      },
      shadow: { base: "general-black/50", dark: "general-black" },
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
        20: "1.25rem",
        24: "1.5rem",
        26: "1.625rem",
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
        32: "2rem",
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
      animation: {
        "accordion-open": "accordion-open 0.25s ease",
        "accordion-close": "accordion-close 0.25s ease",
        "spin-subtle": "spin 20s linear infinite",
        "scale-up-from-t": "scale-up-from-t 4s ease-out infinite",
        "scale-up-from-br": "scale-up-from-br 4s ease-out infinite",
        "scale-up-from-bl": "scale-up-from-bl 4s ease-out infinite",
        "fade-in-first": "fade-in-first 4s linear infinite",
        "fade-in-second": "fade-in-second 4s linear infinite",
        "scale-group-a": "scale-group-a 4s ease-out infinite",
        "scale-group-b": "scale-group-b 4s ease-out infinite",
        "scale-group-c": "scale-group-c 4s ease-out infinite",
      },
      keyframes: {
        "accordion-open": {
          "0%": { height: 0 },
          "100%": { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-close": {
          "0%": { height: "var(--radix-accordion-content-height)" },
          "100%": { height: 0 },
        },
        "scale-up-from-t": {
          "0%": { transform: "translate(-22px, 22px) scale(2)" },
          "16.65%": { transform: "translate(-22px, 22px) scale(2)" },
          "33.3%": { transform: "translate(0px, 0px) scale(1)" },
          "83.25%": { transform: "translate(0px, 0px) scale(1)" },
          "100%": { transform: "translate(-22px, 22px) scale(2)" },
        },
        "scale-up-from-br": {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "16.65%": { transform: "translate(0px, 0px) scale(1)" },
          "33.3%": { transform: "translate(-22px, -22px) scale(2)" },
          "49.95%": { transform: "translate(-22px, -22px) scale(2)" },
          "66.6%": { transform: "translate(0px, 0px) scale(1)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        "scale-up-from-bl": {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "49.95%": { transform: "translate(0px, 0px) scale(1)" },
          "66.6%": { transform: "translate(22px, -22px) scale(2)" },
          "83.25%": { transform: "translate(22px, -22px) scale(2)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        "fade-in-first": {
          "0%": { opacity: 0 },
          "10%": { opacity: 0 },
          "20%": { opacity: 1 },
          "80%": { opacity: 1 },
          "90%": { opacity: 0 },
          "100%": { opacity: 0 },
        },
        "fade-in-second": {
          "0%": { opacity: 0 },
          "40%": { opacity: 0 },
          "50%": { opacity: 1 },
          "80%": { opacity: 1 },
          "90%": { opacity: 0 },
          "100%": { opacity: 0 },
        },
        "scale-group-a": {
          "0%": { transform: "scale(1)" },
          "10%": { transform: "scale(1.06)" },
          "20%": { transform: "scale(1.06)" },
          "30%": { transform: "scale(1.06)" },
          "40%": { transform: "scale(1)" },
          "100%": { transform: "scale(1)" },
        },
        "scale-group-b": {
          "0%": { transform: "scale(1)" },
          "30%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.06)" },
          "50%": { transform: "scale(1.06)" },
          "60%": { transform: "scale(1.06)" },
          "70%": { transform: "scale(1)" },
          "100%": { transform: "scale(1)" },
        },
        "scale-group-c": {
          "0%": { transform: "scale(1)" },
          "60%": { transform: "scale(1)" },
          "70%": { transform: "scale(1.06)" },
          "80%": { transform: "scale(1.06)" },
          "90%": { transform: "scale(1.06)" },
          "100%": { transform: "scale(1)" },
        },
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

        // Title Text Styles
        ".title-100": {
          fontFamily: theme("fontFamily.landing"),
          fontSize: theme("fontSize.20"),
          lineHeight: theme("lineHeight.32"),
          fontWeight: theme("fontWeight.regular"),
          textTransform: "uppercase",
          letterSpacing: "3px",
        },
        ".title-200": {
          fontFamily: theme("fontFamily.landing"),
          fontSize: theme("fontSize.26"),
          lineHeight: theme("lineHeight.34"),
          fontWeight: theme("fontWeight.regular"),
          textTransform: "uppercase",
          letterSpacing: "4px",
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
