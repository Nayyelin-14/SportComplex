/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#7d2923",
        secondary: "#2f4e03",
        dark: "#1e1e1e",
        light: "#f5f5f5",
        background: "#404040"
      },
      backgroundImage: {
        'custom-svg': "url('/src/assets/pattern-randomized.svg')",
        'mfu-bg': "url(/mfu.jpg)"
      },
      fontSize: {
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['20px', '28px'],
        xl: ['24px', '32px'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      }
    },
  },
  plugins: [],
}

