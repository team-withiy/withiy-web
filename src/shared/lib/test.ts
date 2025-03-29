import type { ReactElement } from "react";

export const resolvePromiseComponent = async <T = {}>(
  Component: (props: T) => Promise<ReactElement<T>>,
  props: T,
): Promise<() => ReactElement> => {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
};
