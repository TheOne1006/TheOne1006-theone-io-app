/**
 * @flow
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SwitchTheme from '../switchTheme/SwitchThemeContainer';
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
        <ScrollView style={styles.scroll}>
          {
            (['js', 'php', 'mysql', 'mongodb']).map(item => (
              <TouchableOpacity activeOpacity={0.5} key={item}>
                <View style={styles.item}>
                  <Text style={styles.itemText}>
                    {item}
                  </Text>
                  <Icon
                    name="navigate-next"
                    size={24}
                    color="#fff"
                    style={styles.itemIcon}
                    backgroundColor="transparent"
                  />
                </View>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.footerItem} />
          <View style={styles.footerItem}>
            <SwitchTheme />
          </View>
        </View>
      </View>
    );
  }
}

export default DrawerView;
