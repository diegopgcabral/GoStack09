import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Dashboard from '~/pages/Dashboard';
import Student from '~/pages/Student/List';
import StudentForm from '~/pages/Student/Form';
import Plan from '~/pages/Plan/List';
import PlanFrom from '~/pages/Plan/Form';
import Registration from '~/pages/Registration/List';
import RegistrationForm from '~/pages/Registration/Form';
import HelpOrder from '~/pages/HelpOrder';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" exact component={Dashboard} isPrivate />

      <Route path="/students" exact component={Student} isPrivate />
      <Route path="/students/form" exact component={StudentForm} isPrivate />
      <Route
        path="/students/form/:idStudent"
        component={StudentForm}
        isPrivate
      />

      <Route path="/plans" exact component={Plan} isPrivate />
      <Route path="/plans/form" exact component={PlanFrom} isPrivate />
      <Route path="/plans/form/:idPlan" exact component={PlanFrom} isPrivate />

      <Route path="/registrations" exact component={Registration} isPrivate />
      <Route
        path="/registrations/form"
        exact
        component={RegistrationForm}
        isPrivate
      />
      <Route
        path="/registrations/form/:idRegistration"
        exact
        component={RegistrationForm}
        isPrivate
      />

      <Route path="/help-orders" component={HelpOrder} isPrivate />

      <Route path="/" component={() => <h1>Erro 404</h1>} />
    </Switch>
  );
}
