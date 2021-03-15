import * as React from 'react';

import { useAuth } from 'context/auth.context';
import { getUserByUserId } from 'services/firebase';

function useUser() {
  const [user] = useAuth();

  const [activeUser, setActiveUser] = React.useState({});

  React.useEffect(() => {
    async function getUserObjectByUserId() {
      const [response] = await getUserByUserId(user.uid);
      setActiveUser(response);
    }

    if (user?.uid) {
      getUserObjectByUserId();
    }
  }, [user]);

  // const value = React.useMemo(
  //   () => ({
  //     user: activeUser,
  //   }),
  //   [activeUser],
  // );

  return {
    user: activeUser,
  };
}

export { useUser };
