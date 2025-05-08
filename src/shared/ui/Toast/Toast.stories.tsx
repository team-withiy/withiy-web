import Toast from "./Toast";
import useToast from "./useToast";
import Button from "../Button/Button";

import type { ToastState } from "./toast.interface";
import type { Meta, StoryObj } from "@storybook/react";

interface ToastStoryProps {
  message: string;
  state: ToastState;
}

const ToastStory = ({ message, state }: ToastStoryProps) => {
  const { addToast } = useToast();

  return (
    <>
      <Button type="button" size={52} variant="default" onClick={() => addToast({ message, state })}>
        SHOW TOAST
      </Button>
      <Toast />
    </>
  );
};

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: ToastStory,
  argTypes: {
    message: {
      description: "토스트 메시지",
      type: {
        name: "string",
        required: true,
      },
    },
    state: {
      description: "토스트 상태",
      type: {
        name: "enum",
        value: ["default", "danger", "success"],
        required: true,
      },
      control: { type: "select" },
    },
  },
  args: {
    message: "TOAST",
    state: "default",
  },
  parameters: {
    layout: "centered",
    docs: {
      source: {
        type: "dynamic",
        language: "tsx",
        code: `const { addToast } = useToast();\n\n...\n\n<button size="medium" onClick={() => addToast({ message, state })}>SHOW TOAST</button>`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToastStory>;

export const Default: Story = {};
