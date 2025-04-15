import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import DvhHeightLayout from "./DvhHeightLayout";

describe("dvh가 지원되는 경우", () => {
  Object.defineProperty(global.CSS, "supports", {
    value: () => true,
    writable: true,
  });

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  test("children을 정상적으로 rendering 해야한다.", () => {
    render(
      <DvhHeightLayout dvh={50} heightType="height">
        <div data-testid="child">Child Content</div>
      </DvhHeightLayout>,
    );
    expect(screen.getByTestId("child")).toHaveTextContent("Child Content");
  });

  test("0 ~ 100 사이의 dvh가 아닌 경우 에러를 내야한다.", () => {
    expect(() => {
      render(<DvhHeightLayout dvh={-10} heightType="height" />);
    }).toThrow("dvh must be between 0 and 100");

    expect(() => {
      render(<DvhHeightLayout dvh={150} heightType="height" />);
    }).toThrow("dvh must be between 0 and 100");
  });

  test("dvh가 지원되는 브라우저의 경우, dvh로 세팅되어야 한다.", () => {
    render(
      <DvhHeightLayout dvh={50} heightType="height">
        children
      </DvhHeightLayout>,
    );

    const wrapper = screen.getByTestId("dvh-layout");
    expect(wrapper).toHaveStyle("--dvh: 50");
  });

  test("className이 props에 존재할 경우 세팅되어야함", () => {
    render(
      <DvhHeightLayout dvh={50} heightType="height" className="custom-class">
        <div data-testid="child">Child Content</div>
      </DvhHeightLayout>,
    );
    const wrapper = screen.getByTestId("dvh-layout");
    expect(wrapper).toHaveClass("custom-class");
  });
});

test("dvh가 지원되지 않을 경우, px로 세팅되어야 한다.", () => {
  Object.defineProperty(global.CSS, "supports", {
    value: () => false,
    writable: true,
  });

  vi.mock("react-use", () => ({
    useWindowSize: () => ({
      width: 1000,
      height: 800,
    }),
  }));

  cleanup();

  render(
    <DvhHeightLayout dvh={50} heightType="height">
      <div data-testid="child">Child Content</div>
    </DvhHeightLayout>,
  );

  const wrapper = screen.getByTestId("dvh-layout");
  expect(wrapper).toHaveStyle("--dvh: 50");
  expect(wrapper).toHaveStyle("height: 400px");
});
