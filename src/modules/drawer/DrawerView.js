/**
 * @flow
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';

import styles from './themes/light';

const defaultAvatar = require('./imgs/defaultAvatar.png');

class DrawerView extends Component {
  render() {
    return (
      <View style={styles.root}>
        <View style={styles.avatar}>
          <Image
            style={styles.avatarThumbnail}
            source={defaultAvatar}
          />
          <View style={styles.avatarContent} >
            <Text style={styles.avatarText}>
              TheOne.io
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default DrawerView;
