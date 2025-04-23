import type { PropsWithChildren, ReactElement, ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, renderHook } from "@testing-library/react";

export const resolvePromiseComponent = async <T = {},>(
  Component: (props: T) => Promise<ReactElement<T>>,
  props: T,
): Promise<() => ReactElement> => {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
};

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
};

export const renderHookWithProviders: typeof renderHook = (render, options) => {
  const queryClient = createTestQueryClient();

  return renderHook(render, {
    wrapper: ({ children }: PropsWithChildren) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
    ...options,
  });
};

export const renderWithProviders = (ui: ReactNode) => {
  const queryClient = createTestQueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};
