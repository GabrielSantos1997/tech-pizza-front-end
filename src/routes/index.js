import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import 'services/serviceWorker/swConfig';

import Tables from 'views/admin/Tables';
// public
import Login from 'views/auth/Login';
import Spots from 'views/admin/Spots';
import ForgotPassword from 'views/auth/ForgotPassword';

import Profile from 'views/admin/Profile';
import Users from 'views/Users';
import Employee from 'views/Employee';
import Menu from 'views/Menu';
import Client from 'views/Client';

// route
import Route from './Route';
import Dashboard from 'views/admin/Dashboard';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* public routes */}
        <Route path="/" exact component={Login} />
        <Route path="/forgotPassword" component={ForgotPassword} />

        {/* private admin */}
        <Route isPrivate path="/users/:role" component={Users} />
        <Route isPrivate path="/employee" component={Employee} />
        <Route isPrivate path="/menu" component={Menu} />
        <Route isPrivate path="/client" component={Client} />
        <Route isPrivate path="/profile" exact component={Profile} />
        <Route isPrivate path="/spots" exact component={Spots} />
        <Route isPrivate path="/operator/spots" exact component={Spots} />

        <Route isPrivate path="/admin/dashboard" component={Dashboard} />

        {/* private demo */}
        <Route isPrivate path="/admin/tables" component={Tables} />

        {/* redirect */}
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}
