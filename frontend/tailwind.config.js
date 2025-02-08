/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        tertiary: "var(--tertiary-color)",
        primaryText: "var(--text-primary)",
        secondaryText: "var(--text-secondary)",
        green: "var(--green)",
      },
    },
  },
  plugins: [],
};
