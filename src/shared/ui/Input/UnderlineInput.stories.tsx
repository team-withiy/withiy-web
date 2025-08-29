import type { ComponentProps } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useForm } from "react-hook-form";
import { z } from "zod";

import UnderlineInput from "./UnderlineInput";

const schema = z.object({
  value: z.string().min(3, { message: "3글자 이상 입력하세요." }),
});

type Schema = z.infer<typeof schema>;

const Template = ({ ...props }: ComponentProps<typeof UnderlineInput>) => {
  const {
    register,
    formState: { errors, touchedFields },
  } = useForm<Schema>({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  return (
    <UnderlineInput
      errorMessage={errors.value?.message}
      successMessage={!!touchedFields.value && !errors.value && "3글자 이상 입력하셨습니다!"}
      {...register("value")}
      {...props}
    />
  );
};

const meta: Meta<typeof UnderlineInput> = {
  title: "Components/Input/UnderlineInput",
  parameters: {
    docs: {
      description: {
        component:
          "UnderlineInput 컴포넌트 입니다.<br/>해당 컴포넌트는 3글자 이상 입력으로 요구하며, 사용자가 입력한 값이 유효하지 않을 경우 에러 메시지를 표시합니다.",
      },
    },
  },
  component: UnderlineInput,
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
      description: "UnderlineInput내 입력값이 없을 때 보여지는 텍스트",
      control: {
        type: "text",
      },
    },
    disabled: {
      description: "UnderlineInput 비활성화 여부",
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
    label: {
      description: "UnderlineInput 상단 라벨",
      control: {
        type: "text",
      },
    },
  },
  render: Template,
  args: {
    placeholder: "Placeholder",
    inputMode: "text",
    type: "text",
    label: "Label",
    disabled: false,
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof UnderlineInput>;

export const Default: Story = {
  args: {},
};
