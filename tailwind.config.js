/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: '#8B0000',
          dark: '#4a0000',
          light: '#b30000',
        },
        black: {
          DEFAULT: '#0a0a0a',
          dark: '#050505',
        },
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        glow: 'glowPulse 2s ease-in-out infinite',
        fadeIn: 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        slideIn: 'slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        scaleIn: 'scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        borderGlow: 'borderGlow 2s infinite',
      },
      transitionTimingFunction: {
        'custom-bezier': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};