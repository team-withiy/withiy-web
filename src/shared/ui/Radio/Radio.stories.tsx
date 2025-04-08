import { ChangeEventHandler, ComponentProps, useState } from "react";

import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Radio from "./Radio";

const Template = ({ ...props }: ComponentProps<typeof Radio>) => {
  const [value, setValue] = useState(-1);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(Number(e.currentTarget.value));
  };

  return (
    <>
      <Radio {...props} onChange={onChange} value={1} checked={value === 1} />
      <br />
      <Radio {...props} onChange={onChange} value={2} checked={value === 2} />
    </>
  );
};

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  parameters: {
    docs: {
      description: {
        component: "Radio 컴포넌트입니다.",
      },
    },
  },
  argTypes: {
    children: {
      description: "Radio에 표시될 텍스트",
      control: {
        type: "text",
      },
    },
    size: {
      description: "Radio의 크기",
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
      description: "Radio 비활성화",
      control: {
        type: "boolean",
      },
    },
  },
  render: Template,
  args: {
    children: "Radio",
    onChange: fn(),
    size: 24,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Large: Story = {
  args: {
    children: "Large Radio",
    onChange: fn(),
    size: 24,
    disabled: false,
  },
};

export const Medium: Story = {
  args: {
    children: "Medium Radio",
    onChange: fn(),
    size: 20,
    disabled: false,
  },
};
