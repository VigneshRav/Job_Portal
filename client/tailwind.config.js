/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* ✅ Custom Colors */
      colors: {
        primary: "#004AAD",
        secondary: "#FFCA28",
        background: "#F7F7F7",
        textBgLight: "#ADD5FF",
        textBgSoft: "#FFEBC1",
      },

      /* ✅ Custom Fonts */
      fontFamily: {
        primary: ["Syne", "serif"],
        secondary: ["Outfit", "serif"],
      },

      /* ✅ Keyframes */
      keyframes: {
        /* Slide Down */
        slideDown: {
          "0%": {
            transform: "translateY(-100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },

        /* Gradient Animation */
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },

      /* ✅ Animations */
      animation: {
        slideDown: "slideDown 0.4s ease-out forwards",
        gradient: "gradient 8s ease infinite",
      },

      /* ✅ Background Size Utility (for animated gradients) */
      backgroundSize: {
        200: "200% 200%",
      },
    },
  },
  plugins: [],
};
