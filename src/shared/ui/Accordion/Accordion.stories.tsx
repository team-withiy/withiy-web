import { type ComponentProps, useState } from "react";

import { Meta, StoryObj } from "@storybook/react";

import Accordion from ".";

const Template = ({ ...props }: ComponentProps<typeof Accordion>) => {
  const [isShow, setIsShow] = useState(false);

  return <Accordion {...props} isShow={isShow} onClickButton={() => setIsShow((prev) => !prev)} />;
};

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  argTypes: {
    summary: {
      description: "Accordion의 제목",
      control: {
        type: "text",
      },
    },
    details: {
      description: "Accordion의 내용",
      control: {
        type: "text",
      },
    },
  },
  args: {
    details: "Contents",
    summary: "Accordion",
  },
  render: Template,
};

export default meta;

export const Default: StoryObj<typeof Accordion> = {};
