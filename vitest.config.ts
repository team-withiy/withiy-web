import react from "@vitejs/plugin-react";
import path from "path";
import magicalSvg from "vite-plugin-magical-svg";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), magicalSvg({ target: "react19" })],
  test: {
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      public: path.resolve(__dirname, "public"),
    },
  },
});
