/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'Fondo': '#1E213A',
        'otroFondo':'#100E1D',
        'botonBusqueda':'#3C47E9',
        'searchPlaces':'#6E707A',
        'barraHumedad':'#E7E7EB',
        'humedad':'#FFEC65',
        'farenheit':'#585676',
        'celsius':'#110E3C'
        

        
        
        
      },
      fontFamily:{
        'Barlow':['Barlow', 'sans-serif'],
        'Fraunces':['Fraunces', 'serif'],
        'Raleway':['Raleway']
      },
      screens:{
        'tablet':'700px',
        'desktop':'1440px'
      }
    },
  },
  plugins: [],
}