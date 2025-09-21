"use client";

import { type ElementType } from "react";

import type { InfiniteDataWithMeta } from "@/shared/api/common.interface";
import useSuspenseCursorPaginationQuery, {
  type UseSuspenseCursorPaginationQueryOptions,
  type UseSuspenseCursorPaginationQueryResult,
} from "@/shared/hooks/useSuspenseCursorPaginationQuery";

interface ItemProps<T>
  extends Pick<
      UseSuspenseCursorPaginationQueryResult<T>,
      "hasNextPage" | "hasPreviousPage" | "isFetchingNextPage" | "isFetchingPreviousPage"
    >,
    InfiniteDataWithMeta<T> {}

interface Props<T, QueryKey extends readonly unknown[]> {
  query: UseSuspenseCursorPaginationQueryOptions<T, QueryKey>;
  throwOnEmpty?: boolean;
  children: (props: ItemProps<T>) => React.ReactNode;
  className?: string;
  elementType: ElementType;
  blockObservePrevIntersect?: boolean;
  blockObserveNextIntersect?: boolean;
}

// TODO: implement intersection observer hook
// TODO: check insectionObserver container is Root or Element
// TODO: handle with ErrorBoundary when throwOnEmpty is true
const SuspenseVerticalCursorInfiniteScroll = <T, QueryKey extends readonly unknown[]>({
  query,
  children,
  elementType: Element,
  throwOnEmpty = false,
  className,
  blockObserveNextIntersect,
  blockObservePrevIntersect,
}: Props<T, QueryKey>) => {
  const { data, hasNextPage, hasPreviousPage, isFetchingNextPage, isFetchingPreviousPage } =
    useSuspenseCursorPaginationQuery(query);

  if (throwOnEmpty && data.meta.total === 0) throw new Error("No data");

  return (
    <Element className={className}>
      {!blockObservePrevIntersect && <div />}
      {children({
        data: data.data,
        meta: data.meta,
        hasNextPage,
        hasPreviousPage,
        isFetchingNextPage,
        isFetchingPreviousPage,
      })}
      {!blockObserveNextIntersect && <div />}
    </Element>
  );
};

export default SuspenseVerticalCursorInfiniteScroll;
