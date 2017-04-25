import React from 'react';
import { Platform, ScrollView, Text, Button } from 'react-native';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CounterViewContainer from '../counter/CounterViewContainer';
import ColorViewContainer from '../colors/ColorViewContainer';
import DemoViewContainer from '../demo/DemoViewContainer';

const headerColor = '#39babd';
const activeColor = 'white';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  Counter: { screen: CounterViewContainer },
  Color: { screen: ColorViewContainer },
  Demo: { screen: DemoViewContainer },
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
});

class MyNotificationsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Notifications',
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}

const AppNavigatorWithDrawer = DrawerNavigator({
  Home: {
    screen: AppNavigator,
  },
  Notifications: {
    screen: MyNotificationsScreen,
  },
});

export default AppNavigatorWithDrawer;
