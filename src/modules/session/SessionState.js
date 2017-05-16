/**
 * @flow
 */
import { Map } from 'immutable';

export const RESET_STATE = 'SessionState/RESET';
export const INITIALIZE_STATE = 'SessionState/INITIALIZE';
// Initial state
const initialState = Map({ isReady: false });

export function resetSessionStateFromSnapshot(state: Object) {
  return {
    type: RESET_STATE,
    payload: state,
  };
}

export function initializeSessionState() {
  return {
    type: INITIALIZE_STATE,
  };
}

// Reducer
export default function SessionStateReducer(state: Object = initialState, action: Object = {}) {
  switch (action.type) {
    case INITIALIZE_STATE:
    case RESET_STATE:
      return state.set('isReady', true);

    default:
      return state;
  }
}
