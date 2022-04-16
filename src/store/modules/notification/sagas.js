import { takeLatest, call, put, all } from 'redux-saga/effects';

import { axiosConfig as api } from 'config/axios'; // void dependency cycle
import { setTokenPushSuccess } from './actions';

export function* setToken({ payload }) {
  try {
    const { firebaseToken, userId } = payload;

    if (firebaseToken) {
      // yield call(api.post, `/profile/show`, {
      //   firebaseToken,
      // });
      yield call(api.get, `/profile/show`);
      yield put(setTokenPushSuccess(userId));
    }
  } catch (err) {
    console.error({ err });
  }
}

export default all([
  takeLatest('@notification/SET_TOKEN_PUSH_REQUEST', setToken),
]);
