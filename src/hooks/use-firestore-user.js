import { useQuery } from 'react-query';

import { useAuth } from 'context/auth.context';
import { getUserDataByUserId } from 'services/firebase';

function useFirestoreUser() {
  const user = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['current-user-data', user.uid],
    queryFn: () => getUserDataByUserId(user.uid),
    enabled: Boolean(user?.uid),
  });

  return { user: data ?? {}, error: error?.message, isLoading };
}

export { useFirestoreUser };
