import { waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, expect, test } from "vitest";

import type { CursorPageParam, CursorPaginationResponseDTO } from "@/shared/api/common.interface";

import useSuspenseCursorPaginationQuery from "./useSuspenseCursorPaginationQuery";
import { renderHookWithProviders } from "../lib/test";
import { createCursorPaginationResponse } from "../models/mocks/pagination";

interface TestItem {
  id: number;
  name: string;
  placeId: number;
}

const mockItems: TestItem[] = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `Item ${index + 1}`,
  placeId: 50 - index,
}));

const server = setupServer();

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

test("cursor가 null이라면 첫 페이지부터 불러온다", async () => {
  server.use(
    http.get("/api/test", ({ request }) => {
      const url = new URL(request.url);
      const cursor = url.searchParams.get("cursor");
      const limit = Number(url.searchParams.get("limit")) || 10;
      const prev = url.searchParams.get("prev") === "true";

      const response = createCursorPaginationResponse(
        mockItems,
        cursor ? Number(cursor) : null,
        limit,
        prev,
        "placeId",
        "desc",
      );

      return HttpResponse.json(response);
    }),
  );

  const { result } = renderHookWithProviders(() =>
    useSuspenseCursorPaginationQuery<TestItem, ["test"]>({
      queryKey: ["test"],
      queryFn: async ({ pageParam }): Promise<CursorPaginationResponseDTO<TestItem>> => {
        const typedPageParam = pageParam as CursorPageParam;
        const params = new URLSearchParams({
          limit: "10",
          ...(typedPageParam?.cursor && { cursor: String(typedPageParam.cursor) }),
          ...(typedPageParam?.prev && { prev: String(typedPageParam.prev) }),
        });

        const response = await fetch(`/api/test?${params}`);
        return response.json() as Promise<CursorPaginationResponseDTO<TestItem>>;
      },
    }),
  );

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });

  expect(result.current.data).toBeDefined();
  expect(result.current.data?.data).toHaveLength(10);
  expect(result.current.data?.meta.total).toBe(50);
  expect(result.current.data?.meta.status).toBe(200);
  expect(result.current.data?.meta.message).toBe("success");

  expect(result.current.data?.data[0]?.placeId).toBe(50);
});

test("hasNext가 true라면 다음 페이지를 불러올 수 있어야 한다", async () => {
  server.use(
    http.get("/api/test", ({ request }) => {
      const url = new URL(request.url);
      const cursor = url.searchParams.get("cursor");
      const limit = Number(url.searchParams.get("limit")) || 10;
      const prev = url.searchParams.get("prev") === "true";

      const response = createCursorPaginationResponse(
        mockItems,
        cursor ? Number(cursor) : null,
        limit,
        prev,
        "placeId",
        "desc",
      );

      return HttpResponse.json(response);
    }),
  );

  const { result } = renderHookWithProviders(() =>
    useSuspenseCursorPaginationQuery<TestItem, ["test"]>({
      queryKey: ["test"],
      queryFn: async ({ pageParam }): Promise<CursorPaginationResponseDTO<TestItem>> => {
        const typedPageParam = pageParam as CursorPageParam;
        const params = new URLSearchParams({
          limit: "10",
          ...(typedPageParam?.cursor && { cursor: String(typedPageParam.cursor) }),
          ...(typedPageParam?.prev && { prev: String(typedPageParam.prev) }),
        });

        const response = await fetch(`/api/test?${params}`);
        return response.json() as Promise<CursorPaginationResponseDTO<TestItem>>;
      },
    }),
  );

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });

  expect(result.current.hasNextPage).toBe(true);

  result.current.fetchNextPage();

  await waitFor(() => {
    expect(result.current.data?.data).toHaveLength(20);
  });

  expect(result.current.data?.data).toHaveLength(20);
  expect(result.current.data?.data[10]?.placeId).toBe(40);
});

