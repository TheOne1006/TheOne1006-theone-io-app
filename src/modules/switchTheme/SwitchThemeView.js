/**
 * flow
 */
import React, { PropTypes } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function SwitchThemeView({ switchNextTheme, theme }) {
  const lightEle = (
    <Icon.Button
      onPress={() => switchNextTheme('night')}
      name="wb-sunny"
      size={24}
      color="#fff"
      style={{ paddingLeft: 5 }}
      backgroundColor="transparent"
    >
      白天
    </Icon.Button>
  );

  const nightEle = (
    <Icon.Button
      onPress={() => switchNextTheme('light')}
      name="brightness-2"
      size={24}
      color="#fff"
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

SwitchThemeView.propTypes = {
  switchNextTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

export default SwitchThemeView;
