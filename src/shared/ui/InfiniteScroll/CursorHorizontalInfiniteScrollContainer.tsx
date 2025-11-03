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

const CursorHorizontalInfiniteScrollContainer = <T,>({
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

  const { ref: leftRef, isIntersecting: isLeftIntersecting } = useIntersectionObserver<HTMLDivElement>({
    disabled: blockObservePrevIntersect,
    threshold: 0,
    rootMargin: `0px 0px 0px ${rootMargin}`,
    root: isElementRoot ? undefined : containerRef,
  });

  const { ref: rightRef, isIntersecting: isRightIntersecting } = useIntersectionObserver<HTMLDivElement>({
    disabled: blockObserveNextIntersect,
    threshold: 0,
    rootMargin: `0px ${rootMargin} 0px 0px`,
    root: isElementRoot ? undefined : containerRef,
  });

  useEffect(() => {
    if (blockObservePrevIntersect) return;
    if (isLeftIntersecting && hasPreviousPage && !isFetchingPreviousPage) {
      fetchPreviousPage();
    }
  }, [blockObservePrevIntersect, isLeftIntersecting, hasPreviousPage, isFetchingPreviousPage, fetchPreviousPage]);

  useEffect(() => {
    if (blockObserveNextIntersect) return;
    if (isRightIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [blockObserveNextIntersect, isRightIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (throwOnEmpty && data?.meta.total === 0) throw new EmptyError();

  return (
    <Element className={className} ref={containerRef}>
      {!blockObservePrevIntersect && <div ref={leftRef} />}
      {isFetchingPreviousPage && loadingElements}
      {children}
      {isFetchingNextPage && loadingElements}
      {!blockObserveNextIntersect && <div ref={rightRef} />}
    </Element>
  );
};

export default CursorHorizontalInfiniteScrollContainer;
