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
        red: '#FC0C48',
        gray: '#5E5B65',
        gray2: '#EFF0F0',
        gray3: '#D9D9D9',
        gray5: '#a1a1a1',
      },
    },
  },
  plugins: [],
}

