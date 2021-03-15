import React from 'react';

import { useUser } from 'hooks/use-user';
import { Suggestions } from './suggestions';
import { MemoUser as User } from './user';

function Sidebar() {
  const {
    user: { docId, fullName, username, userId, following },
  } = useUser();

  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </div>
  );
}

export { Sidebar };
