/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    colors: {
      'black':'#1B1B1B',
      'white':'#ffffff',
      'yellow':'#FFD15B',
      'grey':'#D3D3D3',
      'BlackLight':'#A9A9A9',
    },
    backgroundImage: {
      'banner':"url('assets/banner.svg')",
      'iconeSearch': "url('/assets/icones/serachIcone.svg')",
      'close': "url('/assets/icones/close.svg')",
    },
    fontFamily: {
      'sans':'Anton, sans-serif',
      'Manrope':'Manrope sans-serif',
      'Roboto':'Roboto, sans-serif;'
    },
    extend: {
      screens: {
        'lg':'1440px',
    },
    lineHeight: {
      '12': '3rem',
    }
  },
  plugins: [],
}
}