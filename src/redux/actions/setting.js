/**
 * @flow
 */
/* eslint-disable import/prefer-default-export */

import { SWITCH_THEME } from '../constants/setting';

export function switchTheme(theme: string) {
  return {
    type: SWITCH_THEME,
    payload: {
      theme,
    },
  };
}
