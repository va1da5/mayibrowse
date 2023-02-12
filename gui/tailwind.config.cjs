/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        stock: [defaultTheme.fontFamily.sans],
      },
      animation: {
        blob: "blob 8s infinite",
        tilt: "tilt 10s infinite linear",
        ghost: "ghost 10s infinite linear",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1)",
          },
        },
        tilt: {
          "0%, 50%, 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(-0.6deg) scale(1.01)",
          },
          "45%": {
            transform: "rotate(0.3deg)",
          },
          "75%": {
            transform: "rotate(-0.3deg) scale(0.99)",
          },
        },
        ghost: {
          "0%": {
            transform: "translate(0px, 0px) scale(1) rotate(1)",
          },
          "33%": {
            transform: "translate(60px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 40px) scale(0.9)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1) rotate(45)",
          },
        },
      },
    },
  },
  plugins: [],
};
