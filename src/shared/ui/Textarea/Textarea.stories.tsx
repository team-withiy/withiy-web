import { ComponentProps } from "react";

import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useForm } from "react-hook-form";

import Textarea from "./Textarea";

const Template = ({ ...props }: ComponentProps<typeof Textarea>) => {
  const { register, watch } = useForm<{ value: string }>({
    defaultValues: {
      value: "",
    },
  });

  return <Textarea {...props} {...register("value")} value={watch("value")} />;
};

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  parameters: {
    docs: {
      description: {
        component: "Textarea 컴포넌트 입니다.",
      },
    },
  },
  component: Textarea,
  argTypes: {
    placeholder: {
      description: "Textarea내 입력값이 없을 때 보여지는 텍스트",
      control: {
        type: "text",
      },
    },
    disabled: {
      description: "Textarea 비활성화 여부",
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
    rows: {
      description: "Textarea의 행 수",
      table: {
        type: {
          summary: "number",
        },
        defaultValue: { summary: "5" },
      },
      control: {
        type: "number",
      },
    },
    maxLength: {
      description: "Textarea의 최대 글자 수",
      table: {
        type: {
          summary: "number",
        },
      },
      control: {
        type: "number",
      },
    },
    labelSize: {
      description: "라벨 텍스트 크기",
      table: {
        defaultValue: { summary: "14" },
      },
      type: {
        name: "enum",
        value: [16, 14],
      },
      control: {
        type: "select",
      },
    },
    label: {
      description: "Textarea 상단 라벨",
      control: {
        type: "text",
      },
    },
  },
  render: Template,
  args: {
    placeholder: "Placeholder",
    label: "Label",
    labelSize: 14,
    disabled: false,
    rows: 5,
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {},
};
