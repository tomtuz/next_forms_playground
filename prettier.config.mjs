/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  trailingComma: 'none',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  printWidth: 80,
  useTabs: false,
  bracketSpacing: true,
  plugins: ['prettier-plugin-tailwindcss']
}

export default config
