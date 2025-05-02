import type { JSX } from "react";

type PromiseValues = ReadonlyArray<() => Promise<unknown>> | [];

type PromiseAllAwaitedReturnType<T extends PromiseValues> = {
  -readonly [K in keyof T]: Awaited<ReturnType<T[K]>>;
};

type Props<T extends PromiseValues> = {
  fetchFunctions: T;
  children: (results: PromiseAllAwaitedReturnType<T>) => JSX.Element | Promise<JSX.Element>;
};

const FetchBoundary = async <T extends PromiseValues>({ fetchFunctions, children }: Props<T>) => {
  const results = (await Promise.all(
    fetchFunctions.map((fetchFunction) => fetchFunction()),
  )) as PromiseAllAwaitedReturnType<T>;

  return children(results);
};

export default FetchBoundary;
