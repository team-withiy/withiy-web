import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { afterEach, expect, test, vi } from "vitest";

import { AUTH_CALLBACK_URL_KEY } from "@/shared/constants/storage";
import { getCookie } from "@/shared/lib/cookies";
import { renderWithProviders } from "@/shared/lib/test";

import RequireCoupleAuthorizationBottomSheet from "./RequireCoupleAuthorizationBottomSheet";

afterEach(() => {
  cleanup();
});

test("바텀시트가 isShow=true일 때 내용이 렌더링되어야 함", () => {
  const handleClose = vi.fn();

  renderWithProviders(<RequireCoupleAuthorizationBottomSheet isShow onClose={handleClose} callbackUrl="/" />);

  expect(screen.getByTestId("bottom-sheet-wrapper")).toHaveAttribute("data-is-show", "true");

  expect(screen.getByText("커플 연동 후 사용할 수 있어요")).toBeInTheDocument();
  expect(screen.getByText("둘만의 이야기를 기록해보세요! 💖")).toBeInTheDocument();
  expect(screen.getByTestId("connect-couple-button")).toBeInTheDocument();
  expect(screen.getByTestId("close-button")).toBeInTheDocument();
});

test("바텀시트가 isShow=false일 때도 렌더링되어야 함", () => {
  const handleClose = vi.fn();

  renderWithProviders(<RequireCoupleAuthorizationBottomSheet isShow={false} onClose={handleClose} callbackUrl="/" />);
  expect(screen.queryByTestId("bottom-sheet-wrapper")).not.toBeInTheDocument();
});

test("'나중에 할게요' 버튼을 클릭하면 onClose가 호출되어야 함", async () => {
  const user = userEvent.setup();
  const handleClose = vi.fn();

  renderWithProviders(<RequireCoupleAuthorizationBottomSheet isShow onClose={handleClose} callbackUrl="/" />);

  await user.click(screen.getByTestId("close-button"));

  expect(handleClose).toHaveBeenCalledTimes(1);
});

test("BaseBottomSheet의 onClose가 호출되면 상위 컴포넌트의 onClose가 호출되어야 함", async () => {
  const user = userEvent.setup();
  const handleClose = vi.fn();

  renderWithProviders(<RequireCoupleAuthorizationBottomSheet isShow onClose={handleClose} callbackUrl="/" />);

  await user.click(screen.getByTestId("close-button"));

  expect(handleClose).toHaveBeenCalledTimes(1);
});

test("'지금 할게요' 버튼을 클릭하면 로그인 페이지로 이동되어야 함", async () => {
  mockRouter.push("/");
  const user = userEvent.setup();
  const handleClose = vi.fn();

  const callbackUrl = await getCookie(AUTH_CALLBACK_URL_KEY);
  expect(callbackUrl).toBeUndefined();

  renderWithProviders(
    <RequireCoupleAuthorizationBottomSheet isShow onClose={handleClose} callbackUrl="/this-is-callback-page" />,
  );

  await user.click(screen.getByTestId("connect-couple-button"));
  expect(mockRouter).toMatchObject(expect.objectContaining({ pathname: "/couples/invite" }));
});
