import { Redirect, Route, Switch } from 'react-router-dom';

import { Login } from './login';
import { Signup } from './signup';

function UnauthenticatedPages() {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>

      <Redirect to="/login" />
    </Switch>
  );
}

function UnauthenticatedApp() {
  return (
    <div className="container flex mx-auto max-w-screen-md items-center justify-center h-screen">
      <div className="md:flex md:w-3/5 hidden">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram app"
        />
      </div>

      <div className="flex flex-col md:w-2/5 w-full max-w-sm">
        <UnauthenticatedPages />
      </div>
    </div>
  );
}

export default UnauthenticatedApp;
