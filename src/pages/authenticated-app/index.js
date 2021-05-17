import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { Header } from 'components/header';
import { NotFound } from 'pages/404';
import { BottomNav } from 'components/bottom-nav';
import { Dashboard } from './timeline';
import { Profile } from './profile';
import { Explore } from './explore';
import { PostPage } from './post';
import { Suggested } from './suggested';

function ExploreRoutes() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/photos`}>
        <Explore />
      </Route>

      <Route path={`${path}/people/suggestions`}>
        <Suggested />
      </Route>

      <Redirect to={`${path}/photos`} />
    </Switch>
  );
}

function AuthenticatedRoutes() {
  return (
    <Switch>
      <Route path="/timeline">
        <Dashboard />
      </Route>

      <Route path="/u/:username">
        <Profile />
      </Route>

      <Route path="/p/:postId">
        <PostPage />
      </Route>

      <Route path="/explore">
        <ExploreRoutes />
      </Route>

      <Route path="/not-found">
        <NotFound />
      </Route>

      <Redirect to="/timeline" />
    </Switch>
  );
}

function AuthenticatedApp() {
  return (
    <div className="bg-gray-background">
      <Header />
      <AuthenticatedRoutes />
      <BottomNav />
    </div>
  );
}

export default AuthenticatedApp;
