import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import FallbackHandlerImage from "./FallbackHandlerImage";

vi.mock("next/image");

describe("FallbackHandlerImage", () => {
  const defaultProps = {
    src: "https://example.com/image.jpg",
    alt: "Test image",
    width: 300,
    height: 200,
    fallbackSrc: `${process.env.NEXT_PUBLIC_BASE_URL}/images/default-profile.png`,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("이미지가 정상적으로 렌더링된다", () => {
    render(<FallbackHandlerImage {...defaultProps} />);

    const imageElement = screen.getByTestId("fallback-handler-image");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", defaultProps.src);
    expect(imageElement).toHaveAttribute("alt", defaultProps.alt);
    expect(imageElement).toHaveAttribute("width", defaultProps.width.toString());
    expect(imageElement).toHaveAttribute("height", defaultProps.height.toString());
  });

  test("이미지 로드 에러 시 fallbackSrc로 변경된다", () => {
    render(<FallbackHandlerImage {...defaultProps} />);

    const imageElement = screen.getByTestId<HTMLImageElement>("fallback-handler-image");

    fireEvent.error(imageElement);

    expect(imageElement.src).toBe(defaultProps.fallbackSrc);
  });

  test("추가 props가 올바르게 전달된다", () => {
    const additionalProps = {
      className: "test-class",
      loading: "lazy" as const,
    };

    render(<FallbackHandlerImage {...defaultProps} {...additionalProps} />);

    const imageElement = screen.getByTestId("fallback-handler-image");
    expect(imageElement).toHaveClass(additionalProps.className);
    expect(imageElement).toHaveAttribute("loading", additionalProps.loading);
  });

  test("여러 번 에러가 발생해도 안전하게 처리된다", () => {
    render(<FallbackHandlerImage {...defaultProps} />);

    const imageElement = screen.getByTestId<HTMLImageElement>("fallback-handler-image");

    fireEvent.error(imageElement);
    expect(imageElement.src).toBe(defaultProps.fallbackSrc);

    fireEvent.error(imageElement);
    expect(imageElement.src).toBe(defaultProps.fallbackSrc);
  });

  test("fallbackSrc가 제공되지 않으면 컴포넌트가 렌더링되지 않는다", () => {
    const { fallbackSrc, ...propsWithoutFallback } = defaultProps;

    // @ts-expect-error - fallbackSrc가 필수 prop이므로 의도적으로 제외
    render(<FallbackHandlerImage {...propsWithoutFallback} />);

    const imageElement = screen.getByTestId("fallback-handler-image");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).not.toHaveAttribute("fallbackSrc");
  });
});
