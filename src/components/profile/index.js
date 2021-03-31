/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';
import {
  Route,
  Switch,
  useRouteMatch,
  NavLink,
  Link,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import { useFirestoreUser } from 'hooks/use-firestore-user';
import { getUserPhotosByUserId } from 'services/firebase';

import { Details } from './details';
import { PhotoCollection } from './photo-collection';
import { SavedCollection } from './saved-collection';

function UserProfile({ profile }) {
  const { user } = useFirestoreUser();
  const { path, url } = useRouteMatch();

  const { data: userPhotos, isLoading } = useQuery({
    queryKey: ['user-photos', profile?.userId],
    queryFn: () => getUserPhotosByUserId(profile?.userId),
    enabled: Boolean(profile?.userId),
  });

  let restrictProfileAccess = true;
  if (user.following && user.userId && profile) {
    restrictProfileAccess =
      !user.following.includes(profile.userId) &&
      user.userId !== profile.userId;
  }

  if (!profile || isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <div className="container flex justify-center">
          <Skeleton circle height={160} width={160} className="mr-3" />
        </div>
        <Skeleton height={180} width={400} className="col-span-2" />
      </div>
    );
  }

  return (
    <>
      <Details
        profileData={profile}
        postCount={userPhotos?.length ?? 0}
        userData={user}
      />
      <div className="h-16 border-t border-gray-primary mt-12 pt-4">
        {profile.privateProfile && restrictProfileAccess ? (
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-16 text-black-light border-2 border-black-light rounded-full p-3 mt-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <p className="text-black-light font-semibold mt-6">
              This Account is Private
            </p>
            <p className="text-gray-base text-sm">
              Follow to see their photos and videos.
            </p>
          </div>
        ) : profile.username === user.username ? (
          <>
            <div className="flex space-x-12 transform -translate-y-4 justify-center">
              <NavLink
                activeClassName="border-t opacity-100"
                to={`${url}/posts`}
                type="button"
                aria-label="Show your posts"
                className="flex uppercase items-center font-bold text-xs tracking-wider py-4 focus:outline-none border-transparent opacity-50"
              >
                <svg
                  className="w-4 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                Posts
              </NavLink>

              <NavLink
                activeClassName="border-t opacity-100"
                to={`${url}/saved`}
                type="button"
                aria-label="Show saved posts"
                className="flex uppercase items-center font-bold text-xs tracking-wider py-4 focus:outline-none border-transparent opacity-50"
              >
                <svg
                  className="w-4 mr-0.5"
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
                Saved
              </NavLink>
            </div>

            <Switch>
              <Route path={`${path}/posts`}>
                <PhotoCollection
                  photos={userPhotos}
                  profileUsername={profile.username}
                  loggedInUsername={user.username}
                />
              </Route>
              <Route path={`${path}/saved`}>
                <SavedCollection userSavedPosts={user.savedPosts} />
              </Route>

              <Redirect to={`${path}/posts`} />
            </Switch>
          </>
        ) : (
          <PhotoCollection
            photos={userPhotos}
            profileUsername={profile.username}
            loggedInUsername={user.username}
          />
        )}
      </div>
    </>
  );
}

UserProfile.defaultProps = {
  profile: null,
};

UserProfile.propTypes = {
  profile: PropTypes.shape({
    dateCreated: PropTypes.number.isRequired,
    docId: PropTypes.string.isRequired,
    followers: PropTypes.arrayOf(PropTypes.string).isRequired,
    following: PropTypes.arrayOf(PropTypes.string).isRequired,
    userInfo: PropTypes.shape({
      bio: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
    }).isRequired,
    photoURL: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    allowSuggestions: PropTypes.bool.isRequired,
    privateProfile: PropTypes.bool.isRequired,
  }),
};

export { UserProfile };
