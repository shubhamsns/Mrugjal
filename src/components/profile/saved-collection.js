import { Gallery } from 'components/gallery';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import { getSavedPosts } from 'services/firebase';

function SavedCollection({ userSavedPosts }) {
  const { isLoading, data: savedPhotos } = useQuery({
    queryKey: ['saved', userSavedPosts],
    queryFn: () => getSavedPosts(userSavedPosts),
    enabled: userSavedPosts?.length > 0,
  });

  if (!savedPhotos && !isLoading) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-gray-base text-xs text-center">
          Only you can see what you've saved
        </p>
        <div className="mt-10 text-center w-full flex flex-col items-center">
          <svg
            className="w-16 text-black-light border-2 border-black-light rounded-full p-3 mt-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          <p className="text-3xl text-black-light mt-5 font-light">Save</p>
          <p className="text-black-light text-sm md:max-w-sm mt-3">
            Save photos and videos that you want to see again. No one is
            notified, and only you can see what you've saved.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-3 gap-8 mt-4 pb-12">
      <Gallery photos={savedPhotos} isLoading={isLoading} />
    </ul>
  );
}

SavedCollection.propTypes = {
  userSavedPosts: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export { SavedCollection };
