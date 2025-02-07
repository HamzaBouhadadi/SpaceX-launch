/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Assurez-vous que tous vos fichiers sont inclus ici
  ],
  theme: {
    extend: {
      colors: {
        'spacex-blue': '#005288',
        'spacex-gray': '#333333',
      },
    },
  },
  plugins: [],
};
