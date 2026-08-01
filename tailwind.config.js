/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0B0E14',
          900: '#11151D',
          850: '#161B25',
          800: '#1C2230',
          700: '#2A3242',
          600: '#3D4759',
        },
        mist: {
          50: '#FBFBFC',
          100: '#F6F7F9',
          200: '#EDEFF3',
          300: '#E1E4EA',
          400: '#C7CCD6',
        },
        brand: {
          DEFAULT: '#5B67F1',
          soft: '#818CF8',
          dim: '#3C46B0',
        },
        diamond: {
          DEFAULT: '#45C6E8',
          soft: '#8FE0F2',
        },
        win: {
          DEFAULT: '#29C48D',
          soft: '#7CE0BD',
        },
        loss: {
          DEFAULT: '#F0546B',
          soft: '#F6A0AE',
        },
        lp: '#D9A441',
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(10,13,20,0.04), 0 1px 1px 0 rgba(10,13,20,0.03)',
        'card-dark': '0 1px 2px 0 rgba(0,0,0,0.3)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        fillbar: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fillbar: 'fillbar 1.2s cubic-bezier(0.16,1,0.3,1) forwards',
        floatSlow: 'floatSlow 6s ease-in-out infinite',
        fadeUp: 'fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
      },
    },
  },
  plugins: [],
}
