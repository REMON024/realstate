import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74',
          400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c',
          800: '#9a3412', 900: '#7c2d12',
        },
        sidebar: {
          DEFAULT: '#0d1b2e',
          hover: '#162236',
          active: '#1e3a5f',
          border: 'rgba(255,255,255,0.06)',
          text: 'rgba(255,255,255,0.55)',
          heading: 'rgba(255,255,255,0.25)',
        },
        bg: {
          DEFAULT: '#f0f2f8',
          card: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-md': '0 4px 12px rgba(0,0,0,0.08)',
        'orange': '0 4px 14px rgba(249,115,22,0.35)',
        'nav': '0 0 0 1px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
}
export default config
