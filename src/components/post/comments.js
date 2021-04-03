import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { CloudinaryImage } from 'components/cloudinary-image';

function Comments({ postUser, caption, postComments }) {
  return (
    <ul className="p-5 space-y-3 overflow-y-auto flex-auto border-b border-gray-primary hidden md:block">
      <li className="flex items-center space-x-2 sm:pr-4 pr-2">
        <Link
          to={`/u/${postUser.username}`}
          className="flex items-center min-w-max self-start"
        >
          {postUser.photoURL ? (
            <CloudinaryImage
              src={postUser.photoURL}
              alt={`${postUser.username} profile`}
              size="32"
              type="profile"
              crop="scale"
              className="rounded-full h-8 w-8 flex mr-4"
            />
          ) : (
            <svg
              className="w-8 mr-4 text-black-light cursor-pointer active:text-gray-500"
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

          <p className="font-semibold hover:underline">{postUser.username}</p>
        </Link>
        <p className="text-sm mt-0.5">{caption}</p>
      </li>

      {postComments.map((entry) => (
        <li
          key={entry.commentId}
          className="flex items-center space-x-2 sm:pr-4 pr-2"
        >
          <Link
            to={`/u/${entry.username}`}
            className="flex items-center min-w-max self-start"
          >
            {entry.photoURL ? (
              <CloudinaryImage
                src={entry.photoURL}
                alt={`${entry.username} profile`}
                size="32"
                type="profile"
                crop="scale"
                className="rounded-full h-8 w-8 flex mr-4"
              />
            ) : (
              <svg
                className="w-8 mr-4 text-black-light cursor-pointer active:text-gray-500"
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

            <p className="font-semibold text-black-light hover:underline">
              {entry.username}
            </p>
          </Link>

          <p className="text-sm mt-0.5 break-words whitespace-pre-line">
            {entry.comment}
          </p>
        </li>
      ))}
    </ul>
  );
}

Comments.propTypes = {
  postUser: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
    verifiedUser: PropTypes.bool.isRequired,
    docId: PropTypes.string.isRequired,
  }).isRequired,
  caption: PropTypes.string.isRequired,
  postComments: PropTypes.arrayOf(
    PropTypes.shape({
      commentId: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      dateCreated: PropTypes.number.isRequired,
      photoURL: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export { Comments };
