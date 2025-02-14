/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { // UI가이드에 따른 대표 컬러 지정
        transparent: 'transparent',
        point: '#395EA1',
        black: '#222',
        gray: '#5E5B65',
      },
    },
  },
  plugins: [],
}

