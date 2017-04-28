/**
 * @flow
 */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  Image,
} from 'react-native';

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
    });

    this.setState({
      dataSource: dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
    });
  }

  props: {
    sections: Object,
  }

  renderRow = (rowData: Object): React.Element<any> => (
    <View style={styles.row}>
      <View style={styles.content}>
        <Text style={styles.rowTitle}>
          {`${rowData.title}` }
        </Text>
        <Text style={styles.rowDesc}>
          {`${rowData.descript}` }
        </Text>
      </View>
      <Image
        style={styles.thumbnail}
        source={{
          uri: `https:${rowData.thumbnail}`,
        }}
      />
    </View>
  );

  renderSectionHeader = (sectionData: string, sectionID: string) => {
    return (
      <View style={styles.section}>
        <Text style={styles.text}>
          {sectionData}
        </Text>
      </View>
    );
  };

  renderHeader = () => (<Banner />)

  render() {
    return (
      <ListView
        style={styles.listview}
        dataSource={this.state.dataSource}
        onChangeVisibleRows={(visibleRows, changedRows) => console.log({visibleRows, changedRows })}
        renderHeader={this.renderHeader}
        enableEmptySections
        renderSectionHeader={this.renderSectionHeader}
        renderRow={this.renderRow}
        initialListSize={10}
        pageSize={4}
        scrollRenderAheadDistance={500}
        stickySectionHeadersEnabled
      />
    );
  }
}

export default SectionList;