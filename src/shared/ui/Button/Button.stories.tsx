import { Meta, StoryObj } from "@storybook/react";

import Button from ".";

const meta: Meta<typeof Button> = {
  title: "Components/Button/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "버튼 컴포넌트입니다.<br/>4가지의 스타일과 3가지의 크기를 지원하며, hover, active, disabled 상태에 따라 스타일이 변경됩니다.<br/>상태가 변화함에 따라 0.2s ease-in-out 트랜지션이 적용됩니다.",
      },
    },
  },
  argTypes: {
    type: {
      table: {
        disable: true,
      },
    },
    variant: {
      description: "버튼 스타일 유형",
      type: {
        required: true,
        name: "enum",
        value: ["default", "filledGray", "outline", "text"],
      },
      control: {
        type: "select",
      },
    },
    size: {
      description: "버튼 크기",
      type: {
        required: true,
        name: "enum",
        value: [52, 44, 36],
      },
      control: {
        type: "select",
      },
    },
    full: {
      description: "버튼이 100% 너비를 차지하는지 여부",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      description: "버튼 비활성화 여부",
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
    children: {
      description: "버튼에 표시될 텍스트",
      control: {
        type: "text",
      },
    },
  },
  args: {
    type: "button",
    variant: "default",
    size: 52,
    full: false,
    children: "BUTTON",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    type: "button",
    variant: "default",
    size: 52,
    full: false,
    children: "DEFAULT BUTTON",
  },
};

export const FilledGray: Story = {
  args: {
    type: "button",
    variant: "filledGray",
    size: 52,
    full: false,
    children: "FILLED GRAY BUTTON",
  },
};

export const Outline: Story = {
  args: {
    type: "button",
    variant: "outline",
    size: 52,
    full: false,
    children: "OUTLINE BUTTON",
  },
};

export const Text: Story = {
  args: {
    type: "button",
    variant: "text",
    size: 52,
    full: false,
    children: "TEXT BUTTON",
  },
};
