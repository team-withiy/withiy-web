import type { JSX } from "react";

export const resolvePromiseComponent = async <T = {}>(
  Component: (props: T) => Promise<JSX.Element>,
  props: T,
): Promise<() => JSX.Element> => {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
};
