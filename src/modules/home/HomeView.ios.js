/**
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';

import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SectionList from './SectionList';
import FixButton from './FixButton';
import lightStyles from './themes/light';
import darkStyles from './themes/dark';


export default class HomeView extends Component {
  static navigationOptions = () => ({
    title: 'TheOne.io',
    header: null,
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
        <Progress.Circle size={30} indeterminate />
      </View>
    );
  }
}
