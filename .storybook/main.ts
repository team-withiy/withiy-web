import magicalSvg from "vite-plugin-magical-svg";
import tsConfigPaths from "vite-tsconfig-paths";

import type { StorybookConfig } from "@storybook/experimental-nextjs-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test",
  ],
  features: {
    experimentalRSC: true,
  },
  framework: {
    name: "@storybook/experimental-nextjs-vite",
    options: {},
  },

  viteFinal: async (config) => {
    config.plugins?.push(tsConfigPaths());
    config.plugins?.push(magicalSvg({ target: "react19" }));

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
