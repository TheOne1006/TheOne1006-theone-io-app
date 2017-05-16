/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SectionList from './SectionList';

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
      />),
      tintColor: 'white',
      style: {
        backgroundColor: '#39babd',
      },
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
  }

  render() {
    const { sections, loading, loaded, navigate } = this.props;
    if (!loading && loaded) {
      return (
        <SectionList
          sections={sections}
          navigate={navigate}
        />
      );
    }

    return (
      <View>
        <Text> loading... </Text>
      </View>
    );
  }
}
