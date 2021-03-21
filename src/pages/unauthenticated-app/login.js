import * as React from 'react';
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

  const [error, setError] = React.useState('');

  React.useEffect(() => {
    document.title = 'Login - Instagram';
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

          <Form
            errors={errors}
            control={control}
            onSubmit={handleSubmit(mutate)}
            className="w-full"
          >
            <Input
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
              className="bg-blue-medium text-white w-full rounded h-8 font-bold"
            >
              {isLoading ? 'Logging in...' : 'Login'}
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
      </div>
    </div>
  );
}

export { Login };
