/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"],
      },
      colors: {
        // Override or extend standard colors with the requested palette
        gray: {
          900: "#111827", // Main background
          800: "#1f2937", // Secondary background (cards, headers)
          700: "#374151", // Input/Button backgrounds
          600: "#4b5563", // Borders
          500: "#6b7280", // Muted text
          400: "#9ca3af", // Placeholder text
          300: "#d1d5db", // Secondary text
          100: "#f3f4f6", // Primary text
        },
        indigo: {
          400: "#818cf8", // Accent text / icons
          500: "#6366f1", // Ring focus
          600: "#4f46e5", // Primary button bg
          700: "#4338ca", // Primary button hover
        },
        red: {
          400: "#f87171", // Error text
          500: "#ef4444", // Error border/bg
        },
        amber: {
          500: "#f59e0b", // Warning / Lock icon
        },
        green: {
          500: "#22c55e", // Success
        },
        
        // Map abstract names to these colors for semantic usage
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "#6366f1", // Indigo 500
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        // Custom sidebar colors
        sidebar: {
          DEFAULT: "#111827", // Gray 900
          foreground: "#f3f4f6", // Gray 100
          primary: "#4f46e5", // Indigo 600
          "primary-foreground": "#ffffff",
          accent: "#1f2937", // Gray 800
          "accent-foreground": "#818cf8", // Indigo 400
          border: "#374151", // Gray 700
          ring: "#6366f1", // Indigo 500
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: `calc(var(--radius) - 4px)`,
        xl: `calc(var(--radius) + 4px)`,
        '2xl': `calc(var(--radius) + 8px)`,
        '3xl': `calc(var(--radius) + 12px)`,
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}