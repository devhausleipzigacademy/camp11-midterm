/* @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src//*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFB43A',
        dark: {
          DEFAULT: '#1C1C27',
          light: '#363740',
        },
        white: {
          DEFAULT: '#FFFFFF',
          heavy: '#1C1C27',
          dimmed: '#363741',
        },
        error: '#EF4444',
        success: '#22C55E',
      },
    },
  },
  plugins: [],
};
