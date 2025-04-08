import type { ComponentProps } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Input from "./Input";

const schema = z.object({
  value: z.string().min(3, { message: "3글자 이상 입력하세요." }),
});

type Schema = z.infer<typeof schema>;

const Template = ({ ...props }: ComponentProps<typeof Input>) => {
  const {
    register,
    formState: { errors },
  } = useForm<Schema>({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  return <Input errorMessage={errors.value?.message} {...register("value")} {...props} />;
};

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  parameters: {
    docs: {
      description: {
        component:
          "Input 컴포넌트 입니다.<br/>해당 컴포넌트는 3글자 이상 입력으로 요구하며, 사용자가 입력한 값이 유효하지 않을 경우 에러 메시지를 표시합니다.",
      },
    },
  },
  component: Input,
  argTypes: {
    type: {
      table: {
        disable: true,
      },
    },
    inputMode: {
      table: {
        disable: true,
      },
    },
    placeholder: {
      description: "Input내 입력값이 없을 때 보여지는 텍스트",
      control: {
        type: "text",
      },
    },
    disabled: {
      description: "Input 비활성화 여부",
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
    size: {
      description: "Input 크기",
      type: {
        required: true,
        name: "enum",
        value: [52],
      },
      control: {
        type: "select",
      },
    },
  },
  render: Template,
  args: {
    placeholder: "Placeholder",
    inputMode: "text",
    type: "text",
    disabled: false,
    size: 52,
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {},
};
