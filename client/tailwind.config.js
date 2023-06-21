/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'dm-sans': ['"DM Sans"', 'sans-serif']
      },
      colors: {
        'white': '#f6f7f9',
        'bloo': '#4fa0bc',
        'darker-purp': '#2d2d39',  
        'dark-purp': '#3f4156',
        'purp': '#52546e',
        'light-purp': '#696d97',
        'sky-blue' : '#70c6dd',
        'light-blue': '#6fc1d8',
        'cement': '#b1bcbc',
        'light-gray': '#363a47',
        'dark-gray': '#23272e',
        'darker-gray': '#181c20',  
      },
      outline: {
        none: ['focus'],
      },
    },
  },
  variants: {
    extend: {
      outline: ['focus'],
    },
  },
  plugins: [],
}