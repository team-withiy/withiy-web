import type { CursorPaginationResponseDTO } from "@/shared/api/common.interface";

/**
 * 커서 페이지네이션 응답을 생성하는 유틸리티 함수
 * @param items - 전체 데이터 배열
 * @param cursor - 현재 커서 (null이면 첫 페이지)
 * @param limit - 페이지 크기
 * @param prev - 이전 페이지 여부 (true면 이전 페이지, false면 다음 페이지)
 * @param sortKey - 정렬 기준 키 (기본값: 'id')
 * @param sortOrder - 정렬 순서 ('asc' | 'desc', 기본값: 'desc')
 */
export const createCursorPaginationResponse = <T>(
  items: T[],
  cursor: number | string | null,
  limit: number,
  prev = false,
  sortKey: keyof T = "id" as keyof T,
  sortOrder: "asc" | "desc" = "desc",
): CursorPaginationResponseDTO<T> => {
  const sortedItems = [...items].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (sortOrder === "desc") {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    } else {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    }
  });

  let startIndex = 0;
  let endIndex = limit;

  if (cursor !== null && cursor !== undefined) {
    const cursorIndex = sortedItems.findIndex((item) => {
      const itemValue = item[sortKey];
      return String(itemValue) === String(cursor);
    });

    if (cursorIndex !== -1) {
      if (prev) {
        endIndex = cursorIndex;
        startIndex = Math.max(0, endIndex - limit);
      } else {
        startIndex = cursorIndex + 1;
        endIndex = Math.min(sortedItems.length, startIndex + limit);
      }
    }
  }

  const data = sortedItems.slice(startIndex, endIndex);

  const hasNext = endIndex < sortedItems.length;
  const hasPrev = startIndex > 0;
  const nextCursor = hasNext ? (data[data.length - 1]?.[sortKey] ?? null) : null;
  const prevCursor = hasPrev ? (data[0]?.[sortKey] ?? null) : null;

  return {
    data,
    status: 200,
    message: "success",
    hasNext,
    hasPrev,
    total: sortedItems.length,
    nextCursor: nextCursor as number | null,
    prevCursor: prevCursor as number | null,
  };
};

/**
 * URL 쿼리 파라미터에서 커서 페이지네이션 파라미터를 파싱하는 함수
 */
export const parseCursorPaginationParams = (params: Record<string, string | string[]>) => {
  const cursor =
    params.cursor && params.cursor !== "null"
      ? typeof params.cursor === "string"
        ? params.cursor
        : params.cursor[0]
      : null;
  const limit = params.limit ? Number(typeof params.limit === "string" ? params.limit : params.limit[0]) : 10;
  const prev = params.prev === "true" || (Array.isArray(params.prev) && params.prev[0] === "true");

  return { cursor, limit, prev };
};
