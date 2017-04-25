import React, { PropTypes, Component } from 'react';
import {
  Text,
  Button,
  View,
} from 'react-native';

export default class DemoView extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
  };
  render() {
    return (
      <View>
        <Text>List of all contacts</Text>
        <Button onPress={() => this.props.navigate({ routeName: 'DrawerOpen' })} title="DrawerOpen" />
      </View>
    );
  }
}
