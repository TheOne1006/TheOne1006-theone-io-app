import { StyleSheet } from 'react-native';
import { styleJson as defaultStyleJson } from './default';

export const styleJson = {
  ...defaultStyleJson,
  listview: {
    ...defaultStyleJson.listview,
    backgroundColor: '#808080',
  },
};

const darkStyles = StyleSheet.create(styleJson);

export default darkStyles;
