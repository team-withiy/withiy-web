"use client";

import React from "react";

import { QueryClient, QueryErrorResetBoundary, useQueryClient } from "@tanstack/react-query";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

interface FallbackRenderProps {
  resetErrorBoundary: () => void;
}

type FallbackRenderType = (props: FallbackRenderProps) => React.ReactNode;

interface Props {
  fallbackRender: FallbackRenderType;
  children: React.ReactNode;
}

const resetErrorQuery = (queryClient: QueryClient) => {
  const queryCache = queryClient.getQueryCache();
  const queryKey = queryCache.getAll().find((q) => q.state.status === "error")?.queryKey;
  queryClient.resetQueries({ queryKey });
};

const ErrorBoundary: React.FC<Props> = ({ children, fallbackRender }) => {
  const queryClient = useQueryClient();

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ReactErrorBoundary
          fallbackRender={fallbackRender}
          onReset={() => {
            reset();
            resetErrorQuery(queryClient);
          }}
        >
          {children}
        </ReactErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default ErrorBoundary;
