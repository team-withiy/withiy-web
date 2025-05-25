import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import CopyCoupleLinkButton, { LoadingCopyCoupleLinkButton } from "./CopyCoupleLinkButton";

const mocks = vi.hoisted(() => {
  return {
    useCopyToClipboard: vi.fn(),
    addToast: vi.fn(),
  };
});

vi.mock("react-use", () => ({
  useCopyToClipboard: mocks.useCopyToClipboard,
}));

vi.mock("@/shared/ui/Toast", () => ({
  useToast: () => ({
    addToast: mocks.addToast,
  }),
}));

beforeEach(() => {
  cleanup();
});

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});

describe("CopyCoupleLinkButton", () => {
  test("성공 시 커플 링크를 복사할 수 있어야 한다.", async () => {
    mocks.useCopyToClipboard.mockReturnValue([{ error: false }, vi.fn()]);
    render(<CopyCoupleLinkButton code="123" />);
    await userEvent.click(screen.getByTestId("copy-couple-link-button"));
    expect(mocks.addToast).toHaveBeenCalledWith(expect.objectContaining({ state: "success" }));
  });

  test("실패 시 에러 메시지를 표시해야 한다.", async () => {
    mocks.useCopyToClipboard.mockReturnValue([{ error: "error" }, vi.fn()]);
    render(<CopyCoupleLinkButton code="error" />);
    await userEvent.click(screen.getByTestId("copy-couple-link-button"));
    expect(mocks.addToast).toHaveBeenCalledWith(expect.objectContaining({ state: "danger" }));
  });
});

describe("LoadingCopyCoupleLinkButton", () => {
  test("로딩 상태에서 버튼이 비활성화되어야 한다.", () => {
    render(<LoadingCopyCoupleLinkButton />);
    expect(screen.getByTestId("loading-copy-couple-link-button")).toBeDisabled();
  });
});
