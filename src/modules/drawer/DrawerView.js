/**
 * @flow
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
              TheOne.io - 个人博客
            </Text>
          </View>
        </View>
        <ScrollView>
          <Text style={styles.avatarText}>
            TheOne.io - 个人博客
          </Text>
        </ScrollView>
        <View style={styles.footer}>
          <Icon.Button
            onPress={() => console.log('onPress')}
            name="wb-sunny"
            size={24}
            color="#fff"
            style={{ paddingLeft: 5 }}
            backgroundColor="transparent"
          >
            白天
          </Icon.Button>
          <Icon.Button
            onPress={() => console.log('onPress')}
            name="brightness-2"
            size={24}
            color="#fff"
            style={{ paddingLeft: 5 }}
            backgroundColor="transparent"
          >
            夜间
          </Icon.Button>
        </View>
      </View>
    );
  }
}

export default DrawerView;
