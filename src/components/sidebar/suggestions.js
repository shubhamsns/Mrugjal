import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

import { getSuggestedProfilesByUserId } from 'services/firebase';
import { SuggestedProfile } from './suggested-profile';

function Suggestions({ userId, userFollowing }) {
  const [profiles, setProfiles] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function suggestedProfiles() {
      const response = await getSuggestedProfilesByUserId(
        userId,
        userFollowing,
      );
      setProfiles(response);
    }

    if (userId) {
      suggestedProfiles();
    }
    setLoading(false);
  }, [userFollowing, userId]);

  if (loading) {
    return <Skeleton count={2} height={150} className="mt-5" />;
  }

  if (!profiles?.length) return null;

  return (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            suggestedUser={profile}
            currentUserId={userId}
          />
        ))}
      </div>
    </div>
  );
}

Suggestions.propTypes = {
  userId: PropTypes.string,
  userFollowing: PropTypes.array,
  // loggedInUserDocId: PropTypes.string,
};

export { Suggestions };
