import { StyleSheet } from 'react-native';
import { styleJson as defaultStyleJson } from './default';

export const styleJson = {
  ...defaultStyleJson,
  root: {
    ...defaultStyleJson.root,
    backgroundColor: 'lightslategrey', //(#778899)
  },
};

const lightStyles = StyleSheet.create(styleJson);

export default lightStyles;
