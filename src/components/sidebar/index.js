import React from 'react';

import { useFirestoreUser } from 'hooks/use-firestore-user';
import { Suggestions } from './suggestions';
import { MemoUser as User } from './user';

function Sidebar() {
  const {
    user: { fullName, username, userId, following },
  } = useFirestoreUser();

  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions userId={userId} userFollowing={following} />
    </div>
  );
}

export { Sidebar };
