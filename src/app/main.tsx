import type { ReactNode } from "react";
import {
  ErrorBoundaryProvider,
  ReactQueryProvider,
  ToastProvider,
} from "@/app/providers";

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <ErrorBoundaryProvider>
    <ReactQueryProvider>
      <ToastProvider>{children}</ToastProvider>
    </ReactQueryProvider>
  </ErrorBoundaryProvider>
);
