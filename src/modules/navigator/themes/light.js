import { StyleSheet } from 'react-native';
import { styleJson as defaultStyleJson } from './default';

export const styleJson = {
  ...defaultStyleJson,
};

const lightStyles = StyleSheet.create(styleJson);

export default lightStyles;
