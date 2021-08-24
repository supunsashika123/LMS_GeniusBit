module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    extend: {
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
      },
      minWidth: {
        1: '2.125rem',
      },
      borderWidth: {
        1: '1px',
        3: '3px',
      },
      height: {
        'chart-lg': '458px',
      },
    },
    fontFamily: {
      sans: 'Public Sans',
      lato: 'Lato',
      Abhaya: 'Abhaya',
    },
    fontSize: {
      '3xs': '0.75rem',
      '2xs': '0.8125rem', // 13px
      xs: '0.875rem', // 14px
      sm: '0.9375rem', // 15px
      base: '1rem', // 16px
      lg: '1.063rem', // 17px
      xl: '1.125rem', // 18px
      '2xl': '1.5rem', // 24px
      '3xl': '1.625rem', // 26px
      '4xl': '2.063rem', // 33px
      '5xl': '2.5rem', // 40px
      '6xl': '2.875rem', // 46px
    },
    colors: {
      pink:'#EBE5E5',
      transparent: 'transparent',
      black: '#001122',
      red: '#DC0000',
      gray: {
        900: '#191919',
        800: '#8B8C98',
        700: '#A7A9BE',
        600: '#DDDEED',
        400: '#EFF2FD',
        300: '#EEEFF6',
        200: '#F4F5FB',
        100: '#FBFBFD',
      },
      white: '#FFF',
      orange: '#FDC24F',
      lightcyan: '#25DBDB',
      green: {
        900: '#08805b',
        800: '#13c38c',
        700: '#33C79A',
        400: '#ACE88B',
      },
      coral: {
        900: '#ff3333',
        700: '#F27272',
        600: '#FD8377',
      },
      purple: {
        800: '#303C91',
        700: '#5B50D0',
        600: '#596FD0',
        200: '#EBEFFC',
        100: '#F6F7FE',
      },
    },
  },
  variants: {
    backgroundColor: ({ after }) => after(['hover', 'focus']),
    textColor: ({ after }) => after(['active', 'hover']),
    textOpacity: ({ after }) => after(['active']),
    width: ({ after }) => after(['focus-within']),
    opacity: ({ after }) => after(['focus-within']),
  },
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
}
