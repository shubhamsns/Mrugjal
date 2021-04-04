import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useFirebase } from 'context/firebase.context';
import { createFirestoreUser, doesUserExist } from 'services/firebase';
import { Form, Input } from 'components/form';
import { UserSignUpSchema } from 'helpers/validations';

function Signup() {
  const { firebaseApp } = useFirebase();

  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Signup - Mrugjal';
  }, []);

  const { control, errors, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
      username: '',
    },
    resolver: yupResolver(UserSignUpSchema),
  });

  const { mutate, isLoading } = useMutation(
    async (data) => {
      const usernameExist = await doesUserExist(data.username);

      if (usernameExist) {
        throw new Error('Username already exists, please try another!');
      } else {
        return firebaseApp
          .auth()
          .createUserWithEmailAndPassword(data.email, data.password)
          .then((userCredential) => {
            const { user } = userCredential;

            user.updateProfile({
              displayName: data.username.toLowerCase(),
              photoURL: '',
            });

            return createFirestoreUser({
              userId: user.uid,
              username: data.username.toLowerCase(),
              userInfo: {
                fullName: data.fullName,
                website: '',
                bio: '',
              },
              followers: [],
              following: [],
              emailAddress: data.email,
              photoURL: '',
              dateCreated: Date.now(),
              verifiedUser: false,
              privateProfile: false,
              savedPosts: [],
              allowSuggestions: true,
            });
          });
      }
    },
    {
      // any way you will get pushed there, by authprovider so you dont need to programmatically push on Success 😎
      onError: (error) => {
        setError(error.message);
        reset();
      },
    },
  );

  return (
    <>
      <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
        <h1 className="flex justify-center w-full">
          <img
            src="/images/mrugjal-light.png"
            alt="mrugjal logo"
            className="mt-2 w-6/12 mb-4"
          />
        </h1>

        {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

        <Form control={control} errors={errors} onSubmit={handleSubmit(mutate)}>
          <Input
            name="username"
            aria-label="Enter your username"
            type="text"
            placeholder="Username"
          />

          <Input
            name="fullName"
            aria-label="Enter your full name"
            type="text"
            placeholder="Full Name"
          />

          <Input
            name="email"
            aria-label="Enter your email address"
            type="text"
            placeholder="Email Address"
          />

          <Input
            name="password"
            aria-label="Enter your password"
            type="password"
            placeholder="Password"
          />

          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-medium text-white w-full rounded h-8 font-bold"
          >
            {isLoading ? 'Setting up your Account...' : 'Sign up'}
          </button>
        </Form>
      </div>

      <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
        <p className="text-sm">
          Have an account?{` `}
          <Link to="/signin" className="font-bold text-blue-medium">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}

export { Signup };
