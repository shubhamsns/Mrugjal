import * as React from 'react';

import { useAuth } from 'context/auth.context';

import { FullpageLoader } from 'components/fullpage-loader';

const AuthenticatedApp = React.lazy(() => import('pages/authenticated-app'));
const UnauthenticatedApp = React.lazy(() =>
  import('pages/unauthenticated-app'),
);

function App() {
  const user = useAuth();

  return (
    <React.Suspense fallback={<FullpageLoader />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export { App };
