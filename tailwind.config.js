/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /* Palette pulled from the scene itself: deep sky, horizon blue,
           haze, and the biplane's warm signal light. */
        ink: "#0B1220",
        paper: "#F7F9FC",
        horizon: "#0072FF",
        sky: { DEFAULT: "#00C6FF", 50: "#EDF5FF" },
        haze: "#64748B",
        rule: "#E2E8F0",
        signal: "#FF9F1C",
        /* sampled from the island: tower roofs and the ground */
        roof: "#B9553A",
        sand: { DEFAULT: "#F3F1E1", edge: "#DCDCB9" },
        muted: "#475569",

        /* kept for backwards compatibility with existing classes */
        gray: { 200: "#D5DAE1" },
        black: { DEFAULT: "#000", 500: "#1D2235" },
        blue: { 500: "#2b77e7" },
      },
      fontFamily: {
        display: ["Bricolage Grotesque", "system-ui", "sans-serif"],
        worksans: ["Work Sans", "system-ui", "sans-serif"],
        /* B612 was drawn for Airbus cockpit displays: it sets every date,
           count and status label on the site */
        mono: ["B612 Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        /* legacy class, resolves to the display face */
        poppins: ["Bricolage Grotesque", "system-ui", "sans-serif"],
      },
      fontSize: {
        meta: ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.06em" }],
      },
      boxShadow: {
        card: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
        lift: "0 18px 40px -24px rgba(11, 18, 32, 0.35)",
      },
      transitionTimingFunction: {
        glide: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
