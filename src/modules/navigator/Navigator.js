/**
 * @flow
 */
import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import HomeContainer from '../home/HomeContainer';
import DrawerContainer from '../drawer/DrawerContainer';
import CatesContainer from '../cates/CatesContainer';
import ArticleContainer from '../article/ArticleContainer';

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Home: { screen: HomeContainer },
  Cate: { screen: CatesContainer },
  Article: { screen: ArticleContainer },
}, {
  initialRouteName: 'Home',
  headerMode: 'screen',
});

const AppNavigatorWithDrawer = DrawerNavigator({
  Home: {
    screen: AppNavigator,
  },
}, {
  contentComponent: props => (<DrawerContainer {...props} />),
});

export default AppNavigatorWithDrawer;
