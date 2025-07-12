import Toggle from ".";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: {
    docs: {
      description: {
        component: "Toggle 컴포넌트입니다.<br/>체크박스와 같은 상태를 가지기에 클릭 시마다 상태가 변화합니다.",
      },
    },
  },
  argTypes: {
    disabled: {
      description: "Toggle 비활성화 여부",
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
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {},
};
