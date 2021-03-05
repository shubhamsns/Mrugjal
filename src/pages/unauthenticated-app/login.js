import { useFirebase } from 'context/firebase.context';
import * as React from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory();
  const { firebase } = useFirebase();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setpassword] = React.useState('');
  // 1:19:27
  return <div>login</div>;
}

export default Login;
