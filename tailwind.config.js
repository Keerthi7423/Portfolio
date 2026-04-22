/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#040408",
        space: "#0a0a12",
        deep: "#0d1020",
        surface: "#111827",
        "surface-raised": "#161d2e",
        border: "#1e2540",
        "border-glow": "#2a3560",
        "marvel-red": "#e23636",
        "marvel-red-dim": "#8b1a1a",
        "stark-gold": "#c8a951",
        "stark-gold-dim": "#7a6330",
        "arc-blue": "#4fc3f7",
        "arc-blue-dim": "#1565a0",
        "text-primary": "#f0f2ff",
        "text-secondary": "#8892b0",
        "text-tertiary": "#4a5568",
        "text-code": "#64ffda",
        "text-gold": "#c8a951",
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444",
      },
      fontFamily: {
        bebas: ["var(--font-bebas)", "Impact", "Anton", "sans-serif"],
        rajdhani: ["var(--font-rajdhani)", "sans-serif"],
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        sans: ["var(--font-ibm-sans)", "sans-serif"],
        mono: ["var(--font-ibm-mono)", "monospace"],
        chakra: ["var(--font-chakra)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

