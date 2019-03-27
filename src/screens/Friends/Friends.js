import React, { Component } from 'react';
import { View, StyleSheet, Button, FlatList, TouchableHighlight, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Header, SearchBar } from 'react-native-elements';
import _values from 'lodash/values';

import Colors from '../../constants/Colors';
import MenuButton from '../../components/MenuButton/MenuButton';
import NavBarButton from '../../components/NavBarButton/NavBarButton';
import FriendItem from '../../components/FriendItem/FriendItem';
import SearchFriend from '../../components/SearchFriend/SearchFriend';
import ScreensLabel from '../../utils/labels/screensLabel';
import { getFriendListById, getUserNotifications } from '../../utils/game/gameutils';

class Friends extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      notificationsCount: null,
      user: null,
      AddFriendVisible: false,
      openQList: false,
      deletedRowKey: null,
      loading: false,
      refreshing: false,
      search: ''
    };
    this.arrayholder = [];
  }

  componentWillMount() {
    this.getNotifications();
    this.intervalId = setInterval(this.getNotifications.bind(this), 6000);
    this.setState({ loading: true });
    AsyncStorage.getItem('uid').then((id) => {
      getFriendListById(id).then((u) => {
        this.setState({
          // eslint-disable-next-line no-underscore-dangle
          user: u.filter((item) => item._id !== id),
          loading: false,
          refreshing: false,
        });
        // eslint-disable-next-line no-underscore-dangle
        this.arrayholder = u.filter((item) => item._id !== id);
      });
    });
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  getNotifications() {
    AsyncStorage.getItem('uid').then((id) => {
      getUserNotifications(id).then((notif) => {
        this.setState({
          notificationsCount: notif.length
        });
      });
    });
  }

  setAddFriendVisible() {
    this.setState({
      AddFriendVisible: !this.state.AddFriendVisible
    });
  }

  setListVisibilty() {
    this.setState({
      openQList: !this.state.openQList
    });
  }

  refreshFlatList = (deletedKey) => {
    this.setState(() => ({
      deletedRowKey: deletedKey
    }));
  }

  search = text => {
    console.log(text);
  };

  clear = () => {
    this.search.clear();
  };

  handleRefresh = () => {
    this.setState({
      refreshing: true,
    }, () => {
      this.componentDidMount();
    });
  };

  searchFilterFunction = text => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.username.toUpperCase()}
      ${item.username.toUpperCase()} ${item.username.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({ user: newData, search: text, });
  }

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
    if (this.state.user && this.state.user.length) {
      return (
        <View style={{ flex: 1 }}>
          <Header
            containerStyle={styles.headerStyle}
            leftComponent={<MenuButton />}
            centerComponent={
              <NavBarButton
                iconName='dashboard'
                navigationTo={ScreensLabel.labels.DASHBOARD}
              />
            }
            rightComponent={
              <NavBarButton
                iconName='notifications'
                navigationTo={ScreensLabel.labels.NOTIFICATIONS}
                notificationsCount={this.state.notificationsCount}
              />
            }
          />
          <View>
            <SearchFriend
              AddFriendVisibility={() => this.setAddFriendVisible()}
              AddFriendVisible={this.state.AddFriendVisible}
            />
            <TouchableHighlight
              style={{
                height: 40,
                width: 160,
                borderRadius: 10,
                marginLeft: 250,
                marginTop: 10,
                marginBottom: 10
              }}
            >
              <Button
                onPress={() => this.setAddFriendVisible()}
                color="#88aac2"
                title="Add new friend"
                accessibilityLabel="Learn more about this button"
              />
            </TouchableHighlight>


            <FlatList
              style={styles.list}
              data={_values(this.state.user)}
              // eslint-disable-next-line no-underscore-dangle
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) => (
                <FriendItem
                  item={item}
                  index={index}
                  parentFlatList={this}
                  Users={this.state.user}
                />
              )}
              ListHeaderComponent={this.renderHeader}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
            />
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <Header
          containerStyle={styles.headerStyle}
          leftComponent={<MenuButton />}
          centerComponent={
            <NavBarButton
              iconName='dashboard'
              navigationTo={ScreensLabel.labels.DASHBOARD}
            />
          }
          rightComponent={
            <NavBarButton
              iconName='notifications'
              navigationTo={ScreensLabel.labels.NOTIFICATIONS}
            />
          }
        />
        <View>
          <SearchFriend
            AddFriendVisibility={() => this.setAddFriendVisible()}
            AddFriendVisible={this.state.AddFriendVisible}
          />
          <TouchableHighlight
            style={{
              height: 40,
              width: 160,
              borderRadius: 10,
              marginLeft: 250,
              marginTop: 10,
              marginBottom: 10
            }}
          >
            <Button
              onPress={() => this.setAddFriendVisible()}
              color="#88aac2"
              title="Add new friend"
              accessibilityLabel="Learn more about this button"
            />
          </TouchableHighlight>

          <FlatList
            style={styles.list}
            ListHeaderComponent={this.renderHeader}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    marginTop: 2
  },
  btn: {
    marginLeft: 5,
    marginRight: 5,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  headerStyle: {
    backgroundColor: Colors.blueThemeColor,
    height: 56,
    paddingBottom: 15
  },
});

export default withNavigation(Friends);
