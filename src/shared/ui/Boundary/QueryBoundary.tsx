"use client";

import type { ReactNode } from "react";

import { type QueriesOptions, type QueriesResults, useQueries } from "@tanstack/react-query";

interface Props<T extends unknown[], CombinedResult> {
  queries: readonly [...QueriesOptions<T>];
  children: (queries: CombinedResult) => ReactNode;
  combine?: (result: QueriesResults<T>) => CombinedResult;
}
const QueryBoundary = <T extends unknown[], CombinedResult = QueriesResults<T>>({
  children,
  queries,
  combine,
}: Props<T, CombinedResult>) => {
  const results = useQueries<T, CombinedResult>({
    queries,
    combine,
  });

  return children(results);
};

export default QueryBoundary;
