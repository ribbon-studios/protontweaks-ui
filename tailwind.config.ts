import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,mjs,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        secondary: '#29303d',
        accent: '#1d202a',
      },
    },
  },
  plugins: [],
} satisfies Config;
