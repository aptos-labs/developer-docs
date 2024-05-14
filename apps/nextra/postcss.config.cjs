/** @type {import('postcss').Postcss} */
module.exports = {
  plugins: {
    "tailwindcss/nesting": {},
    tailwindcss: {},
    "@csstools/postcss-oklab-function": { preserve: true },
    autoprefixer: {},
  },
};
