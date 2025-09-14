import { useCallback, useRef } from "react";

import {
  DefaultError,
  QueryClient,
  QueryFunction,
  UndefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { INITIAL_INFINITE_DATA_META } from "../constants/api";

import type {
  CursorPageParam,
  CursorPaginationResponseDTO,
  InfiniteDataMeta,
  InfiniteDataWithMeta,
} from "../api/common.interface";

type UseCursorPaginationQueryOptions<T, QueryKey extends readonly unknown[]> = Omit<
  UndefinedInitialDataInfiniteOptions<
    CursorPaginationResponseDTO<T>,
    DefaultError,
    InfiniteDataWithMeta<T>,
    QueryKey,
    CursorPageParam
  >,
  "queryFn" | "initialPageParam" | "getNextPageParam" | "getPreviousPageParam"
> & {
  queryFn: QueryFunction<CursorPaginationResponseDTO<T>, QueryKey>;
  initialPageParam?: CursorPageParam;
};

const useCursorPaginationQuery = <T, QueryKey extends readonly unknown[]>(
  options: UseCursorPaginationQueryOptions<T, QueryKey>,
  queryClient?: QueryClient,
) => {
  const memoizedPageParams = useRef<CursorPageParam[]>([]);
  const memoizedMeta = useRef<InfiniteDataMeta>(INITIAL_INFINITE_DATA_META);

  const queryFn: QueryFunction<CursorPaginationResponseDTO<T>, QueryKey, CursorPageParam> = useCallback(
    (ctx) => options.queryFn({ ...ctx, queryKey: options.queryKey }),
    [options],
  );

  return useInfiniteQuery<
    CursorPaginationResponseDTO<T>,
    DefaultError,
    InfiniteDataWithMeta<T>,
    QueryKey,
    CursorPageParam
  >(
    {
      ...options,
      queryFn,
      select: (data) => {
        const prevPageParams = memoizedPageParams.current;
        const currentPageParams = data.pageParams;

        const hasFirstParamChanged =
          prevPageParams?.[0]?.cursor !== currentPageParams?.[0]?.cursor ||
          prevPageParams?.[0]?.prev !== currentPageParams?.[0]?.prev;

        const isNewPageAdded = currentPageParams.length > prevPageParams.length;

        if (isNewPageAdded) {
          const latestAddedPage = hasFirstParamChanged ? data.pages[0] : data.pages[data.pages.length - 1];
          memoizedMeta.current = {
            total: latestAddedPage.total,
            message: latestAddedPage.message,
            status: latestAddedPage.status,
          };
        }

        memoizedPageParams.current = currentPageParams;
        const currentMeta = memoizedMeta.current;

        return {
          data: data.pages.flatMap((page) => page.data),
          meta: currentMeta,
        };
      },
      initialPageParam: options?.initialPageParam ?? { cursor: null, prev: false },
      getNextPageParam: (lastPage) => (lastPage.hasNext ? { cursor: lastPage.nextCursor, prev: false } : undefined),
      getPreviousPageParam: (lastPage) => (lastPage.hasPrev ? { cursor: lastPage.prevCursor, prev: true } : undefined),
    },
    queryClient,
  );
};

export default useCursorPaginationQuery;
