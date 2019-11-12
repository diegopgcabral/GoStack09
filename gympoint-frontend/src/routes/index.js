import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Dashboard from '~/pages/Dashboard';
import Student from '~/pages/StudentList';
import StudentForm from '~/pages/StudentList/Form';
import Plan from '~/pages/PlanList';
import Registration from '~/pages/Registration';
import Answer from '~/pages/Answer';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" exact component={Dashboard} isPrivate />
      <Route path="/students" exact component={Student} isPrivate />
      <Route path="/student/form" exact component={StudentForm} isPrivate />
      <Route
        path="/student/form/:idStudent"
        component={StudentForm}
        isPrivate
      />

      <Route path="/plans" component={Plan} isPrivate />
      <Route path="/registrations" component={Registration} isPrivate />
      <Route path="/help-orders" component={Answer} isPrivate />

      <Route path="/" component={() => <h1>Erro 404</h1>} />
    </Switch>
  );
}
