"use client";

import { PropsWithChildren } from "react";

import { isKyHTTPError } from "@/shared/api/apiClient";
import {
  FORBIDDEN_MESSAGE,
  FORBIDDEN_STATUS,
  UNAUTHORIZED_MESSAGE,
  UNAUTHORIZED_STATUS,
} from "@/shared/constants/auth";
import ErrorBoundary, { type FallbackRenderType } from "@/shared/ui/Boundary/ErrorBoundary";

import ForbiddenError from "./ForbiddenError";
import NetworkError from "./NetworkError";
import ServerError from "./ServerError";
import UnauthorizedError from "./UnauthorizedError";

const isNetworkError = (error: unknown): boolean => {
  return (isKyHTTPError(error) && !navigator.onLine) || (error instanceof Error && !navigator.onLine);
};

const isForbiddenError = (error: unknown): boolean => {
  return (
    (isKyHTTPError(error) && error.response.status === FORBIDDEN_STATUS) ||
    (error instanceof Error && error.message === FORBIDDEN_MESSAGE)
  );
};

const isUnauthorizedError = (error: unknown): boolean => {
  return (
    (isKyHTTPError(error) && error.response.status === UNAUTHORIZED_STATUS) ||
    (error instanceof Error && error.message === UNAUTHORIZED_MESSAGE)
  );
};

const FallbackRender: FallbackRenderType = (props) => {
  if (isNetworkError(props.error)) return <NetworkError {...props} />;
  if (isForbiddenError(props.error)) return <ForbiddenError {...props} />;
  if (isUnauthorizedError(props.error)) return <UnauthorizedError {...props} />;
  return <ServerError {...props} />;
};

const CustomErrorBoundary: React.FC<PropsWithChildren> = ({ children }) => {
  return <ErrorBoundary fallbackRender={FallbackRender}>{children}</ErrorBoundary>;
};

export default CustomErrorBoundary;
