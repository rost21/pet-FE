import * as React from 'react';
import { Switch, Route } from 'react-router';
import ROUTES from '../../../routes';
import { Profile } from './Profile/Profile';
import { Projects } from './Projects/Projects';
import { Project } from './Projects/Project/Project';

export const ContentRouter = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.MAIN} render={() => <div>Main</div>} />
      <Route exact path={ROUTES.PROJECTS} component={Projects} />
      <Route path={ROUTES.PROJECT} component={Project} />
      <Route path={ROUTES.PROFILE} component={Profile} />
    </Switch>
  );
};