test("hasPrev가 true라면 이전 페이지를 불러올 수 있어야 한다", async () => {
  server.use(
    http.get("/api/test", ({ request }) => {
      const url = new URL(request.url);
      const cursor = url.searchParams.get("cursor");
      const limit = Number(url.searchParams.get("limit")) || 10;
      const prev = url.searchParams.get("prev") === "true";

      const response = createCursorPaginationResponse(
        mockItems,
        cursor ? Number(cursor) : null,
        limit,
        prev,
        "placeId",
        "desc",
      );

      return HttpResponse.json(response);
    }),
  );

  const { result } = renderHookWithProviders(() =>
    useSuspenseCursorPaginationQuery<TestItem, ["test"]>({
      queryKey: ["test"],
      queryFn: async ({ pageParam }): Promise<CursorPaginationResponseDTO<TestItem>> => {
        const typedPageParam = pageParam as CursorPageParam;
        const params = new URLSearchParams({
          limit: "10",
          ...(typedPageParam?.cursor && { cursor: String(typedPageParam.cursor) }),
          ...(typedPageParam?.prev && { prev: String(typedPageParam.prev) }),
        });

        const response = await fetch(`/api/test?${params}`);
        return response.json() as Promise<CursorPaginationResponseDTO<TestItem>>;
      },
      initialPageParam: { cursor: 30, prev: false },
    }),
  );

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });

  expect(result.current.hasPreviousPage).toBe(true);

  result.current.fetchPreviousPage();

  await waitFor(() => {
    expect(result.current.data?.data.length).toBeGreaterThan(10);
  });

  expect(result.current.data?.data[0]?.placeId).toBeGreaterThan(30);
});

test("여러 페이지를 불러오는 도중 메타데이터가 변경된다면 가장 마지막에 불러온 메타데이터를 유지한다", async () => {
  let requestCount = 0;

  server.use(
    http.get("/api/test", ({ request }) => {
      const url = new URL(request.url);
      const cursor = url.searchParams.get("cursor");
      const limit = Number(url.searchParams.get("limit")) || 10;
      const prev = url.searchParams.get("prev") === "true";

      requestCount++;

      const response = createCursorPaginationResponse(
        mockItems,
        cursor ? Number(cursor) : null,
        limit,
        prev,
        "placeId",
        "desc",
      );

      if (requestCount > 1) {
        response.total = 100;
        response.message = "updated";
        response.status = 201;
      }

      return HttpResponse.json(response);
    }),
  );

  const { result } = renderHookWithProviders(() =>
    useSuspenseCursorPaginationQuery<TestItem, ["test"]>({
      queryKey: ["test"],
      queryFn: async ({ pageParam }): Promise<CursorPaginationResponseDTO<TestItem>> => {
        const typedPageParam = pageParam as CursorPageParam;
        const params = new URLSearchParams({
          limit: "10",
          ...(typedPageParam?.cursor && { cursor: String(typedPageParam.cursor) }),
          ...(typedPageParam?.prev && { prev: String(typedPageParam.prev) }),
        });

        const response = await fetch(`/api/test?${params}`);
        return response.json() as Promise<CursorPaginationResponseDTO<TestItem>>;
      },
    }),
  );

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });

  expect(result.current.data?.meta.total).toBe(50);
  expect(result.current.data?.meta.message).toBe("success");
  expect(result.current.data?.meta.status).toBe(200);

  result.current.fetchNextPage();

  await waitFor(() => {
    expect(result.current.data?.data).toHaveLength(20);
  });

  expect(result.current.data?.meta.total).toBe(100);
  expect(result.current.data?.meta.message).toBe("updated");
  expect(result.current.data?.meta.status).toBe(201);
});

test("prev 방향으로 페이지를 불러올 때 올바른 메타데이터를 가져온다", async () => {
  server.use(
    http.get("/api/test", ({ request }) => {
      const url = new URL(request.url);
      const cursor = url.searchParams.get("cursor");
      const limit = Number(url.searchParams.get("limit")) || 10;
      const prev = url.searchParams.get("prev") === "true";

      const response = createCursorPaginationResponse(
        mockItems,
        cursor ? Number(cursor) : null,
        limit,
        prev,
        "placeId",
        "desc",
      );

      if (prev) {
        response.total = 200;
        response.message = "prev page";
        response.status = 202;
      }

      return HttpResponse.json(response);
    }),
  );

  const { result } = renderHookWithProviders(() =>
    useSuspenseCursorPaginationQuery<TestItem, ["test"]>({
      queryKey: ["test"],
      queryFn: async ({ pageParam }): Promise<CursorPaginationResponseDTO<TestItem>> => {
        const typedPageParam = pageParam as CursorPageParam;
        const params = new URLSearchParams({
          limit: "10",
          ...(typedPageParam?.cursor && { cursor: String(typedPageParam.cursor) }),
          ...(typedPageParam?.prev && { prev: String(typedPageParam.prev) }),
        });

        const response = await fetch(`/api/test?${params}`);
        return response.json() as Promise<CursorPaginationResponseDTO<TestItem>>;
      },
      initialPageParam: { cursor: 30, prev: false },
    }),
  );

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });

  result.current.fetchPreviousPage();

  await waitFor(() => {
    expect(result.current.data?.data.length).toBeGreaterThan(10);
  });

  expect(result.current.data?.meta.total).toBe(200);
  expect(result.current.data?.meta.message).toBe("prev page");
  expect(result.current.data?.meta.status).toBe(202);
});

