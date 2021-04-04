import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Skeleton from 'react-loading-skeleton';
import { CloudinaryImage } from 'components/cloudinary-image';

function User({ userData, isLoading }) {
  if (isLoading) return <Skeleton count={1} height={61} />;

  return (
    <Link
      to={`/u/${userData.username}`}
      className="grid grid-cols-4 gap-4 mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        {userData.photoURL ? (
          <CloudinaryImage
            src={userData.photoURL}
            alt={`${userData.username} profile`}
            size="65"
            type="profile"
            className="rounded-full h-16 w-16 flex"
          />
        ) : (
          <svg
            className="text-lg text-gray-base"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </div>
      <div className="col-span-3">
        <p className="font-semibold tracking-wide text-lg">
          {userData.username}
        </p>
        <p className=" test-sm">{userData.userInfo.fullName}</p>
      </div>
    </Link>
  );
}

User.defaultProps = {
  userData: null,
};

User.propTypes = {
  userData: PropTypes.exact({
    username: PropTypes.string,
    userInfo: PropTypes.shape({
      bio: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
    }),
    photoURL: PropTypes.string,
    verifiedUser: PropTypes.bool,
  }),
};

export { User };
