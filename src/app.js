import React from 'react';

import { useAuth } from 'context/auth.context';

const AuthenticatedApp = React.lazy(() => import('pages/authenticated-app'));
const UnauthenticatedApp = React.lazy(() =>
  import('pages/unauthenticated-app'),
);

function App() {
  const [user] = useAuth();

  console.log(user);

  return (
    <React.Suspense fallback={<h3>Loading...</h3>}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export default App;
