import { Header } from 'components/header';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Dashboard } from './dashboard';

function AuthenticatedRoutes() {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/p/:username">
        <h1>Username</h1>
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
