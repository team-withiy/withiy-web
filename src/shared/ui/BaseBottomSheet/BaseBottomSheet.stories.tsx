import { type ComponentProps, useState } from "react";

import Button from "../Button/Button";

import BaseBottomSheet from ".";
import type { Meta, StoryObj } from "@storybook/react";

const Template = ({ blockCloseWhenClickOverlay, children }: ComponentProps<typeof BaseBottomSheet>) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <Button size={52} variant="default" type="button" onClick={() => setIsShow(true)}>
        바텀시트 열기
      </Button>
      <BaseBottomSheet
        isShow={isShow}
        onClose={() => setIsShow(false)}
        blockCloseWhenClickOverlay={blockCloseWhenClickOverlay}
      >
        {children}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
          <Button size={52} variant="default" type="button" onClick={() => setIsShow(false)}>
            [테스트용] 바텀시트 닫기
          </Button>
        </div>
      </BaseBottomSheet>
    </>
  );
};

const meta: Meta<typeof BaseBottomSheet> = {
  title: "Components/BottomSheet",
  component: BaseBottomSheet,
  render: Template,
  argTypes: {
    blockCloseWhenClickOverlay: {
      description: "바텀시트 외부 클릭 시 바텀시트 닫기를 막을지 여부",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: { summary: "false" },
      },
    },
    children: {
      description: "바텀시트 내부에 들어갈 컴포넌트",
      control: {
        type: "text",
      },
    },
  },
  args: {
    blockCloseWhenClickOverlay: false,
    children: "바텀시트 내용",
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof BaseBottomSheet>;

export const Default: Story = {
  args: {},
};
