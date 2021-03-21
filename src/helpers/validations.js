import * as Yup from 'yup';

const UserLoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email address has a wrong format')
    .required('Email address is a required field'),
  password: Yup.string()
    .min(6, 'Password must be atleast 6 characters long!')
    .max(24, 'Password must be 24 characters at most!')
    .required('Password is a required field'),
});

const UserSignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters long!')
    .max(12, 'Username must be 12 characters at most!')
    .required('Username is a required field'),
  fullName: Yup.string()
    .min(3, 'Full name must be at least 3 characters long!')
    .max(34, 'Full name must be 34 characters at most!')
    .required('Full name is a required field'),
  email: Yup.string()
    .email('Email address has a wrong format')
    .required('Email address is a required field'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long!')
    .max(24, 'Password must be 24 characters at most!')
    .required('Password is a required field'),
});

export { UserSignUpSchema, UserLoginSchema };
