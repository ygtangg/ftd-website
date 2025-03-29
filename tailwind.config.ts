import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#730909',
        lightpink: '#E5C9C9'
      },
      fontSize: {
        '20xl': '12rem',
      },
    },
  },
  plugins: [],
};
export default config;
