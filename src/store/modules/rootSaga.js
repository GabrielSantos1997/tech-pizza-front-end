import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import notification from './notification/sagas';

export default function* rootSaga() {
  return yield all([auth, notification]);
}
