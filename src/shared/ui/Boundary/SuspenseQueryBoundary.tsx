"use client";

import type { ReactNode } from "react";

import { type SuspenseQueriesOptions, type SuspenseQueriesResults, useSuspenseQueries } from "@tanstack/react-query";

interface Props<T extends unknown[], CombinedResult> {
  queries: readonly [...SuspenseQueriesOptions<T>];
  children: (queries: CombinedResult) => ReactNode;
  combine?: (result: SuspenseQueriesResults<T>) => CombinedResult;
}
const SuspenseQueryBoundary = <T extends unknown[], CombinedResult = SuspenseQueriesResults<T>>({
  children,
  queries,
  combine,
}: Props<T, CombinedResult>) => {
  const results = useSuspenseQueries<T, CombinedResult>({
    queries,
    combine,
  });

  return children(results);
};

export default SuspenseQueryBoundary;
