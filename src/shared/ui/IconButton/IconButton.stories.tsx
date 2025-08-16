import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { IconHeart16 } from "public/icons";

import IconButton from ".";

const meta: Meta<typeof IconButton> = {
  title: "Components/Button/IconButton",
  component: IconButton,
  parameters: {
    docs: {
      description: {
        component: "아이콘버튼 컴포넌트입니다.<br/>2가지의 스타일을 지원합니다.",
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
        value: ["outline", "primary"],
      },
      control: {
        type: "select",
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
    variant: "outline",
    children: "IconButton",
    disabled: false,
    icon: <IconHeart16 />,
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  args: {
    type: "button",
    variant: "primary",
    children: "PRIMARY IconButton",
  },
};

export const Outline: Story = {
  args: {
    type: "button",
    variant: "outline",
    children: "OUTLINE IconButton",
  },
};
