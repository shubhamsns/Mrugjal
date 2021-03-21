import { useState, useEffect } from 'react';

import { useFirebase } from 'context/firebase.context';

function useAuthListener() {
  const localStorageUser = JSON.parse(localStorage.getItem('authUser'));

  const { firebaseApp } = useFirebase();
  const [user, setUser] = useState(localStorageUser);

  useEffect(() => {
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

  return { user };
}

export { useAuthListener };
