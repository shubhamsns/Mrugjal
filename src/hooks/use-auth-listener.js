import { useState, useEffect } from 'react';

import { useFirebase } from 'context/firebase.context';

export default function useAuthListener() {
  const localStorageUser = JSON.parse(localStorage.getItem('authUser'));

  const [user, setUser] = useState(localStorageUser);
  const { firebaseApp } = useFirebase();

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

  console.log(user);

  return { user };
}
export { useAuthListener };
