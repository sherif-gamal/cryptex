import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  fiat: 'AUD',
  frequency: 30,
  exchange: 'BITTEREX'
};

const actionsMap = {
  [ActionTypes.UPDATE_SETTINGS](state, action) {
    return action.settings;
  },
  [ActionTypes.RESET_SETTINGS]() {
    return initialState;
  }
};

export default function settings(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
