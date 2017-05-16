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
      dataSource: dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
    });
  }

  props: {
    sections: Object,
    navigate: Function,
  }

  renderRow = (rowData: Object): React.Element<any> => (
    <ArticleListItem
      articleID={rowData._id}
      title={rowData.title}
      descript={rowData.descript}
      thumbnail={rowData.thumbnail}
      navigate={this.props.navigate}
    />
  );

  renderSeparator = (sectionID: string, rowID: string) => (
    <View key={`${sectionID}-${rowID}-separator`} style={styles.separator} />
  );

  renderSectionHeader = (sectionData: string) => (
    <View style={styles.section}>
      <Text style={styles.text}>
        {sectionData}
      </Text>
    </View>
  );

  renderHeader = () => (<Banner />)

  render() {
    return (
      <ListView
        style={styles.listview}
        dataSource={this.state.dataSource}
        renderHeader={this.renderHeader}
        enableEmptySections
        renderSectionHeader={this.renderSectionHeader}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        initialListSize={10}
        pageSize={4}
        scrollRenderAheadDistance={500}
        stickySectionHeadersEnabled
      />
    );
  }
}

export default SectionList;
