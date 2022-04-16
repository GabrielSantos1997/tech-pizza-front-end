import { useSelector } from 'react-redux';

export const useProfile = () => {
  const { user } = useSelector((state) => state.auth);

  const isAdmin = user?.role === 'ROLE_SYSTEM_ADMIN';
  const isOperator = user?.role === 'ROLE_SPOT_GENERATOR';

  return { user, isAdmin, isOperator };
};
