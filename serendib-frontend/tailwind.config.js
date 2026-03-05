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
                    bg: '#0F0B09', // Deepest black-brown background
                    dark: '#1C130E', // Slightly lighter dark brown for contrasting sections
                    card: '#1F1511', // Card background (almost black brown)
                    text: '#EAE0D5', // Light cream color for main text
                    textMuted: '#A8998C', // Muted text color for secondary info
                    accent: '#D49A6A', // Bright Caramel for primary actions
                    accentDark: '#A6734A', // Darker Caramel for hover states
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
