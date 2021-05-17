/* eslint-disable no-nested-ternary */
import Skeleton from 'react-loading-skeleton';

import { useUserPhotos } from 'hooks/use-user-photos';
import { Link } from 'react-router-dom';
import { Post } from './post';

function Timeline() {
  const { data: photos, isError, isLoading } = useUserPhotos();

  if (isLoading) {
    return (
      <main className="container col-span-2">
        <Skeleton className="mb-4" count={4} height={550} />
      </main>
    );
  }

  if (!isLoading && !photos.length) {
    return (
      <main className="container col-span-2 flex flex-col items-center">
        {isError && (
          <p className="bg-white border border-gray-primary py-4 mt-1 px-2.5 text-lg font-semibold text-black-light rounded text-center">
            There was a server error, please try again later!
          </p>
        )}
        <p className="text-center text-2xl">Follow people to see photos!</p>
        <p className="mt-6 text-center text-xl text-gray-base">
          <Link to="/explore" className="underline">
            Explore Photos
          </Link>
        </p>
        <p className="text-center text-xl text-gray-base mt-2">
          <Link to="/explore/people/suggestions" className="underline">
            Explore People
          </Link>
        </p>
      </main>
    );
  }

  return (
    <main className="container col-span-2">
      {photos?.map((photo) => (
        <Post key={photo.photoId} postData={photo} />
      ))}
    </main>
  );
}

export { Timeline };
