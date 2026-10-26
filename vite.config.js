import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.glb"],
  preview: {
    host: true,
    allowedHosts: [".onrender.com"],
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    // Inline anything under 4kb (most icons) so they cost zero requests.
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 900,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        /**
         * Three.js is by far the heaviest dependency. Splitting it into its
         * own chunk means the browser caches it separately — shipping a copy
         * change to About or Projects no longer invalidates ~500kb of WebGL.
         */
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (
            id.includes("three") ||
            id.includes("@react-three") ||
            id.includes("@react-spring")
          ) {
            return "three-vendor";
          }
          if (id.includes("react-router") || id.includes("react-dom")) {
            return "react-vendor";
          }
        },
      },
    },
  },
  esbuild: {
    // Strip debug output from production builds.
    drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
  },
});
