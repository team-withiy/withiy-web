import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import LoginButton from ".";

beforeEach(() => {
  window.open = vi.fn();
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("카카오 로그인 버튼", () => {
  test("state를 포함해서 Link를 실행한다.", async () => {
    const user = userEvent.setup();
    render(<LoginButton socialType="kakao" />);
    const kakaoButton = screen.getByTestId("kakao-login-button");

    await user.click(kakaoButton);

    expect(window.open).toHaveBeenCalled();
    expect(window.open).toHaveBeenCalledWith(expect.stringContaining("state="), "_self");
  });
});

describe("구글 로그인 버튼", () => {
  test("state를 포함해서 Link를 실행한다.", async () => {
    const user = userEvent.setup();
    render(<LoginButton socialType="google" />);
    const googleButton = screen.getByTestId("google-login-button");

    await user.click(googleButton);

    expect(window.open).toHaveBeenCalled();
    expect(window.open).toHaveBeenCalledWith(expect.stringContaining("state="), "_self");
  });
});

describe("네이버 로그인 버튼", () => {
  test("state를 포함해서 Link를 실행한다.", async () => {
    const user = userEvent.setup();
    render(<LoginButton socialType="naver" />);
    const naverButton = screen.getByTestId("naver-login-button");

    await user.click(naverButton);

    expect(window.open).toHaveBeenCalled();
    expect(window.open).toHaveBeenCalledWith(expect.stringContaining("state="), "_self");
  });
});
