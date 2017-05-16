/**
 * @flow
 */
import React, { PropTypes, Component } from 'react';
import {
  View,
  Image,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './themes/light';

import MarkDownView from '../../components/MarkDownView/MarkDownView';

export default class ArticleView extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    resultsRequest: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired,
    currentArticleID: PropTypes.string,
    loaded: PropTypes.bool.isRequired,
  };

  static navigationOptions = {
    title: ({ state }) => (state.params.title || 'Article'),
    header: navigation => ({
      left: (<Icon.Button
        onPress={() => navigation.goBack()}
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
    const { resultsRequest, currentArticleID, loaded, navigation: { state } } = this.props;
    const articleID = state.params.articleID;
    if (currentArticleID !== articleID || !loaded) {
      resultsRequest(articleID);
    }
  }

  render() {
    const { article, currentArticleID, navigation: { state } } = this.props;
    const articleID = state.params.articleID;

    return (
      <ScrollView>
        {
          (currentArticleID === articleID) ? (
            <View>
              <View>
                <Image
                  source={{ uri: `https:${article.get('thumbnail')}` }}
                  style={styles.thumbnail}
                />
              </View>
              <View>
                <MarkDownView content={article.get('content')} />
              </View>
            </View>
          ) : null
        }
      </ScrollView>
    );
  }
}
