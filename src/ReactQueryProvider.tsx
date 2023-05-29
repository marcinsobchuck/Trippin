import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

export const ReactQueryProvider: React.FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
