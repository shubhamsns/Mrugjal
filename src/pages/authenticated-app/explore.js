import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { Gallery } from 'components/gallery';
import { useAuth } from 'context/auth.context';
import { getExplorePhotos } from 'services/firebase';

function Explore() {
  const user = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: 'explore',
    queryFn: () => getExplorePhotos(user.uid, 21),
  });

  console.log(data);

  useEffect(() => {
    document.title = `Explore • Instagram`;
  }, []);

  return (
    <div className="bg-gray-background">
      <div className="container mx-auto max-w-screen-lg px-3">
        <ul className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 md:gap-6 sm:gap-4 mt-4 pb-12">
          <Gallery
            isLoading={isLoading}
            photos={data}
            loggedInUser={user}
            withSvg
          />
        </ul>
      </div>
      {/* <BottomNavigation /> */}
    </div>
  );
}

export { Explore };
