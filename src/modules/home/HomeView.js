/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SectionList from './SectionList';
import FixButton from './FixButton';
import lightStyles from './themes/light';
import darkStyles from './themes/dark';


export default class HomeView extends Component {
  static navigationOptions = {
    title: 'TheOne.io',
    header: navigation => ({
      left: (<Icon.Button
        onPress={() => navigation.navigate('DrawerOpen')}
        name="dehaze"
        size={24}
        color="#fff"
        style={{ paddingLeft: 5 }}
        backgroundColor="transparent"
        underlayColor="transparent"
      />),
      tintColor: 'white',
      style: {
        backgroundColor: '#39babd',
      },
      visible: false,
    }),
    tabBar: () => ({
      icon: props => (
        <Icon name="home" size={24} color={props.tintColor} />
      ),
    }),
  }

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
    navigation: Object,
    currentTheme: string,
  }

  render() {
    const { sections, loading, loaded, navigate, navigation, currentTheme } = this.props;

    const styles = (currentTheme === 'night') ? darkStyles : lightStyles;

    if (!loading && loaded) {
      return (
        <View style={styles.root}>
          <SectionList
            sections={sections}
            navigate={navigate}
            theme={currentTheme}
          />
          <FixButton navigation={navigation} />
        </View>
      );
    }

    return (
      <View style={styles.loading}>
        <ProgressBar progress={0.3} width={200} />
      </View>
    );
  }
}
