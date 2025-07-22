import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const ReactQueryProvider = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
    {process.env.NODE_ENV !== "development" && (
      <ReactQueryDevtools initialIsOpen={false} />
    )}
  </QueryClientProvider>
);
