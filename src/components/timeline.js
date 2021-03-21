import Skeleton from 'react-loading-skeleton';

import { useUserPhotos } from 'hooks/use-user-photos';

function Timeline() {
  const { photos } = useUserPhotos();

  console.log(photos);

  return (
    <div className="container col-span-2">
      <p>I am the timeline</p>
    </div>
  );
}

export { Timeline };
