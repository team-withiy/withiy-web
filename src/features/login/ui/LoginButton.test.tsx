import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

import { renderWithProviders } from "@/shared/lib/test";

import LoginButton from "./LoginButton";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("카카오 로그인 버튼", () => {
  vi.mock("@tanstack/react-query", async () => {
    const actual = await vi.importActual("@tanstack/react-query");
    return {
      ...actual,
      useSuspenseQuery: () => ({
        data: { socialType: "kakao" },
      }),
    };
  });

  test("socialType에 따라 kakao 로그인 버튼이 정상적으로 렌더링된다.", async () => {
    renderWithProviders(<LoginButton socialType="kakao" />);

    const kakaoButton = screen.getByTestId("kakao-login-button");
    expect(kakaoButton).toBeInTheDocument();
  });

  test("최근에 로그인한 방법이 카카오일 경우, 툴팁이 노출된다.", () => {
    renderWithProviders(<LoginButton socialType="kakao" />);
    const tooltip = screen.getByTestId("tooltip");
    expect(tooltip).toBeInTheDocument();
  });
});

describe("구글 로그인 버튼", () => {
  vi.mock("@tanstack/react-query", async () => {
    const actual = await vi.importActual("@tanstack/react-query");
    return {
      ...actual,
      useSuspenseQuery: () => ({
        data: { socialType: "google" },
      }),
    };
  });

  test("socialType에 따라 google 로그인 버튼이 정상적으로 렌더링된다.", async () => {
    renderWithProviders(<LoginButton socialType="google" />);

    const googleButton = screen.getByTestId("google-login-button");
    expect(googleButton).toBeInTheDocument();
  });

  test("최근에 로그인한 방법이 구글일 경우, 툴팁이 노출된다.", () => {
    renderWithProviders(<LoginButton socialType="google" />);
    const tooltip = screen.getByTestId("tooltip");
    expect(tooltip).toBeInTheDocument();
  });
});

describe("네이버 로그인 버튼", () => {
  vi.mock("@tanstack/react-query", async () => {
    const actual = await vi.importActual("@tanstack/react-query");
    return {
      ...actual,
      useSuspenseQuery: () => ({
        data: { socialType: "naver" },
      }),
    };
  });

  test("socialType에 따라 naver 로그인 버튼이 정상적으로 렌더링된다.", async () => {
    renderWithProviders(<LoginButton socialType="naver" />);

    const naverButton = screen.getByTestId("naver-login-button");
    expect(naverButton).toBeInTheDocument();
  });

  test("최근에 로그인한 방법이 네이버일 경우, 툴팁이 노출된다.", () => {
    renderWithProviders(<LoginButton socialType="naver" />);
    const tooltip = screen.getByTestId("tooltip");
    expect(tooltip).toBeInTheDocument();
  });
});
