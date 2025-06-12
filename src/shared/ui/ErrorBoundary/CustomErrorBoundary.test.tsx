import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import CustomErrorBoundary from ".";

const ThrowErrorComponent: React.FC<{ shouldThrow?: boolean }> = ({ shouldThrow = true }) => {
  if (shouldThrow) {
    throw new Error("Test error");
  }
  return <div data-testid="success-content">Success Content</div>;
};

describe("CustomErrorBoundary", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  const renderWithQueryClient = (ui: React.ReactElement) => {
    return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
  };

  test("에러가 발생하지 않으면 children을 정상적으로 렌더링해야 한다", () => {
    const fallbackRender = vi.fn();

    renderWithQueryClient(
      <CustomErrorBoundary fallbackRender={fallbackRender}>
        <ThrowErrorComponent shouldThrow={false} />
      </CustomErrorBoundary>,
    );

    expect(screen.getByTestId("success-content")).toBeInTheDocument();
    expect(fallbackRender).not.toHaveBeenCalled();
  });

  test("에러가 발생하면 fallbackRender를 호출해야 한다", () => {
    const fallbackRender = vi.fn(({ resetErrorBoundary }) => (
      <div data-testid="error-fallback">
        <p>Something went wrong</p>
        <button data-testid="retry-button" onClick={resetErrorBoundary}>
          Retry
        </button>
      </div>
    ));

    renderWithQueryClient(
      <CustomErrorBoundary fallbackRender={fallbackRender}>
        <ThrowErrorComponent />
      </CustomErrorBoundary>,
    );

    expect(screen.getByTestId("error-fallback")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(fallbackRender).toHaveBeenCalledWith({
      error: expect.any(Error),
      resetErrorBoundary: expect.any(Function),
    });
    expect(screen.queryByTestId("success-content")).not.toBeInTheDocument();
  });

  test("resetErrorBoundary 함수가 호출되면 에러 상태가 초기화되어야 한다", async () => {
    const user = userEvent.setup();
    let shouldThrow = true;

    const TestComponent = () => <ThrowErrorComponent shouldThrow={shouldThrow} />;

    const fallbackRender = ({ resetErrorBoundary }: { resetErrorBoundary: () => void }) => (
      <div data-testid="error-fallback">
        <p>Error occurred</p>
        <button
          data-testid="retry-button"
          onClick={() => {
            shouldThrow = false;
            resetErrorBoundary();
          }}
        >
          Retry
        </button>
      </div>
    );

    renderWithQueryClient(
      <CustomErrorBoundary fallbackRender={fallbackRender}>
        <TestComponent />
      </CustomErrorBoundary>,
    );

    expect(screen.getByTestId("error-fallback")).toBeInTheDocument();

    const retryButton = screen.getByTestId("retry-button");
    await user.click(retryButton);

    expect(screen.getByTestId("success-content")).toBeInTheDocument();
    expect(screen.queryByTestId("error-fallback")).not.toBeInTheDocument();
  });

  test("쿼리 클라이언트의 resetQueries가 호출되어야 한다", async () => {
    const user = userEvent.setup();
    const resetQueriesSpy = vi.spyOn(queryClient, "resetQueries");

    const mockQuery = {
      queryKey: ["test-query"],
      state: { status: "error" as const },
    };

    const getQueryCacheSpy = vi.spyOn(queryClient, "getQueryCache").mockReturnValue({
      getAll: () => [mockQuery],
    } as never);

    const fallbackRender = ({ resetErrorBoundary }: { resetErrorBoundary: () => void }) => (
      <div data-testid="error-fallback">
        <button data-testid="retry-button" onClick={resetErrorBoundary}>
          Retry
        </button>
      </div>
    );

    renderWithQueryClient(
      <CustomErrorBoundary fallbackRender={fallbackRender}>
        <ThrowErrorComponent />
      </CustomErrorBoundary>,
    );

    const retryButton = screen.getByTestId("retry-button");
    await user.click(retryButton);

    expect(resetQueriesSpy).toHaveBeenCalledWith({
      queryKey: ["test-query"],
    });

    getQueryCacheSpy.mockRestore();
  });

  test("fallbackRender prop이 올바른 props를 받아야 한다", () => {
    const fallbackRender = vi.fn(() => <div data-testid="error-fallback" />);

    renderWithQueryClient(
      <CustomErrorBoundary fallbackRender={fallbackRender}>
        <ThrowErrorComponent />
      </CustomErrorBoundary>,
    );

    expect(fallbackRender).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.any(Error),
        resetErrorBoundary: expect.any(Function),
      }),
    );
  });

  test("에러 쿼리가 없는 경우에도 resetQueries가 안전하게 호출되어야 한다", async () => {
    const user = userEvent.setup();
    const resetQueriesSpy = vi.spyOn(queryClient, "resetQueries");

    const getQueryCacheSpy = vi.spyOn(queryClient, "getQueryCache").mockReturnValue({
      getAll: () => [],
    } as never);

    const fallbackRender = ({ resetErrorBoundary }: { resetErrorBoundary: () => void }) => (
      <div data-testid="error-fallback">
        <button data-testid="retry-button" onClick={resetErrorBoundary}>
          Retry
        </button>
      </div>
    );

    renderWithQueryClient(
      <CustomErrorBoundary fallbackRender={fallbackRender}>
        <ThrowErrorComponent />
      </CustomErrorBoundary>,
    );

    const retryButton = screen.getByTestId("retry-button");
    await user.click(retryButton);

    expect(resetQueriesSpy).toHaveBeenCalledWith({
      queryKey: undefined,
    });

    getQueryCacheSpy.mockRestore();
  });
});
