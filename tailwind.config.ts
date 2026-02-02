import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        fog: '#F7F7F5',
        slate: '#2D3436',
        sage: '#7C9082',
        'sage-dark': '#5C6E62',
        stone: '#E5E5E3',
        mist: '#B8C4BA',
        // Tetris accent colors (muted but vibrant)
        coral: '#E07A5F',
        golden: '#E9C46A',
        sky: '#7FB3D5',
        teal: '#2A6F7C',
        berry: '#9B4D6C',
        tangerine: '#F2994A',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
