/**
 * @flow
 */
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import lightStyles from './themes/light';
import darkStyles from './themes/dark';

type ArticleListItemProps = {
  theme?: ?string,
  title: string,
  articleID: string,
  descript: string,
  thumbnail: ?string,
  navigate: Function,
}

const ArticleListItem = ({
  theme,
  title,
  descript,
  thumbnail,
  articleID,
  navigate,
  }: ArticleListItemProps) => {
  const styles = theme === 'dark' ? darkStyles : lightStyles;
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => (navigate({ routeName: 'Article', params: { articleID, title } }))}
    >
      <View style={styles.content}>
        <Text style={styles.rowTitle}>
          {title}
        </Text>
        <Text style={styles.rowDesc}>
          {descript}
        </Text>
      </View>
      {
        thumbnail ? (
          <Image
            style={styles.thumbnail}
            source={{
              uri: `https:${thumbnail}`,
            }}
          />
        ) : null
      }

    </TouchableOpacity>
  );
};

ArticleListItem.defaultProps = {
  theme: 'light',
};

export default ArticleListItem;
