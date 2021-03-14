import * as React from 'react';

import { useAuth } from 'context/auth.context';

const AuthenticatedApp = React.lazy(() => import('pages/authenticated-app'));
const UnauthenticatedApp = React.lazy(() =>
  import('pages/unauthenticated-app'),
);

function App() {
  const [user] = useAuth();

  return (
    <React.Suspense
      fallback={
        <div className="bg-gray-background">
          <div className="mx-auto max-w-screen-lg">
            <p className="text-center text-2xl">Loading...</p>
          </div>
        </div>
      }
    >
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export default App;
