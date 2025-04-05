import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import UnderlineButton from "./UnderlineButton";

const meta: Meta<typeof UnderlineButton> = {
  title: "Components/Button/UnderlineButton",
  component: UnderlineButton,
  parameters: {
    docs: {
      description: {
        component:
          "Underline 버튼 컴포넌트입니다.<br/>3가지의 크기를 지원하며, hover, active, disabled 상태에 따라 스타일이 변경됩니다.<br/>상태가 변화함에 따라 0.2s ease-in-out 트랜지션이 적용됩니다.",
      },
    },
  },
  argTypes: {
    type: {
      table: {
        disable: true,
      },
    },
    size: {
      description: "버튼 크기",
      type: {
        required: true,
        name: "enum",
        value: [24, 20, 16],
      },
      control: {
        type: "select",
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
    disabled: false,
    size: 24,
    children: "UNDERLINE BUTTON",
  },
};

export default meta;
type Story = StoryObj<typeof UnderlineButton>;

export const Default: Story = {
  args: {
    type: "button",
    children: "UNDERLINE BUTTON",
    onClick: fn(),
  },
};
