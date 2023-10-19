/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        btn: {
          background: 'hsl(var(--btn-background))',
          'background-hover': 'hsl(var(--btn-background-hover))',
          'background-action': 'hsl(var(--btn-background-action))',
          'background-action-hover': 'hsl(var(--btn-background-action-hover))'
        },
      },
    },
  },
  plugins: [],
}
