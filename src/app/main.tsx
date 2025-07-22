import type { ReactNode } from "react";
import {
  ErrorBoundaryProvider,
  ReactQueryProvider,
  ToastProvider,
} from "@/app/providers";
import "@/app/styles/global.css";

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <ErrorBoundaryProvider>
    <ReactQueryProvider>
      <ToastProvider>{children}</ToastProvider>
    </ReactQueryProvider>
  </ErrorBoundaryProvider>
);
