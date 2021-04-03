import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { AuthProvider } from './auth.context';
import { FirebaseProvider } from './firebase.context';

const mutationCache = new MutationCache({
  //  for consoling error, you replace console with toast for better ux
  onError(error, variables, context, mutation) {
    console.error(error);
  },
});

const queryCache = new QueryCache({
  //  for consoling error, you replace console with toast for better ux
  onError(error, query) {
    console.error(error);
  },
});

const queryClient = new QueryClient({
  mutationCache,
  queryCache,
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
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  );
}

export { AppProviders };
