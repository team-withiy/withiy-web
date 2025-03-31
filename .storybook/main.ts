import path from "path";

import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  features: {
    experimentalRSC: true,
  },
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config) => {
    // MEMO: tsconfig alias
    config.resolve!.alias = {
      ...config.resolve?.alias,
      "@": [path.resolve(__dirname, "../src")],
    };
    config.resolve!.roots = [path.resolve(__dirname, "../public"), "node_modules"];

    // MEMO: @svgr/webpack
    const imageRule = config.module?.rules?.find((rule) => {
      const test = (rule as { test: RegExp }).test;
      if (!test) return false;
      return test.test(".svg");
    }) as { [key: string]: unknown };

    imageRule.exclude = /\.svg$/;

    config.module?.rules?.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  staticDirs: [
    "../public",
    {
      from: "../src/app/ui/assets/fonts/PretendardJP",
      to: "src/app/ui/assets/fonts/PretendardJP",
    },
  ],
};
export default config;
