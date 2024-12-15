import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      keyframes: {
        blink: {
          to: { opacity: '0' },
        },
      },
      animation: {
        typing: 'blink 1.5s steps(2) infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
