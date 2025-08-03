import { cleanup, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import { renderWithProviders } from "@/shared/lib/test";

import ErrorBoundary from "./ErrorBoundary";
import SuspenseQueryBoundary from "./SuspenseQueryBoundary";

afterEach(() => {
  cleanup();
});

const query1 = {
  queryKey: ["query1"],
  queryFn: () => Promise.resolve("result1"),
};

const query2 = {
  queryKey: ["query2"],
  queryFn: () => Promise.resolve("result2"),
};

const query3 = {
  queryKey: ["query3"],
  queryFn: () => Promise.reject(new Error("result3")),
};

test("suspenseQuery 결과가 children에게 전달되어야 한다", async () => {
  renderWithProviders(
    <SuspenseQueryBoundary queries={[query1]}>
      {([{ data }]) => <div data-testid="query1-result">{data}</div>}
    </SuspenseQueryBoundary>,
  );

  expect(await screen.findByTestId("query1-result")).toHaveTextContent("result1");
});

test("여러 개의 suspenseQuery 결과가 children에게 전달되어야 한다", async () => {
  renderWithProviders(
    <SuspenseQueryBoundary queries={[query1, query2]}>
      {([result1, result2]) => (
        <div data-testid="combined-result">
          {result1.data} - {result2.data}
        </div>
      )}
    </SuspenseQueryBoundary>,
  );

  expect(await screen.findByTestId("combined-result")).toHaveTextContent("result1 - result2");
});

test("combine 함수를 사용하여 결과를 조합할 수 있어야 한다", async () => {
  renderWithProviders(
    <SuspenseQueryBoundary
      queries={[query1, query2]}
      combine={(results) => results.map((result) => result.data).join(", ")}
    >
      {(combinedResult) => <div data-testid="combined-result">{combinedResult}</div>}
    </SuspenseQueryBoundary>,
  );

  expect(await screen.findByTestId("combined-result")).toHaveTextContent("result1, result2");
});

test("오류가 발생한 query는 ErrorBoundary에 의해 처리되어야 한다", async () => {
  renderWithProviders(
    <ErrorBoundary fallbackRender={({ error }) => <div data-testid="error-message">Error: {error.message}</div>}>
      <SuspenseQueryBoundary queries={[query1, query3]}>
        {([result1, result2]) => (
          <div data-testid="combined-result">
            {result1.data} - {result2 ? result2.data : "Error"}
          </div>
        )}
      </SuspenseQueryBoundary>
    </ErrorBoundary>,
  );

  expect(screen.queryByTestId("combined-result")).not.toBeInTheDocument();
  expect(await screen.findByTestId("error-message")).toHaveTextContent("Error: result3");
});
