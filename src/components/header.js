import { Link, useHistory } from 'react-router-dom';

import { useFirebase } from 'context/firebase.context';
import { useFirestoreUser } from 'hooks/use-firestore-user';
import { useQueryClient } from 'react-query';
import { useState } from 'react';
import { AddPost } from './post/add-post';
import { CloudinaryImage } from './cloudinary-image';

function Header() {
  const history = useHistory();
  const { firebaseApp } = useFirebase();
  const { user, isLoading } = useFirestoreUser();
  const queryClient = useQueryClient();

  const [postModalStatus, setPostModalStatus] = useState(false);

  const handleLogout = () => {
    firebaseApp.auth().signOut();
    queryClient.clear();
    localStorage.clear();
    history.push('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link aria-label="instagram logo" to="/dashboard">
                <img
                  src="/images/logo.png"
                  alt="Instagram"
                  className="mt-2  w-6/12"
                />
              </Link>
            </h1>
          </div>

          <div className="text-gray-700 text-center flex items-center">
            <button
              onClick={() => setPostModalStatus((prev) => !prev)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') setPostModalStatus((prev) => !prev);
              }}
              type="button"
              aria-label="upload image"
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            </button>
            <AddPost
              userData={user}
              displayModal={postModalStatus}
              setDisplayStatus={setPostModalStatus}
            />

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
              onClick={handleLogout}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleLogout();
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
              <Link to={`/u/${user?.username}`}>
                {user?.photoURL ? (
                  <CloudinaryImage
                    src={user.photoURL}
                    alt={`${user.displayName} profile`}
                    size="80"
                    type="profile"
                    className="rounded-full h-7 w-7"
                  />
                ) : (
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
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };
