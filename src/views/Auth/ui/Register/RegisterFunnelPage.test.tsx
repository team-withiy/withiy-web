import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";

import { TermDTO } from "@/entities/term/api/term.interface";

import { ApiResponseDTO } from "@/shared/api/common.interface";

import RegisterFunnelPage from "./RegisterFunnelPage";

vi.mock("@/shared/ui/Toast", () => ({
  useToast: () => ({
    addToast: vi.fn(),
  }),
}));

vi.mock("../../api/actions", () => ({
  registerAction: vi.fn().mockResolvedValue("회원가입이 완료되었습니다."),
}));

vi.mock("@/features/agreeTerm/ui", () => ({
  default: vi.fn().mockImplementation(({ onClickNext }) => {
    return (
      <div data-testid="agree-terms">
        <button data-testid="agree-terms-submit-button" onClick={() => onClickNext({ "1": true, "2": true })}>
          동의하고 계속하기
        </button>
      </div>
    );
  }),
  LoadingAgreeTerms: vi.fn().mockReturnValue(<div data-testid="loading-agree-terms" />),
}));

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
];

const mockTermPromise = Promise.resolve<ApiResponseDTO<TermDTO[]>>({
  data: mockTerms,
  status: 200,
  message: "성공",
  timestamp: new Date(),
});

vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    use: (promise: Promise<unknown>) => {
      if (promise === mockTermPromise) return { data: mockTerms };
      return actual.use(promise);
    },
    Suspense: ({ children }: { children: React.ReactNode }) => {
      return <>{children}</>;
    },
  };
});

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

test("초기에는 약관 동의 페이지가 렌더링되어야 한다", () => {
  render(<RegisterFunnelPage termPromise={mockTermPromise} />);

  expect(screen.getByTestId("agree-terms")).toBeInTheDocument();
  expect(screen.queryByText("프로필 설정")).not.toBeInTheDocument();
});
