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
  rootMargin?: string;
  loadingElements?: React.ReactNode;
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
  rootMargin = "20px",
  loadingElements,
  className,
  blockObserveNextIntersect,
  blockObservePrevIntersect,
}: Props<T, QueryKey>) => {
  const queryInfo = useCursorPaginationQuery(query);
  const containerRef = useRef<HTMLElement | null>(null);

  const { ref: topRef, isIntersecting: isTopIntersecting } = useIntersectionObserver<HTMLDivElement>({
    disabled: blockObservePrevIntersect,
    threshold: 0,
    rootMargin: `${rootMargin} 0px 0px 0px`,
    root: isElementRoot ? undefined : containerRef,
  });

  const { ref: bottomRef, isIntersecting: isBottomIntersecting } = useIntersectionObserver<HTMLDivElement>({
    disabled: blockObserveNextIntersect,
    threshold: 0,
    rootMargin: `0px 0px ${rootMargin} 0px`,
    root: isElementRoot ? undefined : containerRef,
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
      {queryInfo.isFetchingPreviousPage && loadingElements}
      {children(queryInfo)}
      {queryInfo.isFetchingNextPage && loadingElements}
      {!blockObserveNextIntersect && <div ref={bottomRef} />}
    </Element>
  );
};

export default CursorVerticalInfiniteScroll;
