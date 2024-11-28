import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, useRoutes } from "react-router";
import AntApp from "@/AntApp";
import { createRoutes } from "@/routes";

const queryClient = new QueryClient();

const AppRoutes = () => {
  return useRoutes(createRoutes());
};

const App: React.FC = () => {
  return (
    <AntApp>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <AppRoutes />
          </Suspense>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AntApp>
  );
};

export default App;
