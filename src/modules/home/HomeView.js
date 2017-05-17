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
import FixButton from './FixButton';
import styles from './themes/light';

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
  }

  render() {
    const { sections, loading, loaded, navigate, navigation } = this.props;
    if (!loading && loaded) {
      return (
        <View style={styles.root}>
          <SectionList
            sections={sections}
            navigate={navigate}
          />
          <FixButton navigation={navigation} />
        </View>
      );
    }

    return (
      <View>
        <Text> loading... </Text>
      </View>
    );
  }
}
