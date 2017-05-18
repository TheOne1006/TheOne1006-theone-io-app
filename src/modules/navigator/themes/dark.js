import { StyleSheet } from 'react-native';
import { styleJson as defaultStyleJson } from './default';

export const styleJson = {
  ...defaultStyleJson,
  header: {
    ...defaultStyleJson.header,
    backgroundColor: 'dimgray',
  },
};

const darkStyles = StyleSheet.create(styleJson);

export default darkStyles;
