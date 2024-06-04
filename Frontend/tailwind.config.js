/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "1200px": "1200px",
        "1100px": "1100px",
        "1000px": "1000px",
        "900px": "900px",
        "800px": "800px",
        "750px": "750px",
        "600px": "600px",
        "550px": "550px",
        "500px": "500px",
        "400px": "400px",
        "300px": "300px",
      },
    },
  },
  darkMode: "selector",
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none" /* Internet Explorer 10+ */,
          "scrollbar-width": "none" /* Firefox */,
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
    require("daisyui"),
  ],
};
