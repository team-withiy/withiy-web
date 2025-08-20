"use client";

import type { ReactNode } from "react";

import ErrorBoundary from "@/shared/ui/Boundary/ErrorBoundary";

interface Props {
  children: ReactNode;
}

const NoFallbackErrorBoundary: React.FC<Props> = ({ children }) => {
  return <ErrorBoundary fallbackRender={() => null}>{children}</ErrorBoundary>;
};

export default NoFallbackErrorBoundary;
