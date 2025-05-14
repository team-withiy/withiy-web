import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";

import RequireAuthorizationBottomSheet from "./RequireAuthorizationBottomSheet";

afterEach(() => {
  cleanup();
});

test("바텀시트가 isShow=true일 때 내용이 렌더링되어야 함", () => {
  const handleClose = vi.fn();

  render(<RequireAuthorizationBottomSheet isShow onClose={handleClose} />);

  expect(screen.getByTestId("bottom-sheet-wrapper")).toHaveAttribute("data-is-show", "true");

  expect(screen.getByText("이 순간을 함께 기록해볼까요?")).toBeInTheDocument();
  expect(screen.getByText("로그인하고 우리의 추억을 저장해보세요!")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "지금 할게요" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "나중에 할게요" })).toBeInTheDocument();
});

test("바텀시트가 isShow=false일 때도 렌더링되어야 함", () => {
  const handleClose = vi.fn();

  render(<RequireAuthorizationBottomSheet isShow={false} onClose={handleClose} />);
  expect(screen.queryByTestId("bottom-sheet-wrapper")).not.toBeInTheDocument();
});

test("'나중에 할게요' 버튼을 클릭하면 onClose가 호출되어야 함", async () => {
  const user = userEvent.setup();
  const handleClose = vi.fn();

  render(<RequireAuthorizationBottomSheet isShow onClose={handleClose} />);

  await user.click(screen.getByRole("button", { name: "나중에 할게요" }));

  expect(handleClose).toHaveBeenCalledTimes(1);
});

test("BaseBottomSheet의 onClose가 호출되면 상위 컴포넌트의 onClose가 호출되어야 함", async () => {
  const user = userEvent.setup();
  const handleClose = vi.fn();

  render(<RequireAuthorizationBottomSheet isShow onClose={handleClose} />);

  await user.click(screen.getByTestId("close-button"));

  expect(handleClose).toHaveBeenCalledTimes(1);
});

test("'지금 할게요' 버튼은 로그인 페이지로 연결되어야 함", () => {
  const handleClose = vi.fn();

  render(<RequireAuthorizationBottomSheet isShow onClose={handleClose} />);

  const loginLink = screen.getByRole("link");
  expect(loginLink).toHaveAttribute("href", "/auth");
});
