// token
export function setTokenPushRequest(firebaseToken, userId) {
  return {
    type: '@notification/SET_TOKEN_PUSH_REQUEST',
    payload: { firebaseToken, userId },
  };
}

export function setTokenPushSuccess(userId) {
  return {
    type: '@notification/SET_TOKEN_PUSH_SUCCESS',
    payload: { userId },
  };
}
export function setTokenPushFailure() {
  return {
    type: '@notification/SET_TOKEN_PUSH_FAILURE',
  };
}

// messages
export function setMessages(messages) {
  return {
    type: '@notification/SET_MESSAGES',
    payload: { messages },
  };
}

export function setNewMessage(message) {
  return {
    type: '@notification/SET_NEW_MESSAGE',
    payload: { message },
  };
}

export function setReadMessage(identifier) {
  return {
    type: '@notification/SET_READ_MESSAGE',
    payload: { identifier },
  };
}