test("hasNext가 false일 때 더 이상 다음 페이지를 불러올 수 없어야 한다", async () => {
  const smallMockItems = mockItems.slice(0, 5);

  server.use(
    http.get("/api/test", ({ request }) => {
      const url = new URL(request.url);
      const cursor = url.searchParams.get("cursor");
      const limit = Number(url.searchParams.get("limit")) || 10;
      const prev = url.searchParams.get("prev") === "true";

      const response = createCursorPaginationResponse(
        smallMockItems,
        cursor ? Number(cursor) : null,
        limit,
        prev,
        "placeId",
        "desc",
      );

      return HttpResponse.json(response);
    }),
  );

  const { result } = renderHookWithProviders(() =>
    useSuspenseCursorPaginationQuery<TestItem, ["test"]>({
      queryKey: ["test"],
      queryFn: async ({ pageParam }): Promise<CursorPaginationResponseDTO<TestItem>> => {
        const typedPageParam = pageParam as CursorPageParam;
        const params = new URLSearchParams({
          limit: "10",
          ...(typedPageParam?.cursor && { cursor: String(typedPageParam.cursor) }),
          ...(typedPageParam?.prev && { prev: String(typedPageParam.prev) }),
        });

        const response = await fetch(`/api/test?${params}`);
        return response.json() as Promise<CursorPaginationResponseDTO<TestItem>>;
      },
    }),
  );

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });

  expect(result.current.hasNextPage).toBe(false);
  expect(result.current.data?.data).toHaveLength(5);
});

test("hasPrev가 false일 때 더 이상 이전 페이지를 불러올 수 없어야 한다", async () => {
  server.use(
    http.get("/api/test", ({ request }) => {
      const url = new URL(request.url);
      const cursor = url.searchParams.get("cursor");
      const limit = Number(url.searchParams.get("limit")) || 10;
      const prev = url.searchParams.get("prev") === "true";

      const response = createCursorPaginationResponse(
        mockItems,
        cursor ? Number(cursor) : null,
        limit,
        prev,
        "placeId",
        "desc",
      );

      return HttpResponse.json(response);
    }),
  );

  const { result } = renderHookWithProviders(() =>
    useSuspenseCursorPaginationQuery<TestItem, ["test"]>({
      queryKey: ["test"],
      queryFn: async ({ pageParam }): Promise<CursorPaginationResponseDTO<TestItem>> => {
        const typedPageParam = pageParam as CursorPageParam;
        const params = new URLSearchParams({
          limit: "10",
          ...(typedPageParam?.cursor && { cursor: String(typedPageParam.cursor) }),
          ...(typedPageParam?.prev && { prev: String(typedPageParam.prev) }),
        });

        const response = await fetch(`/api/test?${params}`);
        return response.json() as Promise<CursorPaginationResponseDTO<TestItem>>;
      },
    }),
  );

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });

  expect(result.current.hasPreviousPage).toBe(false);
});

test("연속으로 여러 페이지를 불러온 후 메타데이터가 올바르게 유지되어야 한다.", async () => {
  server.use(
    http.get("/api/test", ({ request }) => {
      const url = new URL(request.url);
      const cursor = url.searchParams.get("cursor");
      const limit = Number(url.searchParams.get("limit")) || 10;
      const prev = url.searchParams.get("prev") === "true";

      const response = createCursorPaginationResponse(
        mockItems,
        cursor ? Number(cursor) : null,
        limit,
        prev,
        "placeId",
        "desc",
      );

      return HttpResponse.json(response);
    }),
  );

  const { result } = renderHookWithProviders(() =>
    useSuspenseCursorPaginationQuery<TestItem, ["test"]>({
      queryKey: ["test"],
      queryFn: async ({ pageParam }): Promise<CursorPaginationResponseDTO<TestItem>> => {
        const typedPageParam = pageParam as CursorPageParam;
        const params = new URLSearchParams({
          limit: "10",
          ...(typedPageParam?.cursor && { cursor: String(typedPageParam.cursor) }),
          ...(typedPageParam?.prev && { prev: String(typedPageParam.prev) }),
        });

        const response = await fetch(`/api/test?${params}`);
        return response.json() as Promise<CursorPaginationResponseDTO<TestItem>>;
      },
    }),
  );

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });
  expect(result.current.data?.data).toHaveLength(10);

  result.current.fetchNextPage();
  await waitFor(() => {
    expect(result.current.data?.data).toHaveLength(20);
  });

  result.current.fetchNextPage();
  await waitFor(() => {
    expect(result.current.data?.data).toHaveLength(30);
  });

  expect(result.current.data?.data[0]?.placeId).toBe(50);
  expect(result.current.data?.data[10]?.placeId).toBe(40);
  expect(result.current.data?.data[20]?.placeId).toBe(30);
});

