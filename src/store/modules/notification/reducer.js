import produce from 'immer';

const INITIAL_STATE = {
  userId: '44lILV2o5-Cod0S',
  firebaseToken: '',
  unreadMessages: [],
  readMessages: [],
};

export default function notification(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@notification/SET_TOKEN_PUSH_REQUEST': {
        draft.firebaseToken = action.payload.firebaseToken;
        break;
      }
      case '@notification/SET_TOKEN_PUSH_SUCCESS': {
        draft.userId = action.payload.userId;
        break;
      }
      case '@notification/SET_TOKEN_PUSH_FAILURE': {
        draft.userId = null;
        draft.unreadMessages = [];
        draft.readMessages = [];
        break;
      }

      case '@notification/SET_MESSAGES': {
        draft.readMessages = action.payload.messages;
        break;
      }
      case '@notification/SET_NEW_MESSAGE': {
        draft.unreadMessages.push(action.payload.message);
        break;
      }
      case '@notification/SET_READ_MESSAGE': {
        let index = -1;

        const value = draft.readMessages.find((message, arrIndex) => {
          if (message.identifier === action.payload.identifier) {
            index = arrIndex;
            return true;
          }
          return false;
        });
        if (value) {
          draft.unreadMessages.splice(index, 1);
          draft.readMessages.push(value);
        }

        break;
      }

      case '@auth/SIGN_OUT': {
        draft.userId = null;
        draft.unreadMessages = [];
        draft.readMessages = [];
        break;
      }

      default:
    }
  });
}
