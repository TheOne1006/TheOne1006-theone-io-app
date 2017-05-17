import { StyleSheet } from 'react-native';
import { styleJson as defaultStyleJson } from './default';

export const styleJson = {
  ...defaultStyleJson,
  root: {
    ...defaultStyleJson.root,
    borderTopColor: 'dimgray',
  },
  section: {
    ...defaultStyleJson.section,
    backgroundColor: 'dimgray',
  },
};

const darkStyles = StyleSheet.create(styleJson);

export default darkStyles;
