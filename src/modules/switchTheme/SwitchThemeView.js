/**
 * @flow
 */

import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type SwitchThemeViewPropsType = {
  switchNextTheme: Function,
  theme: string,
}

function SwitchThemeView({ switchNextTheme, theme }: SwitchThemeViewPropsType) {
  const lightEle = (
    <Icon.Button
      onPress={() => switchNextTheme('night')}
      name="wb-sunny"
      size={24}
      color="#fff"
      underlayColor="transparent"
      style={{ paddingLeft: 5 }}
      backgroundColor="transparent"
      activeOpacity={0.7}
    >
      白天
    </Icon.Button>
  );

  const nightEle = (
    <Icon.Button
      onPress={() => switchNextTheme('light')}
      name="brightness-3"
      size={24}
      color="#fff"
      underlayColor="transparent"
      style={{ paddingLeft: 5 }}
      backgroundColor="transparent"
    >
      夜间
    </Icon.Button>
  );

  return (
    <View>
      {(theme === 'light') ? lightEle : nightEle}
    </View>
  );
}

export default SwitchThemeView;
