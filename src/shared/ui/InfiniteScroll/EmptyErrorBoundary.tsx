"use client";

import { Component, type ReactNode } from "react";

export class EmptyError extends Error {}

interface Props {
  fallback: ReactNode;
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class EmptyErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    if (error instanceof EmptyError) {
      return { hasError: true, error };
    }

    throw error;
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export default EmptyErrorBoundary;
