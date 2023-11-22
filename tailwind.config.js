/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        raisedBackground: 'var(--raised-background)',
        background: 'var(--background)',
        foreground: 'hsl(var(--foreground))',
        label: 'var(--label)',
        btn: {
          background: 'hsl(var(--btn-background))',
          'background-hover': 'hsl(var(--btn-background-hover))',
          'background-action': 'hsl(var(--btn-background-action))',
          'background-action-hover': 'hsl(var(--btn-background-action-hover))'
        },
      },
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
  darkMode: 'media'
}