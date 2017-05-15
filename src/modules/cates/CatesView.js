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
    navigation: PropTypes.object.isRequired,
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
    title: ({ state }) => (state.params.title || 'Cate'),
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
    const { resultsRequest, loaded, loading, navigation: { state } } = this.props;
    const cateID = state && state.params && state.params.cateID;
    if (cateID) {
      resultsRequest(cateID);
    }
  }

  refreshHandle = () => {
    const { resultsReload, navigation: { state } } = this.props;
    const cateID = state && state.params && state.params.cateID;
    if (cateID) {
      resultsReload(cateID);
    }
  }

  loadMoreHandle = () => {
    const { resultsNextPage, loading, hasNextPage, navigation: { state } } = this.props;
    const cateID = state && state.params && state.params.cateID;
    if (!loading && hasNextPage && cateID) {
      resultsNextPage(cateID);
    }
  }

  render() {
    const { articles,
      loading,
      loaded,
      hasNextPage,
      navigate,
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
          navigate={navigate}
        />
      </View>
    );
  }
}
