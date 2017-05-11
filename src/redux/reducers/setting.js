/**
 * @flow
 */
/* eslint-disable import/prefer-default-export */

import { Map } from 'immutable';
import {
  SWITCH_THEME,
} from '../constants/setting';

const initialState = Map({
  theme: 'light',
});

/**
 * reducer function
 */
const switchTheme = (state, action) => (state.set('theme', action.payload.theme));

/**
 * ACTION_HANDLERS
 * @type {Object}
 */

const ACTION_HANDLERS = {
  [SWITCH_THEME]: switchTheme,
};

/**
 * init Reducer
 * @param  {Object} state
 * @param  {Object} action
 * @return {Object} newState
 */
export default function init(state: Object = initialState, action: Object) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
