import * as React from 'react';
import { Route, Switch } from 'react-router';
import { hot } from 'react-hot-loader';
import { LoginPageConnected } from './components/loginPage';

export const App = hot(module)(() => (
  <Switch>
    <Route path="/" component={LoginPageConnected} />
  </Switch>
));
