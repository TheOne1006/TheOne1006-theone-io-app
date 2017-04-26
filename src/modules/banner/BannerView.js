import React, { Component } from 'react';
import { Text } from 'react-native';
import Swiper from 'react-native-swiper';

import styles from './themes/light';
import Slide from './SlideView';

const imgList = [
  'https://gitlab.pro/yuji/demo/uploads/d6133098b53fe1a5f3c5c00cf3c2d670/DVrj5Hz.jpg_1',
  'https://gitlab.pro/yuji/demo/uploads/2d5122a2504e5cbdf01f4fcf85f2594b/Mwb8VWH.jpg',
  'https://gitlab.pro/yuji/demo/uploads/4421f77012d43a0b4e7cfbe1144aac7c/XFVzKhq.jpg',
  'https://gitlab.pro/yuji/demo/uploads/576ef91941b0bda5761dde6914dae9f0/kD3eeHe.jpg',
];

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadQueue: [0, 0, 0, 0],
    };
  }

  loadHandle = (i) => {
    const { loadQueue } = this.state;
    loadQueue[i] = 1;
    this.setState({
      loadQueue,
    });
  }

  render() {
    return (
      <Swiper loadMinimal loadMinimalSize={1} height={240} style={styles.wrapper} >
        {
          imgList.map((item, i) => (
            <Slide
              loadHandle={this.loadHandle}
              loaded={!!this.state.loadQueue[i]}
              uri={item}
              i={i}
              key={item}
              styles={styles}
            />),
        )}
      </Swiper>
    );
  }
}

export default Banner;
