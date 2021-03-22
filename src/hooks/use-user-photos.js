import { useQuery } from 'react-query';

import { getFollowingUserPhotosByUserId } from 'services/firebase';
import { useFirestoreUser } from './use-firestore-user';

function useUserPhotos() {
  const {
    user: { following, uid },
  } = useFirestoreUser();

  const query = useQuery({
    queryKey: 'user-photos',
    queryFn: () => getFollowingUserPhotosByUserId(uid, following),
    select: (data) => {
      data.sort((a, b) => b.dateCreated - a.dateCreated);

      // TODO: implement infinite queries
      // data.forEach((photo, idx) => {
      //   if (photo.photoId === data[idx].photoId) return;
      //   return (oldPhotos) => [...oldPhotos, photo];
      // });

      return data;
    },
    enabled: Boolean(following?.length),
  });

  return query ?? {};
}

export { useUserPhotos };
