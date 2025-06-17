import type { PropsWithChildren, ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, renderHook } from "@testing-library/react";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

export const resolvePromiseComponent = async <T = {},>(
  Component: (props: T) => Promise<ReactNode>,
  props: T,
): Promise<() => ReactNode> => {
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
  return render(ui, {
    wrapper: ({ children }: PropsWithChildren) => (
      <MemoryRouterProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </MemoryRouterProvider>
    ),
  });
};
