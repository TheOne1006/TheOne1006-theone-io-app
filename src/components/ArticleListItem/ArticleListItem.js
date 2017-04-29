/**
 * @flow
 */
import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import lightStyles from './themes/light';
import darkStyles from './themes/dark';

type ArticleListItemProps = {
  theme?: ?string,
  title: string,
  descript: string,
  thumbnail: string,
}

const ArticleListItem = ({ theme, title, descript, thumbnail }: ArticleListItemProps) => {
  const styles = theme === 'dark' ? darkStyles : lightStyles;
  return (
    <View style={styles.row}>
      <View style={styles.content}>
        <Text style={styles.rowTitle}>
          {title}
        </Text>
        <Text style={styles.rowDesc}>
          {descript}
        </Text>
      </View>
      <Image
        style={styles.thumbnail}
        source={{
          uri: `https:${thumbnail}`,
        }}
      />
    </View>
  );
};

ArticleListItem.defaultProps = {
  theme: 'light',
};

export default ArticleListItem;
