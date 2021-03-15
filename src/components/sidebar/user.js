import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Skeleton from 'react-loading-skeleton';

function User({ username, fullName }) {
  if (!username || !fullName) return <Skeleton count={1} height={61} />;

  return (
    <Link
      to={`/p/${username}`}
      className="grid grid-cols-4 gap-4 mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <img
          className="rounded-full w-16 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt="user avatar"
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold test-sm">{username}</p>
        <p className=" test-sm">{fullName}</p>
      </div>
    </Link>
  );
}
const MemoUser = memo(User);

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
};

export { MemoUser };
