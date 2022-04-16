import { store } from 'store';
import {
  setNewMessage,
  setTokenPushFailure,
  setTokenPushRequest,
} from 'store/modules/notification/actions';

const { dispatch, getState } = store;

export function canShow() {
  const { auth: { user, signed } = {}, notification: { userId } = {} } =
    getState();
  return signed && user?.identifier === userId;
}

export function setFirebaseToken(token) {
  const { auth: { user, signed } = {} } = getState();
  const { notification: { userId } = {} } = getState();
  if (signed) {
    dispatch(setTokenPushRequest(token, user?.identifier));
  } else {
    dispatch(setTokenPushFailure());
  }
  navigator.serviceWorker.addEventListener('message', (event) => {
    console.log('CANTSHOW', event, user, signed, userId);
    if (canShow()) {
      console.log('CANSHOW', event);
      dispatch(setNewMessage(event.data.msg));
    }
  });
}

export function setMessage(message) {
  dispatch(setNewMessage(message));
}
