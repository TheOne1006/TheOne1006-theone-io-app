/**
 * @flow
 */
import React, { PropTypes, Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class CateView extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    // resultsRequest: PropTypes.func.isRequired,
    // loading: PropTypes.bool.isRequired,
    // loaded: PropTypes.bool.isRequired,
  };

  static navigationOptions = {
    title: 'Cate',
    header: navigation => ({
      left: (<Icon.Button
        onPress={() => navigation.navigate('DrawerOpen')}
        name="navigate-before"
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

  render() {
    return (
      <View>
        <Text> Cate </Text>
      </View>
    );
  }
}
