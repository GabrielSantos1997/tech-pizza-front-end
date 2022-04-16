export function signInRequest({ username, password, recaptchaToken }) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { username, password, recaptchaToken },
  };
}

export function signInSuccess(token, refreshToken, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user, refreshToken },
  };
}

export function signFailure(responseError) {
  return {
    type: '@auth/SIGN_IN_FAILURE',
    payload: { responseError },
  };
}

export function refreshSign({ refreshToken }) {
  return {
    type: '@auth/REFRESH_SIGN_REQUEST',
    payload: { auth: { refreshToken } },
  };
}
export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
