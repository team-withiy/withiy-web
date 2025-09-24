"use client";

import useCursorPaginationQuery, {
  UseCursorPaginationQueryOptions,
  UseCursorPaginationQueryResult,
} from "@/shared/hooks/useCursorPaginationQuery";

interface Props<T, QueryKey extends readonly unknown[]> {
  query: UseCursorPaginationQueryOptions<T, QueryKey>;
  children: (props: UseCursorPaginationQueryResult<T>) => React.ReactNode;
}

const CursorPaginationBoundary = <T, QueryKey extends readonly unknown[]>({ query, children }: Props<T, QueryKey>) => {
  const queryInfo = useCursorPaginationQuery(query);
  return children(queryInfo);
};

export default CursorPaginationBoundary;
