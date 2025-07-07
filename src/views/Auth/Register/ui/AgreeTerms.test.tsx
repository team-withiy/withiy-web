import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test, vi } from "vitest";

import { TermAgreementDTO, TermDTO } from "@/entities/term/api/term.interface";

import AgreeTerms from "./AgreeTerms";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const mockTerms: TermDTO[] = [
  {
    id: 1,
    title: "서비스 이용약관",
    content: ["서비스 이용약관 내용입니다."],
    required: true,
  },
  {
    id: 2,
    title: "개인정보 처리방침",
    content: ["개인정보 처리방침 내용입니다."],
    required: true,
  },
  {
    id: 3,
    title: "마케팅 정보 수신 동의",
    content: ["마케팅 정보 수신 동의 내용입니다."],
    required: false,
  },
];

const defaultAgreements: TermAgreementDTO = {};

describe("전체 동의", () => {
  test("전체 동의 체크박스를 클릭하면 모든 약관이 체크되어야 한다", async () => {
    const onClickNext = vi.fn();
    const user = userEvent.setup();

    render(<AgreeTerms terms={mockTerms} defaultTermAgreements={defaultAgreements} onClickNext={onClickNext} />);

    const totalAgreeCheckbox = screen.getByTestId("total-agree-checkbox");
    await user.click(totalAgreeCheckbox);

    mockTerms.forEach((term) => {
      const checkbox = screen.getByTestId(`term-${term.id}-checkbox`);
      expect(checkbox).toBeChecked();
    });
  });

  test("모든 약관이 체크되어 있을 때 전체 동의 체크박스를 클릭하면 모든 약관이 체크 해제되어야 한다", async () => {
    const onClickNext = vi.fn();
    const user = userEvent.setup();
    const allCheckedAgreements: TermAgreementDTO = {
      "1": true,
      "2": true,
      "3": true,
    };

    render(<AgreeTerms terms={mockTerms} defaultTermAgreements={allCheckedAgreements} onClickNext={onClickNext} />);

    const totalAgreeCheckbox = screen.getByTestId("total-agree-checkbox");
    expect(totalAgreeCheckbox).toBeChecked();

    await user.click(totalAgreeCheckbox);

    mockTerms.forEach((term) => {
      const checkbox = screen.getByTestId(`term-${term.id}-checkbox`);
      expect(checkbox).not.toBeChecked();
    });
  });
});

describe("개별 동의", () => {
  test("개별 약관 체크박스를 클릭하면 해당 약관만 체크 상태가 변경되어야 한다", async () => {
    const onClickNext = vi.fn();
    const user = userEvent.setup();

    render(<AgreeTerms terms={mockTerms} defaultTermAgreements={defaultAgreements} onClickNext={onClickNext} />);

    const firstTermCheckbox = screen.getByTestId("term-1-checkbox");
    await user.click(firstTermCheckbox);

    expect(firstTermCheckbox).toBeChecked();
    expect(screen.getByTestId("term-2-checkbox")).not.toBeChecked();
    expect(screen.getByTestId("term-3-checkbox")).not.toBeChecked();

    expect(screen.getByTestId("total-agree-checkbox")).not.toBeChecked();

    await user.click(screen.getByTestId("term-2-checkbox"));

    await user.click(screen.getByTestId("term-3-checkbox"));

    expect(screen.getByTestId("total-agree-checkbox")).toBeChecked();
  });
});

describe("동의하고 계속하기", () => {
  test("필수 약관이 선택되어있지 않은 경우, 동의하고 계속하기는 비활성화되어야 한다", () => {
    const onClickNext = vi.fn();

    render(<AgreeTerms terms={mockTerms} defaultTermAgreements={defaultAgreements} onClickNext={onClickNext} />);

    const submitButton = screen.getByTestId("agree-terms-submit-button");
    expect(submitButton).toBeDisabled();
  });

  test("필수 약관만 선택되어있다면, 동의하고 계속하기는 활성화되어야 한다", async () => {
    const onClickNext = vi.fn();
    const user = userEvent.setup();

    render(<AgreeTerms terms={mockTerms} defaultTermAgreements={defaultAgreements} onClickNext={onClickNext} />);

    await user.click(screen.getByTestId("term-1-checkbox"));
    await user.click(screen.getByTestId("term-2-checkbox"));

    const submitButton = screen.getByTestId("agree-terms-submit-button");
    expect(submitButton).not.toBeDisabled();
  });

  test("동의하고 계속하기 클릭 시, onClickNext 함수가 호출되어야 한다", async () => {
    const onClickNext = vi.fn();
    const user = userEvent.setup();

    render(<AgreeTerms terms={mockTerms} defaultTermAgreements={defaultAgreements} onClickNext={onClickNext} />);

    await user.click(screen.getByTestId("term-1-checkbox"));
    await user.click(screen.getByTestId("term-2-checkbox"));

    const submitButton = screen.getByTestId("agree-terms-submit-button");
    await user.click(submitButton);

    expect(onClickNext).toHaveBeenCalledTimes(1);
    expect(onClickNext).toHaveBeenCalledWith({
      "1": true,
      "2": true,
      "3": false,
    });
  });
});
