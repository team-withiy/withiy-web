import type { ComponentProps } from "react";

import { Meta, StoryObj } from "@storybook/react";

import Button from "../Button/Button";

import Tooltip from ".";

const Template = ({ leftPositionBasedOnTail, tooltipContent }: ComponentProps<typeof Tooltip>) => {
  return (
    <Tooltip tooltipContent={tooltipContent} leftPositionBasedOnTail={leftPositionBasedOnTail}>
      <Button size={52} variant="default">
        DEFAULT BUTTON
      </Button>
    </Tooltip>
  );
};

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  render: Template,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    leftPositionBasedOnTail: {
      description: "Tooltip의 위치를 CSS left properties를 사용하여 세팅합니다.<br/>기본값은 0입니다.",
      table: {
        type: {
          summary: "number | string",
        },
        defaultValue: { summary: "0" },
      },
    },
    tooltipContent: {
      description: "Tooltip에 표시될 텍스트",
      control: {
        type: "text",
      },
    },
  },
  args: {
    leftPositionBasedOnTail: 0,
    tooltipContent: "Tooltip",
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {},
};
