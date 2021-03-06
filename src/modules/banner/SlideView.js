/**
 * @flow
 */

import React from 'react';
import {
  Image,
  View,
} from 'react-native';

const loading = require('./imgs/loading.gif');

type SideProps = {
  i: number,
  loadHandle: Function,
  styles: Object,
  uri: string,
  loaded: boolean
}

const Slide = ({ i, loadHandle, styles, uri, loaded }: SideProps) => (
  <View style={styles.slide}>
    <Image
      onLoad={() => loadHandle(i)}
      style={styles.image}
      source={{ uri }}
    />
    {
      !loaded && (<View style={styles.loadingView}>
        <Image style={styles.loadingImage} source={loading} />
      </View>)
    }
  </View>
);

export default Slide;
