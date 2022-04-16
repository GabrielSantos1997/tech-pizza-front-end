import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';

import PageCard from 'components/Cards/PageCard';
import { Redirect } from 'react-router';
import { useProfile } from 'services/profile/getProfile';

function Dashboard({ color = 'light' }) {
  const { user } = useProfile();

  return (
    <PageCard
      className="bg-opacity-0 p-px shadow-none"
      color={color}
    >
      <Redirect
        to={`/${user.role == 'ROLE_SYSTEM_ADMIN' ? 'admin' : 'operator'}/spots`}
      />
    </PageCard>
  );
}

export default Dashboard;
