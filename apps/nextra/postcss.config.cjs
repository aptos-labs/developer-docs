/** @type {import('postcss').Postcss} */
module.exports = {
  plugins: {
    tailwindcss: {},
    "@csstools/postcss-oklab-function": { preserve: true },
    autoprefixer: {},
  },
};
