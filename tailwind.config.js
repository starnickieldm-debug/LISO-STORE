/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: {
          DEFAULT: '#F5F1EA',
          50: '#FAF8F5',
          100: '#F5F1EA',
          200: '#ECE5D8',
          300: '#DDD5C5',
          400: '#C7BC9E'
        },
        night: {
          950: '#211F1D',
          900: '#2B2825',
          800: '#383430',
          700: '#49443E',
          600: '#5D5750',
        },
        dawn: {
          amber: 'rgba(255, 195, 130, 0.12)',
          glow: 'rgba(255, 195, 130, 0.08)',
        },
        graphite: {
          DEFAULT: '#262320',
          50: '#FAF8F6',
          100: '#EFECE6',
          200: '#DDD8CE',
          300: '#B0AAA0',
          400: '#7E7870',
          500: '#5F5A53',
          600: '#45403B',
          700: '#34302C',
          800: '#262320',
          900: '#1F1D1A',
          950: '#171614',
        },
        vapor: {
          DEFAULT: '#E8E3DA',
          light: '#F0ECE4',
          dark: '#DDD7CB',
          border: '#D8D1C3'
        },
        accent: {
          DEFAULT: '#B4247C',
          hover: '#9E1C6C',
          dark: '#841559',
          light: '#FDF2F8',
          subtle: 'rgba(180, 36, 124, 0.08)',
          ring: 'rgba(180, 36, 124, 0.25)'
        }
      },
      fontFamily: {
        display: ["'Playfair Display'", 'Georgia', 'serif'],
        sans: ["'Instrument Sans'", '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ["'Instrument Sans'", '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ["'Playfair Display'", 'Georgia', 'serif'],
      },
      letterSpacing: {
        'tightest': '-0.035em',
        'tight': '-0.025em',
        'mono': '0.14em',
        'technical': '0.08em',
        'badge': '0.12em',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px -2px rgba(23, 24, 28, 0.05)',
        'dark-card': '0 8px 30px -4px rgba(0, 0, 0, 0.4)',
        'studio-hard': '6px 6px 0px rgba(23, 24, 28, 0.08)',
        'studio-hard-dark': '6px 6px 0px rgba(255, 255, 255, 0.08)',
        'rim-warm': 'inset 0 1px 1.5px 0 rgba(255, 220, 180, 0.22), 0 8px 24px -4px rgba(0, 0, 0, 0.6)',
        'premium': '0 12px 36px -4px rgba(26, 23, 20, 0.08), 0 4px 12px -2px rgba(26, 23, 20, 0.04)',
        'premium-lg': '0 20px 50px -8px rgba(26, 23, 20, 0.12), 0 8px 20px -4px rgba(26, 23, 20, 0.06)',
        'premium-image': '0 16px 40px -6px rgba(26, 23, 20, 0.12), 0 6px 16px -2px rgba(26, 23, 20, 0.06)',
        'premium-hover': '0 24px 60px -10px rgba(26, 23, 20, 0.16), 0 10px 24px -4px rgba(26, 23, 20, 0.08)',
      },
      transitionTimingFunction: {
        'vapor-m': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'vapor-l': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'mech-xs': 'cubic-bezier(0.2, 0, 0, 1)',
        'mech-s': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'mech-overshoot': 'cubic-bezier(0.34, 1.3, 0.64, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '250': '250ms',
        '600': '600ms',
        '1000': '1000ms',
      }
    },
  },
  plugins: [],
}
