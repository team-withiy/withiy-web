import { Meta, StoryObj } from "@storybook/react";

import Loading from ".";

const meta: Meta<typeof Loading> = {
  title: "Components/Loading",
  component: Loading,
  parameters: {
    docs: {
      description: {
        component: "Loading 컴포넌트입니다.",
      },
    },
  },
  argTypes: {
    isShow: {
      control: {
        type: "boolean",
      },
      description: "로딩을 표시할지 여부입니다.",
    },
  },
  args: {
    isShow: true,
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  args: {},
};
