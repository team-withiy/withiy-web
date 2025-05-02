import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import FetchBoundary from ".";

test("fetch 함수 결과를 children에게 전달해야 한다", async () => {
  const mockData1 = { name: "Test User" };
  const mockData2 = ["item1", "item2", "item3"];

  const mockFetch1 = vi.fn().mockResolvedValue(mockData1);
  const mockFetch2 = vi.fn().mockResolvedValue(mockData2);

  const result = await FetchBoundary({
    fetchFunctions: [mockFetch1, mockFetch2],
    children: (results) => {
      expect(results[0]).toBe(mockData1);
      expect(results[1]).toBe(mockData2);

      return (
        <div data-testid="test-component">
          {results[0].name} - {results[1].length} items
        </div>
      );
    },
  });

  render(result);

  expect(screen.getByTestId("test-component")).toHaveTextContent("Test User - 3 items");

  expect(mockFetch1).toHaveBeenCalledTimes(1);
  expect(mockFetch2).toHaveBeenCalledTimes(1);
});

test("빈 fetch 함수 배열을 처리해야 한다", async () => {
  const result = await FetchBoundary({
    fetchFunctions: [],
    children: (results) => {
      expect(results).toEqual([]);
      return <div data-testid="empty-result">No data</div>;
    },
  });

  render(result);
  expect(screen.getByTestId("empty-result")).toHaveTextContent("No data");
});

test("fetch 함수에서 오류가 발생하면 적절히 처리해야 한다", async () => {
  const errorMessage = "Failed to fetch data";
  const mockSuccessFetch = vi.fn().mockResolvedValue({ status: "success" });
  const mockFailedFetch = vi.fn().mockRejectedValue(new Error(errorMessage));

  try {
    await FetchBoundary({
      fetchFunctions: [mockSuccessFetch, mockFailedFetch],
      children: (results) => <div>{JSON.stringify(results)}</div>,
    });
    expect(true).toBe(false);
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe(errorMessage);
    expect(mockSuccessFetch).toHaveBeenCalledTimes(1);
    expect(mockFailedFetch).toHaveBeenCalledTimes(1);
  }
});

test("모든 Promise를 병렬로 처리해야 한다", async () => {
  let resolve1: (value: string) => void;
  let resolve2: (value: number) => void;

  const promise1 = new Promise<string>((resolve) => {
    resolve1 = resolve;
  });

  const promise2 = new Promise<number>((resolve) => {
    resolve2 = resolve;
  });

  const fetch1 = vi.fn().mockImplementation(() => promise1);
  const fetch2 = vi.fn().mockImplementation(() => promise2);

  let childrenCalled = false;

  const boundaryPromise = FetchBoundary({
    fetchFunctions: [fetch1, fetch2],
    children: (results) => {
      childrenCalled = true;
      expect(results[0]).toBe("result1");
      expect(results[1]).toBe(42);
      return <div>완료</div>;
    },
  });

  expect(childrenCalled).toBe(false);

  resolve1!("result1");
  resolve2!(42);

  await boundaryPromise;

  expect(childrenCalled).toBe(true);
});
