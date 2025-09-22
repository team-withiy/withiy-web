"use client";

import { type ElementType, useEffect, useRef } from "react";

import useCursorPaginationQuery, {
  type UseCursorPaginationQueryOptions,
  type UseCursorPaginationQueryResult,
} from "@/shared/hooks/useCursorPaginationQuery";
import useIntersectionObserver from "@/shared/hooks/useIntersectionObserver";

import { EmptyError } from "./EmptyErrorBoundary";

interface Props<T, QueryKey extends readonly unknown[]> {
  query: UseCursorPaginationQueryOptions<T, QueryKey>;
  throwOnEmpty?: boolean;
  children: (props: UseCursorPaginationQueryResult<T>) => React.ReactNode;
  className?: string;
  elementType: ElementType;
  isElementRoot?: boolean;
  blockObservePrevIntersect?: boolean;
  blockObserveNextIntersect?: boolean;
}

const CursorVerticalInfiniteScroll = <T, QueryKey extends readonly unknown[]>({
  query,
  children,
  elementType: Element,
  throwOnEmpty = false,
  isElementRoot = false,
  className,
  blockObserveNextIntersect,
  blockObservePrevIntersect,
}: Props<T, QueryKey>) => {
  const queryInfo = useCursorPaginationQuery(query);
  const containerRef = useRef<HTMLElement | null>(null);

  const { ref: topRef, isIntersecting: isTopIntersecting } = useIntersectionObserver<HTMLDivElement>({
    disabled: blockObservePrevIntersect,
    threshold: 0,
    rootMargin: "0px",
    root: isElementRoot ? containerRef : undefined,
  });

  const { ref: bottomRef, isIntersecting: isBottomIntersecting } = useIntersectionObserver<HTMLDivElement>({
    disabled: blockObserveNextIntersect,
    threshold: 0,
    rootMargin: "0px",
    root: isElementRoot ? containerRef : undefined,
  });

  useEffect(() => {
    if (blockObservePrevIntersect) return;
    if (isTopIntersecting && queryInfo.hasPreviousPage && !queryInfo.isFetchingPreviousPage) {
      queryInfo.fetchPreviousPage();
    }
  }, [blockObservePrevIntersect, isTopIntersecting, queryInfo]);

  useEffect(() => {
    if (blockObserveNextIntersect) return;
    if (isBottomIntersecting && queryInfo.hasNextPage && !queryInfo.isFetchingNextPage) {
      queryInfo.fetchNextPage();
    }
  }, [blockObserveNextIntersect, isBottomIntersecting, queryInfo]);

  if (throwOnEmpty && queryInfo.data?.meta.total === 0) throw new EmptyError();

  return (
    <Element className={className} ref={containerRef}>
      {!blockObservePrevIntersect && <div ref={topRef} />}
      {children(queryInfo)}
      {!blockObserveNextIntersect && <div ref={bottomRef} />}
    </Element>
  );
};

export default CursorVerticalInfiniteScroll;
