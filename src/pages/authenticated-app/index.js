import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Header } from 'components/header';
import { Dashboard } from './dashboard';

function AuthenticatedRoutes() {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />

      <Route path="/u/:username">
        <h1>Username</h1>
      </Route>

      <Route path="/p/:imageId">
        <h1>image here</h1>
      </Route>

      <Redirect to="/dashboard" />
    </Switch>
  );
}

function AuthenticatedApp() {
  return (
    <div className="bg-gray-background">
      <Header />
      <AuthenticatedRoutes />
    </div>
  );
}

export default AuthenticatedApp;
