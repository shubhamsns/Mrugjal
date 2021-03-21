import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useFirebase } from 'context/firebase.context';
import { doesUserExist } from 'services/firebase';

function Signup() {
  const history = useHistory();
  const { firebaseApp } = useFirebase();

  const [username, setUsername] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [error, setError] = React.useState('');
  const isInvalid = password === '' || emailAddress === '';

  React.useEffect(() => {
    document.title = 'Signup - Instagram';
  }, []);

  const handleSignup = async (event) => {
    event.preventDefault();
    const usernameExists = await doesUserExist(username);

    if (usernameExists.length) {
      setUsername('');
      setError('That username is already taken, please try another.');
    } else {
      try {
        const createdUserResult = await firebaseApp
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        // authentication
        // -> emailAddress & password & username (displayName)
        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        // firebase user collection (create a document)
        await firebaseApp.firestore().collection('users').add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now(),
        });

        history.push('/dashboard');
      } catch (error) {
        setFullName('');
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      }
    }
  };

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram app"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>

          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleSignup} method="POST">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full
               rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}
            >
              Sign up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Have an account?{` `}
            <Link to="/signin" className="font-bold text-blue-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export { Signup };
