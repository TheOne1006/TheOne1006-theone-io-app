/**
 * @flow
 */

import React, { Component } from 'react';
import { List } from 'immutable';
import Swiper from 'react-native-swiper';

import styles from './themes/light';
import Slide from './SlideView';

const imgList = [
  'https://res.cloudinary.com/theone/image/upload/v1430750900/o0ohnh0hb1t8dlc7o0ln.jpg',
  'https://res.cloudinary.com/theone/image/upload/v1440311373/rxh0zcpxerpum2msj7hl.jpg',
  'https://res.cloudinary.com/theone/image/upload/v1430750829/rjpkswtvxxte4105ttrg.jpg',
];

class Banner extends Component {
  state = {
    loadQueue: List([]),
  }

  componentWillMount() {
    this.setState({
      loadQueue: List(new Array(imgList.length)),
    });
  }

  loadHandle = (i: number) => {
    const { loadQueue } = this.state;
    const newLoadQueue = loadQueue.set(i, 1);

    this.setState({
      loadQueue: newLoadQueue,
    });
  }

  render() {
    const { loadQueue } = this.state;
    return (
      <Swiper loadMinimal loadMinimalSize={1} height={240} style={styles.wrapper} >
        {
          imgList.map((item, i) => (
            <Slide
              loadHandle={this.loadHandle}
              loaded={!!loadQueue.get(i)}
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
