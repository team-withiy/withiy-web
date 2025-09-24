"use client";

import useSuspenseCursorPaginationQuery, {
  type UseSuspenseCursorPaginationQueryOptions,
  type UseSuspenseCursorPaginationQueryResult,
} from "@/shared/hooks/useSuspenseCursorPaginationQuery";

interface Props<T, QueryKey extends readonly unknown[]> {
  query: UseSuspenseCursorPaginationQueryOptions<T, QueryKey>;
  children: (props: UseSuspenseCursorPaginationQueryResult<T>) => React.ReactNode;
}

const SuspenseCursorPaginationBoundary = <T, QueryKey extends readonly unknown[]>({
  query,
  children,
}: Props<T, QueryKey>) => {
  const queryInfo = useSuspenseCursorPaginationQuery(query);
  return children(queryInfo);
};

export default SuspenseCursorPaginationBoundary;
