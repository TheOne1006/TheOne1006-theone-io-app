/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
} from 'react-native';

import ArticleListItem from '../../components/ArticleListItem/ArticleListItem';
import Banner from '../banner/BannerView';
import styles from './themes/light';

const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
const rowHasChanged = (row1, row2) => row1 !== row2;
const sectionHeaderHasChanged = (s1, s2) => s1 !== s2;

class SectionList extends Component {
  state = {
    dataSource: {},
    headerPressCount: 0,
    firstRowID: '',
    firstSectionID: '',
    firsetSectionBackGroundOpacity: 0,
    dataBlob: {},
    sectionIDs: [],
    rowIDs: [],
  };

  componentWillMount() {
    const { sections } = this.props;
    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged,
      sectionHeaderHasChanged,
    });

    const dataBlob = {};
    const sectionIDs = [];
    const rowIDs = [];
    const firstRowID = sections.getIn([0, 'articles', 0, '_id']);
    const firstSectionID = sections.getIn([0, 'title']);

    sections.map((section, index) => {
      const title = section.get('title');
      sectionIDs.push(title);
      dataBlob[title] = title;
      const articles = section.get('articles').toJS() || [];
      rowIDs[index] = articles.map((article) => {
        dataBlob[article._id] = article;
        return article._id;
      });
      return title;
    });

    this.setState({
      firstRowID,
      firstSectionID,
      dataSource: dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
    });
  }

  props: {
    sections: Object,
    navigate: Function,
  }

  firstSectionHeader: Object

  handleChageFirsetSectionBackgroundOnScroll = (offsetY: number) => {
    const { firsetSectionBackGroundOpacity } = this.state;
    let nextOpacity = firsetSectionBackGroundOpacity;

    if (offsetY <= 0) {
      nextOpacity = 0;
    } else if (offsetY >= 150) {
      nextOpacity = 1;
    } else {
      nextOpacity = offsetY / 150;
    }

    if (nextOpacity !== firsetSectionBackGroundOpacity) {
      /**
       * FIXME: 跨组件修改
       * @type {Array}
       */
      this.firstSectionHeader.setNativeProps({
        style: [
          styles.section,
          styles.sectionHeader,
          { backgroundColor: `rgba(57, 186, 189, ${nextOpacity})` },
        ],
      });

      this.setState({
        firsetSectionBackGroundOpacity: nextOpacity,
      });
    }
  }

  renderRow = (rowData: Object, sectionID: string, rowID: string): React.Element<any> => {
    const { firstSectionID, firstRowID } = this.state;

    if (sectionID === firstSectionID && firstRowID === rowID) {
      return (
        <View>
          <Banner />
          <ArticleListItem
            articleID={rowData._id}
            title={rowData.title}
            descript={rowData.descript}
            thumbnail={rowData.thumbnail}
            navigate={this.props.navigate}
          />
        </View>
      );
    }

    return (
      <ArticleListItem
        articleID={rowData._id}
        title={rowData.title}
        descript={rowData.descript}
        thumbnail={rowData.thumbnail}
        navigate={this.props.navigate}
      />
    );
  }

  renderSeparator = (sectionID: string, rowID: string) => (
    <View key={`${sectionID}-${rowID}-separator`} style={styles.separator} />
  );

  renderSectionHeader = (sectionData: string, sectionID: string) => {
    const { firstSectionID } = this.state;
    if (firstSectionID === sectionID) {
      return (
        <View
          ref={e => (this.firstSectionHeader = e)}
          style={[styles.section, styles.sectionHeader, { backgroundColor: 'rgba(57, 186, 189, 0)' }]}
        >
          <Text style={styles.text}>
            {sectionData}
          </Text>
        </View>
      );
    }
    return (
      <View style={[styles.section]}>
        <Text style={styles.text}>
          {sectionData}
        </Text>
      </View>
    );
  }
  // renderHeader = () => (<Banner />)

  render() {
    return (
      <ListView
        style={styles.listview}
        dataSource={this.state.dataSource}
        // renderHeader={this.renderHeader}
        enableEmptySections
        renderSectionHeader={this.renderSectionHeader}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        initialListSize={10}
        pageSize={4}
        scrollRenderAheadDistance={500}
        stickySectionHeadersEnabled
        bounces
        scrollEventThrottle={20}
        onScroll={(event: Object) => {
          const offsetY = event.nativeEvent.contentOffset.y;
          this.handleChageFirsetSectionBackgroundOnScroll(offsetY);
        }}
      />
    );
  }
}

export default SectionList;
