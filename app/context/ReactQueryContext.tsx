'use client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // Optional devtools

interface Props {
  children: ReactNode;
}

const ReactQueryContext: React.FC<Props> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient()); // Initialize once

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />} {/* Optional DevTools */}
    </QueryClientProvider>
  );
};

export default ReactQueryContext;
