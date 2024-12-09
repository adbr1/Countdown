/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        "in": "in 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "out": "out 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "pulse": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        in: {
          from: { transform: "translateY(100%)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 },
        },
        out: {
          from: { transform: "translateY(0)", opacity: 1 },
          to: { transform: "translateY(100%)", opacity: 0 },
        },
        pulse: {
          "0%, 100%": { opacity: 1, transform: "scale(1)" },
          "50%": { opacity: 0.7, transform: "scale(1.02)" },
        },
      },
    },
  },
  plugins: [],
};