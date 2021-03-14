import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Dashboard } from './dashboard';

function AuthenticatedApp() {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />

      <Route path="/*">
        <Redirect to="/dashboard" />
      </Route>
    </Switch>
  );
}

export default AuthenticatedApp;
