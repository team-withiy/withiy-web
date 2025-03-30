import React from "react";

import { PretendardJP } from "../src/app/ui";

import type { Preview } from "@storybook/react";
import "../src/app/ui/styles/global.scss";

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <div className={PretendardJP.variable}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
