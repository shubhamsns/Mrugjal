import { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useFirebase } from 'context/firebase.context';
import { Form, Input } from 'components/form';
import { UserLoginSchema } from 'helpers/validations';

function Login() {
  const history = useHistory();
  const { firebaseApp } = useFirebase();

  const [error, setError] = useState('');

  const [isGuestLogin, setIsGuestLogin] = useState(false);

  useEffect(() => {
    document.title = 'Login - Mrugjal';
  }, []);

  const { control, errors, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(UserLoginSchema),
  });

  const { mutate, isLoading } = useMutation(
    ({ email, password }) =>
      firebaseApp.auth().signInWithEmailAndPassword(email, password),
    {
      onSuccess: () => history.push('/'),
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
            alt="Mrugjal logo"
            className="mt-2 w-6/12 mb-4"
          />
        </h1>

        {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

        <Form
          errors={errors}
          control={control}
          onSubmit={handleSubmit(mutate)}
          className="w-full"
        >
          <Input
            autoFocus
            name="email"
            // label="Email"
            aria-label="Enter your email address"
            type="text"
            placeholder="Email address"
          />

          <Input
            // label="Password"
            name="password"
            aria-label="Enter your password"
            type="password"
            placeholder="Password"
          />

          <button
            disabled={isLoading}
            type="submit"
            className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
              isLoading ? 'opacity-50' : ''
            }`}
          >
            {isLoading && !isGuestLogin ? 'Logging in...' : 'Login'}
          </button>

          <div className="border-b mt-4 mb-4 bg-gray-base" />

          <button
            type="button"
            disabled={isLoading}
            onKeyUp={(e) => {
              setIsGuestLogin(true);
              if (e.key === 'Enter') {
                mutate({
                  email: 'happybrahmagupta@email.com',
                  password: 'password',
                });
              }
            }}
            onClick={() => {
              setIsGuestLogin(true);
              mutate({
                email: 'happybrahmagupta@email.com',
                password: 'password',
              });
            }}
            className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
              isLoading ? 'opacity-50' : ''
            }`}
          >
            {isLoading && isGuestLogin ? 'Logging in...' : 'Guest Login'}
          </button>
        </Form>
      </div>

      <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
        <p className="text-sm">
          Don't have an account?{` `}
          <Link to="/signup" className="font-bold text-blue-medium">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
}

export { Login };
