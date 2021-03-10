import * as React from 'react';

const AuthContext = React.createContext();
AuthContext.displayName = 'AuthContext';

function AuthProvider(props) {
  const [user, setUser] = React.useState(null);
  const memoizedValue = React.useMemo(() => [user, setUser], [user]);

  return <AuthContext.Provider value={memoizedValue} {...props} />;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
