import React from 'react';

import { useAuth } from 'context/auth.context';

const AuthenticatedApp = React.lazy(() => import('pages/authenticated-app'));
const UnauthenticatedApp = React.lazy(() =>
  import('pages/unauthenticated-app'),
);

function App({ children }) {
  const auth = useAuth();

  return (
    <React.Suspense fallback={<h3>Loading...</h3>}>
      {false ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export default App;
