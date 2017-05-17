/**
 * @flow
 */

import React from 'react';
import {
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './themes/light';

type FixButtonPropsType = {
  navigation: Object,
}

const FixButton = ({ navigation }: FixButtonPropsType) => (
  <View style={styles.fixButton}>
    <Icon.Button
      onPress={() => navigation.navigate('DrawerOpen')}
      name="dehaze"
      size={24}
      color="#fff"
      style={{ paddingLeft: 5 }}
      backgroundColor="transparent"
      underlayColor="transparent"
    />
  </View>
);


export default FixButton;
