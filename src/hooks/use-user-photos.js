import { useQuery } from 'react-query';

import { getFollowingUserPhotosByUserId } from 'services/firebase';
import { useFirestoreUser } from './use-firestore-user';

function useUserPhotos() {
  const {
    user: { following, userId },
  } = useFirestoreUser();

  const query = useQuery({
    queryKey: ['user', 'timeline', following],
    queryFn: () => getFollowingUserPhotosByUserId(userId, following),
    select: (data) => {
      data.sort((a, b) => b.dateCreated - a.dateCreated);

      data.forEach((photo, idx) => {
        if (photo.photoId === data[idx].photoId) return;
        return (oldPhotos) => [...oldPhotos, photo];
      });

      return data;
    },
    enabled: Boolean(following?.length),
  });

  return query;
}

export { useUserPhotos };
