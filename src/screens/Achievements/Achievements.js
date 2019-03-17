import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Header, SearchBar } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';
import { lowerCase } from 'lodash';

import Colors from '../../constants/Colors';
import MenuButton from '../../components/MenuButton/MenuButton';
import NavBarButton from '../../components/NavBarButton/NavBarButton';
import ScreensLabel from '../../utils/labels/screensLabel';
import { getAchievements } from '../../utils/game/gameutils';
import Layout from '../../constants/Layout';
import TrophiesWon from '../../components/TrophiesWon/TrophiesWon';

class Achievements extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      rawList: [],
      displayedList: [],
      search: '',
    };
  }
  componentWillMount() {
    AsyncStorage.getItem('uid').then((id) => {
      getAchievements(id).then((list) => {
        if (!list.message) {
          this.setState({
            rawList: list,
            displayedList: list
          });
        }
      });
    });
  }
  updateSearch = (search) => {
    this.setState({
      search,
    });
    this.filterListItem(search);
  }
  filterListItem(s) {
    const search = lowerCase(s);
    this.setState({
      displayedList: this.state.rawList
        .filter((item) => item.theme.indexOf(search) > -1)
    });
  }
  render() {
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
        <View
          style={[
            styles.container
          ]}
        >
          <View style={styles.searchContainer}>
            <SearchBar
              containerStyle={styles.searchBar}
              inputStyle={{ fontSize: 14 }}
              inputContainerStyle={{ backgroundColor: '#fff' }}
              lightTheme
              placeholder="Search"
              onChangeText={this.updateSearch}
              value={this.state.search}
            />
          </View>
          <FlatGrid
            style={{ flex: 1, width: '100%' }}
            itemDimension={Math.floor(Layout.window.width * 0.3)}
            items={this.state.displayedList}
            renderItem={({ item }) => (
              <TrophiesWon item={item} />
            )}
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
    justifyContent: 'center'
  },
  headerStyle: {
    backgroundColor: Colors.blueThemeColor,
    height: 56,
    paddingBottom: 15
  },
  searchContainer: {
    width: '100%',
  },
  searchBar: {
    backgroundColor: '#fff',
    borderTopWidth: 0,
    padding: 0
  },
});

export default withNavigation(Achievements);
