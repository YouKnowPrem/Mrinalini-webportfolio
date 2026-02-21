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
                parchment: {
                    DEFAULT: "#F5F1E8",
                    dark: "#E8E2D6",
                },
                primary: {
                    DEFAULT: "#3A2E2A", // Deep brown
                    light: "#5A4E4A",
                },
                secondary: {
                    DEFAULT: "#1F2A38", // Muted navy
                    light: "#3A4A5A",
                },
            },
            fontFamily: {
                serif: ["var(--font-playfair)", "serif"],
                body: ["var(--font-lora)", "serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            container: {
                center: true,
                padding: "1rem",
                screens: {
                    sm: "100%",
                    md: "100%",
                    lg: "1024px",
                    xl: "1280px",
                    "2xl": "1280px",
                },
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};

export default config;
