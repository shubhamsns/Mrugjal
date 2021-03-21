import * as React from 'react';

import { firebaseApp, FieldValue } from 'lib/firebase';

const FirebaseContext = React.createContext(null);
FirebaseContext.displayName = 'FirebaseContext';

function FirebaseProvider(props) {
  const value = React.useMemo(() => ({ firebaseApp, FieldValue }), []);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <FirebaseContext.Provider value={value} {...props} />;
}

/**
 * A hook for fast access to `firebase context`
 *
 * @returns {{firebaseApp: object; FieldValue: object}}
 */
function useFirebase() {
  const context = React.useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error(`useFirebase must be within FirebaseProvider`);
  }

  return context;
}

export { FirebaseProvider, useFirebase };
