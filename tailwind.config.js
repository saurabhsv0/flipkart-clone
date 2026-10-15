/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        fk: { blue: '#2874f0', yellow: '#ffe500', orange: '#fb641b', bg: '#f1f3f6', green: '#388e3c', text: '#212121', grey: '#878787' },
      },
      boxShadow: { fk: '0 1px 2px 0 rgba(0,0,0,.2)' },
    },
  },
  plugins: [],
};
