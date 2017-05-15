/**
 * @flow
 */
import React, { PropTypes, Component } from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './themes/light';

import MarkDownView from '../../components/MarkDownView/MarkDownView'

export default class ArticleView extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    resultsRequest: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired,
  };

  static defaultProps = {
    article: {
      _id: '589bde63440e31001b499de3',
      title: 'javaScript 表达式立即调用',
      thumbnail: '//api.theone.io/api/v2/thumbnails/thumbnails/download/js-quanwei.jpg',
    },
  }

  static navigationOptions = {
    title: 'Article',
    header: navigation => ({
      left: (<Icon.Button
        onPress={() => navigation.navigate('Main')}
        name="navigate-before"
        size={24}
        color="#fff"
        style={{ paddingLeft: 5 }}
        backgroundColor="transparent"
      />),
      tintColor: 'white',
      style: {
        backgroundColor: '#39babd',
      },
    }),
    tabBar: () => ({
      icon: props => (
        <Icon name="home" size={24} color={props.tintColor} />
      ),
    }),
  }

  componentWillMount() {
    const { resultsRequest } = this.props;
    // if (!loaded && !loading) {
    resultsRequest('589bde63440e31001b499de3');
    // }
  }

  render() {
    const { article } = this.props;

    return (
      <ScrollView>
        <View>
          <Image
            source={{ uri: `https:${article.get('thumbnail')}` }}
            style={styles.thumbnail}
          />
        </View>
        <View>
          <Text style={styles.descTitle}>
            {article.get('descript')}
          </Text>
        </View>
        <View>
          <MarkDownView content={article.get('content')} />
        </View>
      </ScrollView>
    );
  }
}
