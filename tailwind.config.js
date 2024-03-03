/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx,tsx,ts,js}",'./index.html'],
  theme: {
    extend: {
      colors:{
        'dark-primary':"#2D554A",
        "semi-dark-primary":"#237C6C",
        "primary":"#5EBAA6",
        "light-primary":"#B8E1D9",
        "light":"#F0F0F8",
        "blue-1":"#cbd4ff",
        "blue-2":"#c0c7ff",
        "blue-3":"#aeb8ff",
        "blue-4":"#96a2ff",
        "blue-5":"#8189ff"
      }
    },
  },
  plugins: [],
}

