import type { ReactNode } from "react";
import React from "react";

type Props = { children: ReactNode };

class ErrorBoundary extends React.Component<Props, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught", err, info);
  }
  render() {
    if (this.state.hasError) {
      return <div>Что-то пошло не так 😞</div>;
    }
    return this.props.children;
  }
}

export const ErrorBoundaryProvider = ({ children }: Props) => (
  <ErrorBoundary>{children}</ErrorBoundary>
);
