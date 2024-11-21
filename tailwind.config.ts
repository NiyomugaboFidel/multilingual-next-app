import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Enable dark mode using a class
  theme: {
    extend: {
      colors: {
        'dark-purple-1': '#362131',
        'dark-purple-2': '#322730',
        primaryColor:{
          light:'#222934',
          DEFAULT:'#222934',
          dark:'#181D25'
        },
        textColor:{
          light:'#FFFFFF',
          DEFAULT:'#FFFFFFCC',
          dark:'#333D4C'
        },
        customSilver: {
          light: '#D3D3D3',  // Example value, adjust as needed
          DEFAULT: '#F4F4F7',
          dark: '#A9A9A9',   // Example value, adjust as needed
        },
        Gary:{
          900:'#181D25',
          800:'#222934',
          700:'#333D4C',
          300:'#CAD0D9',
          100:'#EEF1F6'
        },

        Magenta: {
          400: '#4A3AFF',
          300: '#A59DFF',
          200: '#D2CEFF',
          100: '#E9E7FF',
        },
        Blue: {
          400: '#3A95FF',
          300: '#9DCAFF',
          200: '#CDE4FF',
          100: '#ECF5FF',
        },
        Green: {
          400: '#3EFF3A',
          300: '#9FFF9D',
          200: '#CEFFCD',
          100: '#ECFFEC',
        },
        Yellow: {
          400: '#FFEB3A',
          300: '#FFF69D',
          200: '#FFFACD',
          100: '#FFFDEC',
        },
        Red: {
          400: '#FF3A46',
          300: '#FF9DA3',
          200: '#FFCDDO',
          100: '#F55266',
        },
        gradientStart: '#ACCBEE',
        gradientEnd: '#E7F0FD',
        'custom-dark-1': '#1B273A',
        'custom-dark-2': '#1F2632',
        // Add more custom colors here
      },
      fontSize: {
        display1: ['78px', { lineHeight: '84px' }],
        display2: ['62px', { lineHeight: '76px' }],
        display3: ['44px', { lineHeight: '52px' }],
        display4: ['28px', { lineHeight: '40px' }],
        headingH1: ['40px', { lineHeight: '48px' }],
        headingH2: ['32px', { lineHeight: '42px' }],
        headingH3: ['24px', { lineHeight: '34px' }],
        headingH4: ['22px', { lineHeight: '28px' }],
        headingH5: ['18px', { lineHeight: '24px' }],
        headingH6: ['16px', { lineHeight: '22px' }],
        bodyLarge: ['18px', { lineHeight: '32px' }],
        bodyDefault: ['16px', { lineHeight: '24px' }],
        bodySmall: ['14px', { lineHeight: '22px' }],
        textSingle400: ['18px', { lineHeight: '20px' }],
        textSingle300: ['16px', { lineHeight: '18px' }],
        textSingle200: ['14px', { lineHeight: '16px' }],
        textSingle100: ['12px', { lineHeight: '14px' }],
        textBold: ['14px', { lineHeight: '26px', fontWeight: '700' }],
        textLink: ['14px', { lineHeight: '26px' }],
        bulletList: ['14px', { lineHeight: '26px' }],
        numberedList: ['14px', { lineHeight: '26px' }],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semiBold:'600',
        bold: '700',
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
