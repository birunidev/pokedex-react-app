/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        types: {
          grass: "#9BCC50",
          poison: "#B97FC9",
          fire: "#FD7D24",
          water: "#4592C4",
          bug: "#729F3F",
          normal: "#A4ACAF",
          electric: "#EED535",
          fairy: "#FDB9E9",
          ground: "#AB9842",
          flying: "#3DC7EF",
        },
      },
    },
  },
  plugins: [],
};
