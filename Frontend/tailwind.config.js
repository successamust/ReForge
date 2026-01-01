/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        primary: {
          DEFAULT: "#A855F7",
          glow: "rgba(168, 85, 247, 0.4)",
        },
        muted: "#9CA3AF",
        accent: {
          red: "#EF4444",
          blue: "#3B82F6",
        }
      },
      fontFamily: {
        sans: ['Geist Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: 0.5, filter: 'blur(20px)' },
          '50%': { opacity: 1, filter: 'blur(30px)' },
        }
      }
    },
  },
  plugins: [],
}
