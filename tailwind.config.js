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
        yellow:'#FFD231', 
        gray: '#5E5B65',
        gray2: '#EFF0F0',
        gray3: '#D9D9D9',
        gray4: '#DDDDDD',
        gray5: '#a1a1a1',
      },
      screens: {/*사용 안함 : 적용된 파일 수정 후 삭제 예정*/
        '2xl': '1200px', //@media (min-width: 1200px) 
        'xl': '1000px', //@media (min-width: 1000px) 
        'md': '800px', //@media (min-width: 800px) 
        'sm': '500px', //@media (min-width: 500px) 
        'xs': '300px', //@media (min-width: 300px)
        //max-width 기준
        'max-500':{max:'500px'},
        'max-800':{max:'800px'},
        'max-1000':{max:'1000px'},
        'max-1200':{max:'1200px'},
        'max-1300':{max:'1300px'},
      }, 
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'), //말줄임
  ],
}

