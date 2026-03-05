/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                theme: {
                    bg: '#F8F1EB', // Light cream background from design
                    dark: '#382D26', // Dark brown used for text and footer
                    accent: '#BA8454', // Caramel/Light brown for buttons
                    accentDark: '#8C5A35',
                    card: '#FFFFFF',
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
