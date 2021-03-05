import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Login from './login';

function UnauthenticatedApp() {
  return (
    <Switch>
      <Route path="/login" component={<Login />} />
      <Route path="/*">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
}

export default UnauthenticatedApp;
