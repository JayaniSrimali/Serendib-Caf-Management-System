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
                    bg: '#FDFBF7', // Clean professional light cream
                    dark: '#000000', // Pure Black for high-end contrast
                    card: '#FFFFFF', // Pure White for UI cards
                    text: '#1A1A1A', // Deep Charcoal/Black for primary text
                    textMuted: '#6B5E54', // Warm Earthy Brown for secondary text
                    accent: '#8B5E3C', // Professional Rich Roasted Coffee Brown
                    accentDark: '#5E3C25', // Deep Dark Brown
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
