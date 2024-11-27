import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RegisterForm from "./layouts/register/RegisterForm";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { message } from "antd";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [,contextHolder] = message.useMessage();
  return (
    <QueryClientProvider client={queryClient}>
      {contextHolder}
      <RegisterForm />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
