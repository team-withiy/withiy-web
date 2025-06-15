import { Meta, StoryObj } from "@storybook/react";

import DatePicker from ".";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    docs: {},
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    selectedDate: new Date(),
    placeholder: "날짜를 선택하세요",
    className: "custom-class",
  },
  render: (args) => <DatePicker {...args} />,
};
