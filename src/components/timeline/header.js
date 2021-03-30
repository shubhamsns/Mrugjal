import { Image } from 'cloudinary-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Header({ user }) {
  return (
    <div className="flex border-b h-4 p-4 py-8 border-gray-200">
      <Link
        to={`/u/${user.username}`}
        className="flex items-center hover:underline"
      >
        {user.photoURL ? (
          <Image
            cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
            publicId={user.photoURL}
            alt={`${user.username} profile`}
            width="32"
            crop="scale"
            className="rounded-full h-8 w-8 flex mr-3"
          />
        ) : (
          <svg
            className="w-8 text-black-light cursor-pointer"
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
        <p className="font-semibold">{user.username}</p>
        {user.verifiedUser && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 ml-0.5 mt-1 opacity-90 text-blue-medium"
          >
            <path
              fillRule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </Link>
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
    verifiedUser: PropTypes.bool.isRequired,
  }).isRequired,
};

export { Header };
