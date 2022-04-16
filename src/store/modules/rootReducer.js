import { combineReducers } from 'redux';

import auth from './auth/reducer';
import filter from './filter/reducer';
import notification from './notification/reducer';

export default combineReducers({
  auth,
  notification,
  filter,
});
