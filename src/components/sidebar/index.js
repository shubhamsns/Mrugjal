import React from 'react';

import { useFirestoreUser } from 'hooks/use-firestore-user';
import { Suggestions } from './suggestions';
import { MemoUser as User } from './user';

function Sidebar() {
  const {
    user: { userInfo, username, userId, following, photoURL },
  } = useFirestoreUser();

  return (
    <aside
      className="hidden lg:block p-4 pt-0 sticky top-24 h-fit"
      aria-label="Profile information"
    >
      <User username={username} userInfo={userInfo} userAvatar={photoURL} />
      <Suggestions userId={userId} userFollowing={following} />
    </aside>
  );
}

export { Sidebar };
