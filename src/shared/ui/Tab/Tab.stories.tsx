import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Tab from "./Tab";

const meta: Meta<typeof Tab> = {
  title: "Components/Tab",
  component: Tab,
  parameters: {
    docs: {
      description: {
        component: "Tab 컴포넌트입니다.<br/>체크박스와 같은 상태를 가지기에 클릭 시마다 상태가 변화합니다.",
      },
    },
  },
  argTypes: {
    children: {
      description: "Tab에 표시될 텍스트",
      control: {
        type: "text",
      },
    },
    disabled: {
      description: "Tab 비활성화 여부",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: { summary: "false" },
      },
      control: {
        type: "boolean",
      },
    },
  },
  args: {
    children: "TAB",
    disabled: false,
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Tab>;

export const Default: Story = {
  args: {},
};
