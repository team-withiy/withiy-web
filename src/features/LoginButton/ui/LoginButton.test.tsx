import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

import LoginButton from ".";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("카카오 로그인 버튼", () => {
  test("socialType에 따라 kakao 로그인 href를 포함하는지 확인한다.", async () => {
    render(<LoginButton socialType="kakao" />);
    const kakaoButton = screen.getByTestId("kakao-login-button");

    expect(kakaoButton).toHaveAttribute(
      "href",
      expect.stringContaining(`${process.env.NEXT_PUBLIC_API_URL}/auth/kakao`),
    );
  });

  test("최근에 로그인한 방법이 카카오일 경우, 툴팁이 노출된다.");
});

describe("구글 로그인 버튼", () => {
  test("socialType에 따라 google 로그인 href를 포함하는지 확인한다.", async () => {
    render(<LoginButton socialType="google" />);
    const googleButton = screen.getByTestId("google-login-button");

    expect(googleButton).toHaveAttribute(
      "href",
      expect.stringContaining(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`),
    );
  });

  test("최근에 로그인한 방법이 구글일 경우, 툴팁이 노출된다.");
});

describe("네이버 로그인 버튼", () => {
  test("socialType에 따라 naver 로그인 href를 포함하는지 확인한다.", async () => {
    render(<LoginButton socialType="naver" />);
    const naverButton = screen.getByTestId("naver-login-button");

    expect(naverButton).toHaveAttribute(
      "href",
      expect.stringContaining(`${process.env.NEXT_PUBLIC_API_URL}/auth/naver`),
    );
  });

  test("최근에 로그인한 방법이 네이버일 경우, 툴팁이 노출된다.");
});
