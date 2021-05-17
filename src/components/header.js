import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { Link, useHistory } from 'react-router-dom';

import { useFirebase } from 'context/firebase.context';

import { useFirestoreUser } from 'hooks/use-firestore-user';
import useDisclosure from 'hooks/use-disclosure';

import { AddPost } from './post/add-post';
import { CloudinaryImage } from './cloudinary-image';
import { Modal } from './modal';
import { Dropdown } from './dropdown';
import { SearchBar } from './searchbar';

function Header() {
  const history = useHistory();
  const queryClient = useQueryClient();

  const { firebaseApp } = useFirebase();
  const { user } = useFirestoreUser();

  const [postModalStatus, setPostModalStatus] = useState(false);
  const [logoutModalStatus, setLogoutModalStatus] = useState(false);
  const { isOpen, onClose, onToggle } = useDisclosure();

  const handleLogout = () => {
    firebaseApp.auth().signOut();
    queryClient.clear();
    localStorage.clear();
    history.push('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg flex justify-between h-full items-center px-2 lg:px-0">
        <Link
          aria-label="instagram logo"
          title="instagram branding"
          to="/dashboard"
        >
          <img
            src="/images/mrugjal-light.png"
            alt="mrugjal-logo"
            className="w-36 h-full"
          />
        </Link>

        <SearchBar className="hidden sm:block" />

        <nav className="text-gray-700 text-center flex items-center">
          <AddPost userData={user} />

          <button
            type="button"
            title="Sign Out"
            aria-label="Sign Out"
            className="sm:hidden"
            onClick={() => setLogoutModalStatus(true)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') setLogoutModalStatus(true);
            }}
          >
            <svg
              className="w-7 text-black-light cursor-pointer active:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>

          <Link
            to="/dashboard"
            aria-label="dashboard"
            title="Dashboard"
            className="mr-3.5 hidden sm:block"
          >
            <svg
              className="w-7 text-black-light cursor-pointer active:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>

          <Link
            to="/explore"
            title="Explore"
            aria-label="Explore page"
            className="mr-3.5 hidden sm:block"
          >
            <svg
              className="w-7 text-black-light cursor-pointer active:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
              />
            </svg>
          </Link>

          <Dropdown
            isOpen={isOpen}
            onClose={onClose}
            button={
              <button
                type="button"
                className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-600 hidden sm:block"
                id="options-menu"
                aria-expanded={!!isOpen}
                aria-haspopup="true"
                onClick={onToggle}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') onToggle();
                }}
              >
                {user?.photoURL ? (
                  <CloudinaryImage
                    src={user.photoURL}
                    alt={`${user.displayName} profile`}
                    size="80"
                    type="profile"
                    className="rounded-full h-7 w-7"
                  />
                ) : (
                  <div>
                    <svg
                      className="w-7 text-black-light cursor-pointer active:text-gray-500"
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
                  </div>
                )}
              </button>
            }
          >
            <div className="py-0.5" role="none">
              <div
                className="flex flex-col px-3 py-2 text-sm cursor-default"
                title={user.emailAddress}
                aria-label="User email address"
              >
                <span>Signed in as</span>
                <span className="font-semibold truncate">
                  {user.emailAddress}
                </span>
              </div>
            </div>

            <div className="py-0.5" role="none" onClick={onClose}>
              <Link
                to={`/u/${user.username}`}
                title="User profile"
                aria-label="User profile"
                className="flex px-3 py-2 text-sm text-black-light hover:bg-gray-50 hover:text-gray-900"
                role="menuitem"
              >
                <svg
                  className="w-5 mr-2.5"
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
                <span>Profile</span>
              </Link>
            </div>

            <div className="py-0.5" role="none" onClick={onClose}>
              <Link
                to={`/u/${user.username}/saved`}
                title="User profile"
                aria-label="User profile"
                className="flex px-3 py-2 text-sm text-black-light hover:bg-gray-50 hover:text-gray-900"
                role="menuitem"
              >
                <svg
                  className="w-5 mr-2.5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                <span>Saved</span>
              </Link>
            </div>

            <div className="py-0.5" role="none">
              <button
                type="button"
                title="Sign Out"
                aria-label="Sign Out"
                className="flex px-3 py-2 text-sm text-black-light hover:bg-gray-50 hover:text-gray-900 w-full"
                role="menuitem"
                onClick={() => setLogoutModalStatus(true)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') setLogoutModalStatus(true);
                }}
              >
                Log Out
              </button>
            </div>
          </Dropdown>
        </nav>
      </div>

      {/* logout modal */}
      <LogoutModal
        open={logoutModalStatus}
        onClose={() => setLogoutModalStatus(false)}
        handleLogout={handleLogout}
      />
    </header>
  );
}

function LogoutModal({ open, onClose, handleLogout }) {
  return (
    <Modal
      maxW="md"
      showHeader={false}
      isOpen={open}
      onClose={onClose}
      className="rounded-xl"
    >
      <div className="flex flex-col items-center pt-5">
        <p className="text-black-light text-xl font-semibold mb-6">
          Are you Sure?
        </p>
      </div>

      <button
        type="button"
        aria-label="Upload Photo"
        className="text-red-primary text-center border-t border-b border-gray-primary cursor-pointer w-full py-2.5 px-2 font-bold text-sm"
        onClick={handleLogout}
      >
        Logout
      </button>
    </Modal>
  );
}

export { Header };
