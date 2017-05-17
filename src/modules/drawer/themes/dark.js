import { StyleSheet } from 'react-native';
import { styleJson as defaultStyleJson } from './default';

export const styleJson = {
  ...defaultStyleJson,
  root: {
    ...defaultStyleJson.root,
    backgroundColor: 'darkslategrey', //(#2f4f4f)
  },
};

const darkStyles = StyleSheet.create(styleJson);

export default darkStyles;
