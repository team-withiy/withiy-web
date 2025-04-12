import { ComponentProps, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Meta, StoryObj } from "@storybook/react";
import { range } from "lodash-es";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import Select from "./Select";
import SelectItem from "./SelectItem";

const schema = z.object({
  value: z.number().min(0, { message: "아이템을 선택하세요." }),
});

type Schema = z.infer<typeof schema>;

const Template = ({ ...props }: ComponentProps<typeof Select>) => {
  const {
    control,
    formState: { errors },
  } = useForm<Schema>({
    mode: "onTouched",
    resolver: zodResolver(schema),
    defaultValues: {
      value: -1,
    },
  });

  const [isShow, setIsShow] = useState(false);

  return (
    <Controller
      control={control}
      name="value"
      render={({ field: { value, onBlur, onChange } }) => {
        const onClickItem = (i: number) => {
          onChange(i);
          setIsShow(false);
        };

        return (
          <Select
            {...props}
            isShow={isShow}
            onOpen={() => setIsShow(true)}
            onClose={() => setIsShow(false)}
            onBlur={onBlur}
            errorMessage={errors.value?.message}
            isPlaceholder={value === -1}
            items={range(10).map((i) => (
              <SelectItem key={i} onClick={() => onClickItem(i)} isSelected={value === i}>
                ITEM {i}
              </SelectItem>
            ))}
          >
            {value === -1 ? "선택하세요" : `ITEM ${value}`}
          </Select>
        );
      }}
    />
  );
};

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    docs: {
      story: {
        height: "500px",
      },
    },
  },
  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
    size: {
      description: "Select 크기",
      type: {
        required: true,
        name: "enum",
        value: [52],
      },
      control: {
        type: "select",
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
  },
  render: Template,
  args: {
    children: "Select",
    label: "라벨",
    labelSize: 14,
    size: 52,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};
