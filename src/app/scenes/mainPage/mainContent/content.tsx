import * as React from 'react';
import { Switch, Route } from 'react-router';
import ROUTES from '../../../routes';
import { Profile } from './Profile/profile';
import { Projects } from './Projects/projects';

export const ContentRouter = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.MAIN} render={() => <div>Main</div>} />
      <Route path={ROUTES.PROJECTS} component={Projects} />
      <Route path={ROUTES.PROFILE} component={Profile} />
    </Switch>
  );
};
