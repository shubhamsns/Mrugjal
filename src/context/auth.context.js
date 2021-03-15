import * as React from 'react';

import { useFirebase } from './firebase.context';

const AuthContext = React.createContext();
AuthContext.displayName = 'AuthContext';

function AuthProvider(props) {
  const { firebaseApp } = useFirebase();

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const listener = firebaseApp.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    return () => listener();
  }, [firebaseApp]);

  const value = React.useMemo(() => [user, setUser], [user]);

  return <AuthContext.Provider value={value} {...props} />;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
