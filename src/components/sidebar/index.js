import { useFirestoreUser } from 'hooks/use-firestore-user';

import { Suggestions } from './suggestions';
import { User } from './user';

function Sidebar() {
  const {
    user: { userInfo, username, userId, following, photoURL, verifiedUser },
    isLoading,
  } = useFirestoreUser();

  return (
    <aside
      className="hidden lg:block p-4 pt-0 sticky top-24 h-fit"
      aria-label="Profile information"
    >
      <User
        userData={{ username, userInfo, photoURL, verifiedUser }}
        isLoading={isLoading}
      />
      <Suggestions userId={userId} userFollowing={following} />
    </aside>
  );
}

export { Sidebar };
