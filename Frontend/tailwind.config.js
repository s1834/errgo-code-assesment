/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#5f23b2',
          secondary: '#9085f3',
        },
        fontSize: {
          xxs: '11px',
          smallest: '9px'
        }
      },
    },
    plugins: [
      // require('@tailwindcss/forms'),
    ],
  }
  
  