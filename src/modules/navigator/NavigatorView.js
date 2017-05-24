/**
 * @flow
 */
/* eslint-disable react/no-unused-prop-types */

import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';

import AppNavigator from './Navigator';
import { styleJson as darkStyleJson } from './themes/dark';
import { styleJson as lightStyleJson } from './themes/light';

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
    },
    theme: string,
  }

  render() {
    const { dispatch, navigatorState, theme } = this.props;
    const styleJson = (theme === 'night') ? darkStyleJson : lightStyleJson;
    return (
      <AppNavigator
        screenProps={{
          theme,
          headerBackground: styleJson.header.backgroundColor,
        }}
        navigation={
          addNavigationHelpers({
            dispatch,
            state: navigatorState,
            theme,
            headerBackground: styleJson.header.backgroundColor,
          })
        }
      />
    );
  }
}

export default NavigatorView;
