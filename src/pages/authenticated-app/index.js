import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Dashboard } from './dashboard';

function AuthenticatedApp() {
  return (
    <>
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>

        <Redirect to="/dashboard" />
      </Switch>
    </>
  );
}

export default AuthenticatedApp;
