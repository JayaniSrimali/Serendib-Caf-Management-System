/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brown: {
                    50: '#fdf8f6',
                    100: '#f2e8e5',
                    200: '#eaddd7',
                    300: '#e0cec7',
                    400: '#d2bab0',
                    500: '#a37c68', // main brown
                    600: '#7b5844',
                    700: '#5a3d2b',
                    800: '#412a1c',
                    900: '#2b1a10',
                },
                cream: {
                    DEFAULT: '#FDFBF7',
                    100: '#F5F0E6',
                },
                gold: {
                    DEFAULT: '#D4AF37',
                    100: '#F3E5AB',
                    200: '#E6C200',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            }
        },
    },
    plugins: [],
}
