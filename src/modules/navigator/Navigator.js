import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CounterViewContainer from '../counter/CounterViewContainer';
import ColorViewContainer from '../colors/ColorViewContainer';
import HomeContainer from '../home/HomeContainer';
import DrawerView from '../drawer/DrawerView';
import CatesContainer from '../cates/CatesContainer';
import ArticleContainer from '../article/ArticleContainer';

const headerColor = '#39babd';
const activeColor = 'white';


// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  Main: { screen: HomeContainer },
  Demo: { screen: CatesContainer },
  Article: { screen: ArticleContainer },
}, {
  tabBarOptions: {
    activeTintColor: '#e91e63',
    ...Platform.select({
      android: {
        activeTintColor: activeColor,
        indicatorStyle: { backgroundColor: activeColor },
        style: { backgroundColor: headerColor },
      },
    }),
  },
});

MainScreenNavigator.navigationOptions = () => ({
  title: '首页',
  header: {
    left: (<Icon.Button
      onPress={() => console.log('onPress')}
      name="dehaze"
      size={24}
      color="#fff"
      style={{ paddingLeft: 5 }}
      backgroundColor="transparent"
    />),
    titleStyle: { color: 'white' },
    style: {
      backgroundColor: headerColor,
      elevation: 0, // disable header elevation when TabNavigator visible
    },
  },
});

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Home: { screen: MainScreenNavigator },
  InfiniteColorStack: { screen: ColorViewContainer },
}, {
  initialRouteName: 'Home',
  headerMode: 'screen',
  mode: Platform.OS === 'ios' ? 'modal' : 'card',
});

const AppNavigatorWithDrawer = DrawerNavigator({
  Home: {
    screen: AppNavigator,
  },
}, {
  contentComponent: props => (<DrawerView {...props} />),
});

export default AppNavigatorWithDrawer;
