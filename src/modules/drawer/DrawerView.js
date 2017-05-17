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
import lightStyles from './themes/light';
import darkStyles from './themes/dark';

const defaultAvatar = require('./imgs/defaultAvatar.png');

class DrawerView extends Component {
  props: {
    navigate: Function,
    cates: Object,
    currentTheme: string,
  }

  render() {
    const { cates, navigate, currentTheme } = this.props;
    const styles = (currentTheme === 'night') ? darkStyles : lightStyles;

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
            (cates).map(item => (
              <TouchableOpacity
                activeOpacity={0.5}
                key={item.title}
                onPress={() => (navigate({ routeName: 'Cate', params: { cateID: item._id, title: item.title } }))}
              >
                <View style={styles.item}>
                  <Text style={styles.itemText}>
                    {item.title}
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
