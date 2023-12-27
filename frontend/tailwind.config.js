/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [function({addBase, theme}){
    addBase({

        'h1, .h1': { 
            fontSize: theme('fontSize.4xl'), 
        },
        'h2, .h2': { 
            fontSize: theme('fontSize.3xl'), 
        },
        'h3, .h3': { 
            fontSize: theme('fontSize.2xl'), 
        },
        'h1, h2, h3, h4, h5, h6': {
            marginTop: "2rem",
            marginBottom: "1rem",
        },

        "input:focus-visible, textarea:focus-visible":{
            outline: "none",
        },


        'p': {
            "margin-bottom": theme('margin.2') 
        },
        'a': {
            // Без этого :first-letter не работает
            display: "inline-block", 
        },
        'a:first-letter':{
            "text-decoration": "underline",
        },
        'a:hover': {
            color: theme('colors.red.600'),
        },
    })
  }],
}
