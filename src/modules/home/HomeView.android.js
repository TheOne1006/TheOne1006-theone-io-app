/**
 * @flow
 */

import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';

import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SectionList from './SectionList';
import lightStyles from './themes/light';
import darkStyles from './themes/dark';


export default class HomeView extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'TheOne.io',
    headerTintColor: 'white',
    headerLeft: (<Icon.Button
      onPress={() => navigation.navigate('DrawerOpen')}
      name="dehaze"
      size={24}
      color="#fff"
      style={{ paddingLeft: 5 }}
      backgroundColor="transparent"
      underlayColor="transparent"
    />),
    headerStyle: {
      backgroundColor: screenProps.headerBackground,
    },
  })

  componentWillMount() {
    const { resultsRequest, loaded, loading } = this.props;
    if (!loaded && !loading) {
      resultsRequest();
    }
  }

  props: {
    resultsRequest: Function,
    sections: Object,
    loading: boolean,
    loaded: boolean,
    navigate: Function,
    currentTheme: string,
  }

  render() {
    const { sections, loading, loaded, navigate, currentTheme } = this.props;

    const styles = (currentTheme === 'night') ? darkStyles : lightStyles;
    const backgroundColor = (currentTheme === 'night') ? 'dimgray' : '#39babd';

    if (!loading && loaded) {
      return (
        <View>
          <StatusBar
            translucent={false}
            backgroundColor={backgroundColor}
            barStyle="light-content"
          />
          <SectionList
            sections={sections}
            navigate={navigate}
            theme={currentTheme}
          />
        </View>
      );
    }

    return (
      <View style={styles.loading}>
        <Progress.Circle size={30} indeterminate />
      </View>
    );
  }
}
