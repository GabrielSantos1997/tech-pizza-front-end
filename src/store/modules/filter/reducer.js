import produce from 'immer';

const INITIAL_STATE = { value: {} };
export default function filter(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@filter/UPDATE_FILTER': {
        draft.value = action.payload.filter;
        break;
      }
      case '@filter/REMOVE_FILTER': {
        draft.value = {};
        break;
      }
      default:
    }
  });
}
