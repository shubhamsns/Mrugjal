import { Header } from 'components/header';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Login } from './login';
import { Signup } from './signup';

function UnauthenticatedApp() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

        <Route path="/*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </>
  );
}

export default UnauthenticatedApp;
