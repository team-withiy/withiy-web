import Alert from "./Alert";
import { AlertShowType, AlertUiType } from "./alert.interface";
import useAlert from "./useAlert";
import Button from "../Button/Button";

import type { Meta, StoryObj } from "@storybook/react";

interface TemplateProps {
  uiType: AlertUiType;
  title: string;
  content: string;
  cancelText: string;
  confirmText: string;
}

const Template = (props: TemplateProps) => {
  const { showAlert, closeAlert } = useAlert();

  return (
    <>
      <Button
        variant="default"
        size={52}
        onClick={() =>
          showAlert({
            ...props,
            onCancel: closeAlert,
            onConfirm: closeAlert,
          } as AlertShowType)
        }
      >
        SHOW ALERT
      </Button>
      <Alert />
    </>
  );
};

const meta: Meta<typeof Template> = {
  title: "Components/Alert",
  component: Template,
  argTypes: {
    uiType: {
      description: "알림창 UI 타입",
      type: {
        name: "enum",
        required: true,
        value: ["oneButton", "twoButton"],
      },
      control: {
        type: "select",
      },
    },
    title: {
      description: "알림창 제목",
      type: {
        name: "string",
        required: true,
      },
    },
    content: {
      description: "알림창 내용",
      type: {
        name: "string",
        required: true,
      },
    },
    cancelText: {
      description: "취소 버튼 텍스트",
      type: {
        name: "string",
        required: true,
      },
    },
    confirmText: {
      description: "확인 버튼 텍스트",
      type: {
        name: "string",
        required: true,
      },
    },
  },
  args: {
    uiType: "oneButton",
    title: "알림",
    content: "알림창 내용입니다.",
    confirmText: "확인",
    cancelText: "취소",
  },
  parameters: {
    layout: "centered",
    docs: {
      source: {
        code: `const { showAlert, closeAlert } = useAlert();\n\n...\n\n<button onClick={() => showAlert({ title, content, cancelText, confirmText, onCancel: closeAlert, onConfirm: closeAlert })}>SHOW ALERT</button>\n`,
        language: "tsx",
        type: "dynamic",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Template>;

export const Default: Story = {};
