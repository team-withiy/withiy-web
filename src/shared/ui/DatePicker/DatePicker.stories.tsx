import { ComponentProps, useState } from "react";

import { Meta, StoryObj } from "@storybook/react";

import DatePicker from ".";
import type { SelectedDate } from "./datepicker.interface";

const Template = ({ placeholder, label }: ComponentProps<typeof DatePicker>) => {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>();
  return (
    <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} placeholder={placeholder} label={label} />
  );
};

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component:
          "DatePicker 컴포넌트입니다.<br/>초기 조회 형태는 month 이며, 화살표를 누를 경우 year로 변경되고, 화살표를 통해 조회 연도를 변경한 뒤 월 선택을 통해 조회 연월을 변경할 수 있습니다.<br/>선택된 날짜가 없다면 확인 버튼은 비활성화 상태입니다.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        code: `<DatePicker\n  selectedDate={new Date()}\n  onDateChange={() => {}}\n  placeholder="날짜를 선택하세요"\n  className={styles.datePicker}\n/>`,
      },
    },
  },
  render: Template,
  argTypes: {
    selectedDate: {
      description: "선택된 날짜",
      table: {
        type: {
          summary: "Date | Dayjs | null | undefined",
        },
      },
    },
    placeholder: {
      description: "선택된 날짜가 보이지 않을 때 표시되는 텍스트",
      control: {
        type: "text",
      },
    },
    label: {
      description: "DatePicker 상단 설명",
      control: {
        type: "text",
      },
    },
  },
  args: {
    placeholder: "날짜를 선택하세요",
    label: "날짜 선택",
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {};
