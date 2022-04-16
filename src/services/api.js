import { toast } from 'react-toastify';
import { axiosConfig as api } from 'config/axios';
import { store } from 'store';
import { refreshSign, signOut } from 'store/modules/auth/actions';

export const Logout = () => {
  api.delete('/profile/logout', {}).finally(() => {
    const { dispatch } = store;
    dispatch(signOut());
  });
};

export const Refresh = () => {
  const { dispatch } = store;
  const { refreshToken, isLoading } = store.getState().auth;
  if (isLoading) {
    return;
  }
  dispatch(refreshSign({ refreshToken }));
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { url } = error.config;
    const can401 = !(
      url === '/login/check' ||
      url === '/profile/logout' ||
      url === '/login/refresh' ||
      url === '/profile/show'
    );

    if (error.response?.status === 401 && can401) {
      Refresh();
      return Promise.reject(error);
    }
    if (error.response?.status === 403) {
      toast.error('Você não está autorizado, entre como administrador.');
      return Promise.reject(error);
    }
    if (error.response?.status === 404 || error.response?.status === 406) {
      console.error({ error: error.response });
      return Promise.reject(error);
    }
    if (error.response?.status === 500) {
      toast.info('Algo deu errado, tente novamente mais tarde!');
      return Promise.reject(error);
    }
    if (error.response) {
      if (error.response.data.errors && error.response.data.errors.length) {
        error.response.data.errors.map((err) => toast.info(err.message));
        return Promise.reject(error);
      }
      if (error.response.data.message) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
        return Promise.reject(error);
      }
      toast.info('Algo deu errado.');
      return Promise.reject(error);
    }

    toast.info('Algo deu errado.');
    return Promise.reject(error);
  }
);

export default api;