test("메타데이터 메모이제이션이 동일한 페이지에서 재렌더링 시 유지되어야 한다.", async () => {
  server.use(
    http.get("/api/test", ({ request }) => {
      const url = new URL(request.url);
      const cursor = url.searchParams.get("cursor");
      const limit = Number(url.searchParams.get("limit")) || 10;
      const prev = url.searchParams.get("prev") === "true";

      const response = createCursorPaginationResponse(
        mockItems,
        cursor ? Number(cursor) : null,
        limit,
        prev,
        "placeId",
        "desc",
      );

      return HttpResponse.json(response);
    }),
  );

  const { result, rerender } = renderHookWithProviders(() =>
    useSuspenseCursorPaginationQuery<TestItem, ["test"]>({
      queryKey: ["test"],
      queryFn: async ({ pageParam }): Promise<CursorPaginationResponseDTO<TestItem>> => {
        const typedPageParam = pageParam as CursorPageParam;
        const params = new URLSearchParams({
          limit: "10",
          ...(typedPageParam?.cursor && { cursor: String(typedPageParam.cursor) }),
          ...(typedPageParam?.prev && { prev: String(typedPageParam.prev) }),
        });

        const response = await fetch(`/api/test?${params}`);
        return response.json() as Promise<CursorPaginationResponseDTO<TestItem>>;
      },
    }),
  );

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });

  const initialMeta = result.current.data?.meta;

  rerender();

  expect(result.current.data?.meta).toEqual(initialMeta);
});

test("initialPageParam을 통해 중간 페이지부터 데이터 로딩이 가능해야한다.", async () => {
  server.use(
    http.get("/api/test", ({ request }) => {
      const url = new URL(request.url);
      const cursor = url.searchParams.get("cursor");
      const limit = Number(url.searchParams.get("limit")) || 10;
      const prev = url.searchParams.get("prev") === "true";

      const response = createCursorPaginationResponse(
        mockItems,
        cursor ? Number(cursor) : null,
        limit,
        prev,
        "placeId",
        "desc",
      );

      return HttpResponse.json(response);
    }),
  );

  const { result } = renderHookWithProviders(() =>
    useSuspenseCursorPaginationQuery<TestItem, ["test"]>({
      queryKey: ["test"],
      queryFn: async ({ pageParam }): Promise<CursorPaginationResponseDTO<TestItem>> => {
        const typedPageParam = pageParam as CursorPageParam;
        const params = new URLSearchParams({
          limit: "10",
          ...(typedPageParam?.cursor && { cursor: String(typedPageParam.cursor) }),
          ...(typedPageParam?.prev && { prev: String(typedPageParam.prev) }),
        });

        const response = await fetch(`/api/test?${params}`);
        return response.json() as Promise<CursorPaginationResponseDTO<TestItem>>;
      },
      initialPageParam: { cursor: 25, prev: false },
    }),
  );

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });

  expect(result.current.data?.data[0]?.placeId).toBeLessThan(25);
  expect(result.current.hasPreviousPage).toBe(true);
});

test("데이터가 없는 경우 정상적으로 작동해야한다.", async () => {
  server.use(
    http.get("/api/test", () => {
      const response: CursorPaginationResponseDTO<TestItem> = {
        data: [],
        status: 200,
        message: "success",
        hasNext: false,
        hasPrev: false,
        total: 0,
        nextCursor: null,
        prevCursor: null,
      };

      return HttpResponse.json(response);
    }),
  );

  const { result } = renderHookWithProviders(() =>
    useSuspenseCursorPaginationQuery<TestItem, ["test"]>({
      queryKey: ["test"],
      queryFn: async ({ pageParam }): Promise<CursorPaginationResponseDTO<TestItem>> => {
        const typedPageParam = pageParam as CursorPageParam;
        const params = new URLSearchParams({
          limit: "10",
          ...(typedPageParam?.cursor && { cursor: String(typedPageParam.cursor) }),
          ...(typedPageParam?.prev && { prev: String(typedPageParam.prev) }),
        });

        const response = await fetch(`/api/test?${params}`);
        return response.json() as Promise<CursorPaginationResponseDTO<TestItem>>;
      },
    }),
  );

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });

  expect(result.current.data?.data).toHaveLength(0);
  expect(result.current.data?.meta.total).toBe(0);
  expect(result.current.hasNextPage).toBe(false);
  expect(result.current.hasPreviousPage).toBe(false);
});
