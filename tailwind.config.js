/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mob: "300px",
        // => @media (min-width: 640px) { ... }

        tab: "667px",
        // => @media (min-width: 768px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1500px",
        // => @media (min-width: 1536px) { ... }
      },
      container: {
        center: true,
      },
      colors: {
        "text-color-primary": "#737681",

        "bg-color1": "#161421",
        "bg-color2": "#2B2740",
        "bg-color3": "#3c3955",

        "hover-color": "#57546e",

        "border-color": "#273B71",
        "border-hover-color": "#681f40",

        "red-color": "#FF0000",
        "blue-color": "#0055FF",
        "yellow-color": "#FFF000",
      },
    },
  },
  plugins: [],
};
