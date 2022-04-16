import { toast } from 'react-toastify';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import { axiosConfig as api } from 'config/axios'; // void dependency cycle
import { signInSuccess, signFailure, signOut } from './actions';

export function* getProfile(response) {
  try {
    const { token, refresh_token: refreshToken } = response.data;
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      const res = yield call(api.get, '/profile/show');
      const { data: user } = res;

      yield put(signInSuccess(token, refreshToken, user));
    }
  } catch (err) {
    console.error({ err });
    toast.info('Sua sessão expirou, vamos fazer um novo login?');
    yield put(signOut());
  }
}

export function* signIn({ payload }) {
  try {
    const { username, recaptchaToken, password } = payload;
    const response = yield call(api.post, '/login/check', {
      username,
      password,
      recaptcha_token: recaptchaToken,
    });
    yield call(getProfile, response);
  } catch (err) {
    console.error({ err });
    if (err.response?.data?.message) {
      yield put(signFailure(err.response?.data?.message));
    } else {
      yield put(signFailure());
    }
    toast.error('Falha no login, verifique sua senha!');
  }
}

export function* requestRefreshToken({ payload }) {
  try {
    const { refreshToken: currentRefreshToken } = payload.auth;

    if (!currentRefreshToken) {
      yield put(signFailure());
      return;
    }
    api.defaults.headers.Authorization = '';

    const response = yield call(api.post, '/login/refresh', {
      refresh_token: currentRefreshToken,
    });

    yield call(getProfile, response);
  } catch (err) {
    console.error({ err });
    toast.info('Sua sessão expirou, vamos fazer um novo login?');
    yield put(signOut());
  }
}

export function* setToken({ payload }) {
  try {
    const { refreshToken: currentRefreshToken, token: currentToken } =
      payload.auth;

    if (!currentRefreshToken) {
      yield put(signFailure());
      return;
    }
    api.defaults.headers.Authorization = `Bearer ${currentToken}`;
  } catch {
    yield put(signOut());
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/REFRESH_SIGN_REQUEST', requestRefreshToken),
]);
