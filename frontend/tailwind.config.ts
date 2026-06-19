import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        espresso: {
          DEFAULT: '#2c1810',
          light: '#4a2f23',
        },
        cream: {
          DEFAULT: '#faf3eb',
          dark: '#f0e4d4',
        },
        copper: {
          DEFAULT: '#b87333',
          light: '#d4956a',
        },
      },
      fontFamily: {
        display: ['Roboto Mono', 'monospace'],
        body: ['Outfit', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
