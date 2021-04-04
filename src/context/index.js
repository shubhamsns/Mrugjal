import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { AuthProvider } from './auth.context';
import { FirebaseProvider } from './firebase.context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry(failureCount, error) {
        if (error.statusCode === 404) return false;
        if (failureCount < 2) return true;
        return false;
      },
    },
  },
});

function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <FirebaseProvider>
          <AuthProvider>{children}</AuthProvider>
        </FirebaseProvider>
      </Router>
      <ReactQueryDevtools position="bottom-left" />
    </QueryClientProvider>
  );
}

export { AppProviders };
