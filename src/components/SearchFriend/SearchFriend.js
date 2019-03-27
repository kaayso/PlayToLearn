import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  AsyncStorage,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Overlay, SearchBar, ListItem } from 'react-native-elements';

import Fonts from '../../utils/fonts/Fonts';
import avatarsManager from '../../utils/avatars/avatarsManager';
import { getAllUsers, addAFriend } from '../../utils/game/gameutils';


class SearchFriend extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: false,
      search: '',
    };
    this.arrayholder = [];
  }

  componentWillMount() {
    this.setState({ loading: true });
    AsyncStorage.getItem('uid').then((id) => {
      getAllUsers().then((u) => {
        this.setState({
          // eslint-disable-next-line no-underscore-dangle
          user: u.filter((item) => item._id !== id),
          loading: false,
        });
        // eslint-disable-next-line no-underscore-dangle
        this.arrayholder = u.filter((item) => item._id !== id);
      });
    });
  }

  onPressItem = (item) => {
    AsyncStorage.getItem('uid').then((id) => {
      // eslint-disable-next-line no-underscore-dangle
      addAFriend(id, item._id);
      Alert.alert(`        request was sent to ${item.username}`);
    });
  }

  search = text => {
    console.log(text);
  };

  clear = () => {
    this.search.clear();
  };

  searchFilterFunction = text => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.username.toUpperCase()}
        ${item.username.toUpperCase()} ${item.username.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({ user: newData, search: text, });
  };

  renderNativeItem = (item) => (
    <ListItem
      // eslint-disable-next-line no-underscore-dangle
      key={item._id}
      subtitle={item.username}
      leftAvatar={{ source: avatarsManager.getAvatar(item.picture) }}
      onPress={() => this.onPressItem(item)}
    />
  )

  renderHeader = () => (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        onClear={() => this.searchFilterFunction('')}
        autoCorrect={false}
        value={this.state.search}
      />
    );

  render() {
    return (
      <View
        style={styles.container}
      >
        < Overlay
          isVisible={this.props.AddFriendVisible}
          onBackdropPress={this.props.AddFriendVisibility}
          windowBackgroundColor="rgba(0, 0, 0, .8)"
          width='100%'
          height='100%'
        >
          <View style={styles.content}>
            <View style={{ alignItems: 'flex-end', marginTop: 13 }}>
              <Icon
                name='close' size={30}
                onPress={this.props.AddFriendVisibility}
                color='gray'
              />
            </View>

            <View>

              <FlatList
                data={this.state.user}
                renderItem={({ item }) => this.renderNativeItem(item)}
                // eslint-disable-next-line no-underscore-dangle
                keyExtractor={item => item._id}
                ListHeaderComponent={this.renderHeader}
              />
            </View>
          </View>
        </Overlay >
      </View>
    );
  }
}
export default withNavigation(SearchFriend);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.OPENSANSLIGHT,
    padding: 50,
  },
  flatListItem: {
    color: 'black',
    padding: 10,
    marginTop: 25,
    fontFamily: Fonts.OPENSANSLIGHT,
    fontSize: 20,
  },
  difficultyText: {
    fontSize: 15,
    color: '#000',
    fontFamily: Fonts.OPENSANSREGULAR,
  },
  textContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
    alignItems: 'center',
    padding: 20,
  }
});
