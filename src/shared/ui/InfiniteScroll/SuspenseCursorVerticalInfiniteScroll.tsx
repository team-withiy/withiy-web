"use client";

import { type ElementType, useEffect, useRef } from "react";

import useIntersectionObserver from "@/shared/hooks/useIntersectionObserver";
import useSuspenseCursorPaginationQuery, {
  type UseSuspenseCursorPaginationQueryOptions,
  type UseSuspenseCursorPaginationQueryResult,
} from "@/shared/hooks/useSuspenseCursorPaginationQuery";

import { EmptyError } from "./EmptyErrorBoundary";

interface Props<T, QueryKey extends readonly unknown[]> {
  query: UseSuspenseCursorPaginationQueryOptions<T, QueryKey>;
  throwOnEmpty?: boolean;
  children: (props: UseSuspenseCursorPaginationQueryResult<T>) => React.ReactNode;
  className?: string;
  elementType: ElementType;
  isElementRoot?: boolean;
  blockObservePrevIntersect?: boolean;
  blockObserveNextIntersect?: boolean;
}

const SuspenseCursorVerticalInfiniteScroll = <T, QueryKey extends readonly unknown[]>({
  query,
  children,
  elementType: Element,
  throwOnEmpty = false,
  isElementRoot = false,
  className,
  blockObserveNextIntersect,
  blockObservePrevIntersect,
}: Props<T, QueryKey>) => {
  const queryInfo = useSuspenseCursorPaginationQuery(query);
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

export default SuspenseCursorVerticalInfiniteScroll;
