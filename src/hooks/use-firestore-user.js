import { useEffect, useState } from 'react';

import { useAuth } from 'context/auth.context';
import { getUserDataByUserId } from 'services/firebase';

function useFirestoreUser() {
  const [currentUser, setCurrentUser] = useState({});
  const [serverError, setServerError] = useState(null);
  const user = useAuth();

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await getUserDataByUserId(user.uid);

        // check to see if the state object is egual with the new object and return early else set state with returned object
        if (currentUser.userId === response.userId) return;
        setCurrentUser(response);
      } catch (error) {
        setServerError(error.message);
      }
    }

    if (user?.uid) {
      getUserData();
    }
  }, [currentUser, user]);

  return { user: currentUser, error: serverError };
}

export { useFirestoreUser };
