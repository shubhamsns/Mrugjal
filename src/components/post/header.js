import { useAuth } from 'context/auth.context';
import { Link } from 'react-router-dom';

function Header({ postUser, postDocId }) {
  const user = useAuth();
  // console.log(user);

  return (
    <div className="flex border-b border-gray-primary  h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={`/p/${postUser?.username}`} className="flex items-center">
          {/* <img className='rounded-full h-8 w-8 flex mr-3' alt='avatar' src={} /> */}
        </Link>
      </div>
    </div>
  );
}

export { Header };
