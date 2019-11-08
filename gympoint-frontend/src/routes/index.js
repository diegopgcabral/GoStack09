import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Dashboard from '~/pages/Dashboard';
import Student from '~/pages/Student';
import NewStudent from '~/pages/Student/New';
import Plan from '~/pages/Plan';
import Registration from '~/pages/Registration';
import Answer from '~/pages/Answer';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/students" component={Student} isPrivate />
      <Route path="/newStudent" component={NewStudent} isPrivate />
      <Route path="/plans" component={Plan} isPrivate />
      <Route path="/registrations" component={Registration} isPrivate />
      <Route path="/help-orders" component={Answer} isPrivate />

      <Route path="/" component={() => <h1>Erro 404</h1>} />
    </Switch>
  );
}
