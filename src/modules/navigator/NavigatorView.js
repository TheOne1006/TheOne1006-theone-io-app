/**
 * @flow
 */
/* eslint-disable react/no-unused-prop-types */

import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';

import AppNavigator from './Navigator';

class NavigatorView extends Component {
  static displayName = 'NavigationView';


  props: {
    dispatch: Function,
    navigatorState: {
      index: number,
      routes: Array<{
        key: string,
        routeName: string
      }>
    }
  }

  render() {
    const { dispatch, navigatorState } = this.props;
    return (
      <AppNavigator
        navigation={
          addNavigationHelpers({
            dispatch,
            state: navigatorState,
          })
        }
      />
    );
  }
}

export default NavigatorView;
