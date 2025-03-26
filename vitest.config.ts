import react from "@vitejs/plugin-react";
import magicalSvg from "vite-plugin-magical-svg";
import tsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsConfigPaths(), magicalSvg({ target: "react19" })],
  test: {
    environment: "jsdom",
    include: ["**/*.test.+(ts|tsx|js)"],
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
    },
  },
});
