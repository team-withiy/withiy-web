"use client";

import { type ElementType, ReactNode, useEffect, useRef } from "react";

import { UseCursorPaginationQueryResult } from "@/shared/hooks/useCursorPaginationQuery";
import useIntersectionObserver from "@/shared/hooks/useIntersectionObserver";

import { EmptyError } from "./EmptyErrorBoundary";

interface QueryInfo<T>
  extends Pick<
    UseCursorPaginationQueryResult<T>,
    | "data"
    | "fetchNextPage"
    | "fetchPreviousPage"
    | "hasNextPage"
    | "hasPreviousPage"
    | "isFetchingNextPage"
    | "isFetchingPreviousPage"
  > {}

interface Props<T> extends QueryInfo<T> {
  className?: string;
  elementType: ElementType;
  rootMargin?: string;
  loadingElements?: React.ReactNode;
  isElementRoot?: boolean;
  blockObservePrevIntersect?: boolean;
  blockObserveNextIntersect?: boolean;
  throwOnEmpty?: boolean;
  children: ReactNode;
}

const CursorVerticalInfiniteScrollContainer = <T,>({
  data,
  hasPreviousPage,
  isFetchingPreviousPage,
  fetchPreviousPage,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  elementType: Element,
  throwOnEmpty = false,
  isElementRoot = false,
  rootMargin = "100px",
  loadingElements,
  className,
  blockObserveNextIntersect,
  blockObservePrevIntersect,
  children,
}: Props<T>) => {
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
    if (isTopIntersecting && hasPreviousPage && !isFetchingPreviousPage) {
      fetchPreviousPage();
    }
  }, [blockObservePrevIntersect, isTopIntersecting, hasPreviousPage, isFetchingPreviousPage, fetchPreviousPage]);

  useEffect(() => {
    if (blockObserveNextIntersect) return;
    if (isBottomIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [blockObserveNextIntersect, isBottomIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (throwOnEmpty && data?.meta.total === 0) throw new EmptyError();

  return (
    <Element className={className} ref={containerRef}>
      {!blockObservePrevIntersect && <div ref={topRef} />}
      {isFetchingPreviousPage && loadingElements}
      {children}
      {isFetchingNextPage && loadingElements}
      {!blockObserveNextIntersect && <div ref={bottomRef} />}
    </Element>
  );
};

export default CursorVerticalInfiniteScrollContainer;
