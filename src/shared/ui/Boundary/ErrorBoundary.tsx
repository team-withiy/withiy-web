"use client";

import React from "react";

import { QueryClient, QueryErrorResetBoundary, useQueryClient } from "@tanstack/react-query";
import { type FallbackProps, ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

export type FallbackRenderType = (props: FallbackProps) => React.ReactNode;

interface Props {
  fallbackRender: FallbackRenderType;
  children: React.ReactNode;
  onReset?: () => void;
  onError?: ((error: Error, info: React.ErrorInfo) => void) | undefined;
}

const resetErrorQuery = (queryClient: QueryClient) => {
  const queryCache = queryClient.getQueryCache();
  const queryKey = queryCache.getAll().find((q) => q.state.status === "error")?.queryKey;
  queryClient.resetQueries({ queryKey });
};

const ErrorBoundary: React.FC<Props> = ({ children, fallbackRender, onReset, onError }) => {
  const queryClient = useQueryClient();

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ReactErrorBoundary
          fallbackRender={fallbackRender}
          onError={onError}
          onReset={() => {
            reset();
            resetErrorQuery(queryClient);
            onReset?.();
          }}
        >
          {children}
        </ReactErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default ErrorBoundary;
