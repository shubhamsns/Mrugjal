import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';

import { getSuggestedProfilesByUserId } from 'services/firebase';

import { Link } from 'react-router-dom';
import { SuggestedProfile } from './suggested-profile';

function Suggestions({ userData, userFollowing }) {
  const { isLoading, data } = useQuery({
    queryKey: ['suggested-profile', userData.userId],
    queryFn: () => getSuggestedProfilesByUserId(userData.userId, userFollowing),
    enabled: Boolean(userData?.userId),
  });

  if (isLoading) {
    return <Skeleton count={1} height={300} className="mt-7" />;
  }

  if (!isLoading && !data) return null;

  return (
    <div className="flex flex-col rounded">
      <div className="flex items-center align-items justify-between mb-5">
        <p className="font-semibold text-gray-500 text-sm">
          Suggestions For You
        </p>
        <Link
          to="/explore/people/suggestions"
          className="text-xs py-1 px-2 font-semibold"
        >
          See All
        </Link>
      </div>

      <div className="grid gap-4">
        {data.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            suggestedUser={profile}
            currentUser={userData}
          />
        ))}
      </div>
    </div>
  );
}

Suggestions.defaultProps = {
  userData: null,
  userFollowing: null,
};

Suggestions.propTypes = {
  userData: PropTypes.shape({
    userId: PropTypes.string,
    username: PropTypes.string,
    photoURL: PropTypes.string,
  }),
  userFollowing: PropTypes.arrayOf(PropTypes.string),
};

export { Suggestions };
