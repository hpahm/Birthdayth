/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        macintosh: [
          '"Macintosh Skeletal Filled"',
          "-apple-system",
          "BlinkMacSystemFont",
          "cursive",
          "sans-serif",
        ],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Text"',
          '"SF Pro Display"',
          '"SF Pro"',
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        pastel: {
          bg: '#FFF5F7',
          light: '#FFF0F3',
          card: 'rgba(255, 255, 255, 0.8)',
          border: 'rgba(255, 255, 255, 0.85)',
          peach: '#FFB6C1',
          rose: '#FF8E9E',
          deep: '#E85D75',
          dark: '#3D3437',
          subtle: '#827479',
          cream: '#FFF9FA',
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(255, 182, 193, 0.2)',
        'glass-hover': '0 14px 40px 0 rgba(255, 182, 193, 0.35)',
        'soft-glow': '0 0 25px rgba(255, 182, 193, 0.5)',
      },
      animation: {
        'flicker': 'flicker 1.8s ease-in-out infinite alternate',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { transform: 'scale(1) rotate(-1deg)', opacity: '0.95' },
          '25%': { transform: 'scale(1.06, 0.95) rotate(1deg)', opacity: '1' },
          '50%': { transform: 'scale(0.96, 1.05) rotate(-0.5deg)', opacity: '0.85' },
          '75%': { transform: 'scale(1.03, 1) rotate(0.8deg)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
