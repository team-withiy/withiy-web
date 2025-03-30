import react from "@vitejs/plugin-react";
import magicalSvg from "vite-plugin-magical-svg";
import tsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsConfigPaths(), magicalSvg({ target: "react19" })],
  optimizeDeps: {
    include: ["@mdx-js/react"],
  },
  test: {
    environment: "jsdom",
    include: ["**/*.test.+(ts|tsx|js)"],
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      exclude: [
        // 테스트 파일
        "**/*.test.{ts,tsx}",
        "**/*.spec.{ts,tsx}",

        // 목업 데이터
        "**/mocks/**",
        "**/__mocks__/**",

        // 설정 파일
        "vitest.config.ts",
        "vitest.setup.ts",
        "vitest.workspace.ts",
        "next.config.ts",
        "**.config.{js,ts}",

        // Next.js 특정 파일
        ".next/**",
        "public/**",
        "next-env.d.ts",
        "instrumentation.ts",
        "instrumentation-client.ts",

        // 타입 정의 파일
        "**/*.d.ts",

        // 기타
        "**/stories/**",
        "**/*.stories.{ts,tsx}",
        "**/*.stories.mdx",
        ".storybook/**",
        "coverage/**",
        "node_modules/**",
        ".lintstagedrc.js",
      ],
    },
  },
});
