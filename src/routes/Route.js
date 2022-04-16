import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AuthLayout from './layouts/Auth';
import AdminLayout from './layouts/Admin';
import { useCreateHistory } from '../services/history';

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  useCreateHistory();

  const { signed, user } = useSelector((state) => state.auth);
  //TODO alterar rota de redirecionamento
  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }
  if (signed && !isPrivate) {
    return (
      <Redirect
        to={'/users/admin'}
      />
    );
  }

  const Layout = signed ? AdminLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}
