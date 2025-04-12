import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Checkbox from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: "Checkbox 컴포넌트입니다.",
      },
    },
  },
  argTypes: {
    children: {
      description: "Checkbox에 표시될 텍스트",
      control: {
        type: "text",
      },
    },
    size: {
      description: "Checkbox의 크기",
      type: {
        required: true,
        name: "enum",
        value: [24, 20],
      },
      control: {
        type: "select",
      },
    },
    disabled: {
      description: "Checkbox 비활성화",
      control: {
        type: "boolean",
      },
    },
  },
  args: {
    children: "Checkbox",
    onChange: fn(),
    size: 24,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Large: Story = {
  args: {
    children: "Large Checkbox",
    onChange: fn(),
    size: 24,
    disabled: false,
  },
};

export const Medium: Story = {
  args: {
    children: "Medium Checkbox",
    onChange: fn(),
    size: 20,
    disabled: false,
  },
};
