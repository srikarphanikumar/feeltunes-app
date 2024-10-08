import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            backdropFilter: {
                'none': 'none',
                'blur': 'blur(20px)',
            },
            fontFamily: {
                'tomatoes': ['Tomatoes', 'cursive'],
                'attraction': ['Attraction', 'cursive'],
                'shalma': ['Shalma', 'cursive']
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
};
export default config;