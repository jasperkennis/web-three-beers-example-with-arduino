module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        display: ['RatherLoud'],
        body: ['Argone'],
      },
      colors: {
        default: '#70e4da',
      },
      keyframes: {
        fade: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
      },
      animation: {
        'fade-in': 'fade 4s normal forwards ease-in-out',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
