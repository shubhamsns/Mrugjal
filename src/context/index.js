import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './auth.context';
import { FirebaseProvider } from './firebase.context';

function AppProviders({ children }) {
  return (
    <Router>
      <FirebaseProvider>
        <AuthProvider>{children}</AuthProvider>
      </FirebaseProvider>
    </Router>
  );
}

export { AppProviders };
