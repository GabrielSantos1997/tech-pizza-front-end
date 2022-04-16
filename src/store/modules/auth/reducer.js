import produce from 'immer';
import { axiosConfig as api } from 'config/axios';

const INITIAL_STATE = {
  user: {},
  refreshToken: null,
  token: null,
  signed: false,
  responseError: null,
  isLoading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.isLoading = true;
        break;
      }
      case '@auth/REFRESH_SIGN_REQUEST': {
        draft.isLoading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.refreshToken = action.payload.refreshToken;
        draft.user = action.payload.user;
        draft.signed = true;
        draft.isLoading = false;
        draft.responseError = null;
        break;
      }
      case '@auth/SIGN_IN_FAILURE': {
        api.defaults.headers.Authorization = '';
        draft.token = null;
        draft.signed = false;
        draft.isLoading = false;
        draft.responseError = action.payload.responseError;
        break;
      }
      case '@auth/SIGN_OUT': {
        api.defaults.headers.Authorization = '';
        draft.token = null;
        draft.refreshToken = null;
        draft.signed = false;
        draft.responseError = null;
        draft.isLoading = false;
        break;
      }
      default:
    }
  });
}
