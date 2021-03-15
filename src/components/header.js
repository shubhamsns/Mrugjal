import { Link, useLocation } from 'react-router-dom';

import { useAuth } from 'context/auth.context';
import { useFirebase } from 'context/firebase.context';

function Header() {
  const { firebaseApp } = useFirebase();
  const [user] = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link aria-label="instagram logo " to="/dashboard">
                <img
                  src="/images/logo.png"
                  alt="Instagram"
                  className="mt-2  w-6/12"
                />
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center">
            {user ? (
              <>
                <Link to="/dashboard" aria-label="dashboard">
                  <svg
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>

                <button
                  type="button"
                  title="Sign Out"
                  onClick={() => firebaseApp.auth().signOut()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') firebaseApp.auth().signOut();
                  }}
                >
                  <svg
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>

                <div className="flex items-center cursor-pointer">
                  <Link to={`/p/${user?.displayName}`}>
                    <img
                      className="rounded-full h-8 w-8 flex"
                      src={`/images/avatars/${user?.displayName}.jpg`}
                      alt={`${user?.displayName} profile`}
                    />
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* {pathname === '/login' ? ( */}
                <Link to="/signup">
                  <button
                    type="button"
                    className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
                {/* ) : ( */}
                <Link to="/login">
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>
                {/* )} */}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };
