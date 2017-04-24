import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import './src/utils/setup';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';


class theoneIoApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('theoneIoApp', () => theoneIoApp);
