import * as React from 'react';
import { Switch, Route } from 'react-router';
import ROUTES from '../../../routes';
import { ProfileConnected } from './Profile/profile';

export const ContentRouter = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.MAIN} render={() => <div>Main</div>} />
      <Route path={ROUTES.PROJECTS} render={() => <div>Projects</div>} />
      <Route path={ROUTES.PROFILE} component={ProfileConnected} />
    </Switch>
  );
};
