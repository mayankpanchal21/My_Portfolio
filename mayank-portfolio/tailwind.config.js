/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#09090b',
          900: '#0e0e11',
          850: '#131317',
          800: '#18181d',
          700: '#232329',
          600: '#34343c',
        },
        fg: {
          DEFAULT: '#ececef',
          muted: '#a1a1aa',
          subtle: '#71717a',
        },
        accent: {
          DEFAULT: '#7c86ff',
          soft: '#a5abff',
          dim: 'rgba(124, 134, 255, 0.12)',
        },
        pending: {
          DEFAULT: '#e8b45a',
          dim: 'rgba(232, 180, 90, 0.08)',
        },
      },
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
      },
      maxWidth: {
        content: '72rem',
      },
    },
  },
  plugins: [],
};
