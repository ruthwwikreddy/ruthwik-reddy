/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          400: '#3b82f6',
          600: '#2563eb',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        glow: 'glowPulse 2s ease-in-out infinite',
        fadeIn: 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        slideIn: 'slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        scaleIn: 'scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
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