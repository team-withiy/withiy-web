import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test, vi } from "vitest";

import Checkbox from ".";

import styles from "./Checkbox.module.scss";

afterEach(() => {
  cleanup();
});

describe("Checkbox 컴포넌트", () => {
  test("기본 체크박스가 렌더링 되어야 한다", () => {
    render(<Checkbox size={24} />);

    const checkboxWrapper = screen.getByTestId("checkbox-wrapper");
    const checkboxInput = screen.getByTestId("checkbox-input");

    expect(checkboxWrapper).toBeInTheDocument();
    expect(checkboxInput).toBeInTheDocument();
    expect(checkboxInput).toHaveAttribute("type", "checkbox");
  });

  test("자식 요소가 렌더링 되어야 한다", () => {
    render(<Checkbox size={24}>체크박스 레이블</Checkbox>);

    expect(screen.getByText("체크박스 레이블")).toBeInTheDocument();
  });

  test("큰 사이즈(24)의 체크박스가 올바르게 렌더링 되어야 한다", () => {
    render(<Checkbox size={24} />);

    const checkboxWrapper = screen.getByTestId("checkbox-wrapper");
    expect(checkboxWrapper).toHaveClass(styles.large);
  });

  test("중간 사이즈(20)의 체크박스가 올바르게 렌더링 되어야 한다", () => {
    render(<Checkbox size={20} />);

    const checkboxWrapper = screen.getByTestId("checkbox-wrapper");
    expect(checkboxWrapper).toHaveClass(styles.medium);
  });

  test("체크박스를 클릭하면 체크 상태가 변경되어야 한다", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox size={24} onChange={onChange} />);

    const checkboxWrapper = screen.getByTestId("checkbox-wrapper");
    const checkboxInput = screen.getByTestId("checkbox-input") as HTMLInputElement;

    expect(checkboxInput.checked).toBe(false);

    await user.click(checkboxWrapper);

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test("disabled 상태일 때 클릭이 불가능해야 한다", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox size={24} disabled onChange={onChange} />);

    const checkboxWrapper = screen.getByTestId("checkbox-wrapper");
    const checkboxInput = screen.getByTestId("checkbox-input");

    expect(checkboxInput).toBeDisabled();

    await user.click(checkboxWrapper);

    expect(onChange).not.toHaveBeenCalled();
  });

  test("checked prop이 제공될 경우 초기값으로 반영되어야 한다", () => {
    render(<Checkbox size={24} checked />);

    const checkboxInput = screen.getByTestId("checkbox-input") as HTMLInputElement;
    expect(checkboxInput.checked).toBe(true);
  });
});
