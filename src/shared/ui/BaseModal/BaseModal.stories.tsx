import { type ComponentProps, useState } from "react";

import Button from "../Button/Button";

import BaseModal from ".";
import type { Meta, StoryObj } from "@storybook/react";

const Template = ({ blockCloseWhenClickOverlay, children }: ComponentProps<typeof BaseModal>) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <Button size={52} variant="default" type="button" onClick={() => setIsShow(true)}>
        모달 열기
      </Button>
      <BaseModal
        isShow={isShow}
        onClose={() => setIsShow(false)}
        blockCloseWhenClickOverlay={blockCloseWhenClickOverlay}
      >
        {children}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
          <Button size={52} variant="default" type="button" onClick={() => setIsShow(false)}>
            [테스트용] 모달 닫기
          </Button>
        </div>
      </BaseModal>
    </>
  );
};

const meta: Meta<typeof BaseModal> = {
  title: "Components/Modal",
  component: BaseModal,
  render: Template,
  argTypes: {
    blockCloseWhenClickOverlay: {
      description: "모달 외부 클릭 시 모달 닫기를 막을지 여부",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: { summary: "false" },
      },
    },
    children: {
      description: "모달 내부에 들어갈 컴포넌트",
      control: {
        type: "text",
      },
    },
  },
  args: {
    blockCloseWhenClickOverlay: false,
    children: "모달 내용",
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof BaseModal>;

export const Default: Story = {
  args: {},
};
