
import tailwindScrollbarHide from 'tailwind-scrollbar-hide';

export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                green: {
                    600: "#22c55e",
                },
            },
            animation: {
                'fade-in-out': 'fadeInOut 2.5s ease-in-out forwards',
            },
            keyframes: {
                fadeInOut: {
                    '0%': { opacity: 0 },
                    '10%': { opacity: 1 },
                    '90%': { opacity: 1 },
                    '100%': { opacity: 0 },
                }
            }
        },
    },

    plugins: [
        tailwindScrollbarHide
    ],
}
