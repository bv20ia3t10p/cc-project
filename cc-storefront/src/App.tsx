import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RegisterForm from "./layouts/register/RegisterForm";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import AntApp from "./AntApp";
import Page from "./layouts/Page";
import { IProps } from "./interfaces/IProps";
import { createRoutes } from "./routes";
import { BrowserRouter, useRoutes } from "react-router";
import { Suspense } from "react";

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
