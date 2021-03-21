import React from 'react';

import { useFirestoreUser } from 'hooks/use-firestore-user';
import { Suggestions } from './suggestions';
import { MemoUser as User } from './user';

function Sidebar() {
  const {
    user: { userInfo, username, userId, following, photoURL },
  } = useFirestoreUser();

  return (
    <div className="p-4">
      <User username={username} userInfo={userInfo} userAvatar={photoURL} />
      <Suggestions userId={userId} userFollowing={following} />
    </div>
  );
}

export { Sidebar };
