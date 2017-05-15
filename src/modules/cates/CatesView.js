/**
 * @flow
 */
import React, { PropTypes, Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import CateList from './CateList';

export default class CateView extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    resultsRequest: PropTypes.func.isRequired,
    resultsReload: PropTypes.func.isRequired,
    resultsNextPage: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    articles: PropTypes.object.isRequired,
  };

  static navigationOptions = {
    title: 'Cate',
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
    const { resultsRequest, loaded, loading } = this.props;
    // if (!loaded && !loading) {
    resultsRequest('57d22b6dc9a8ff581714aa29');
    // }
  }

  refreshHandle = () => {
    const { resultsReload } = this.props;
    resultsReload('57d22b6dc9a8ff581714aa29');
  }

  loadMoreHandle = () => {
    const { resultsNextPage, loading, hasNextPage } = this.props;
    if (!loading && hasNextPage) {
      resultsNextPage('57d22b6dc9a8ff581714aa29');
    }
  }

  render() {
    const { articles,
      loading,
      loaded,
      hasNextPage,
      } = this.props;

    return (
      <View>
        <CateList
          articles={articles}
          loading={loading}
          loaded={loaded}
          refresh={this.refreshHandle}
          loadMore={this.loadMoreHandle}
          hasNextPage={hasNextPage}
        />
      </View>
    );
  }
}
