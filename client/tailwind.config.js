
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
        },
    },

    plugins: [
        tailwindScrollbarHide
    ],
}
