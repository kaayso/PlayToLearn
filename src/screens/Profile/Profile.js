import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import { Spinner } from 'native-base';
import { withNavigation } from 'react-navigation';
import { Header, SearchBar } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';
import { lowerCase } from 'lodash';

import Colors from '../../constants/Colors';
import MenuButton from '../../components/MenuButton/MenuButton';
import NavBarButton from '../../components/NavBarButton/NavBarButton';
import AvatarsManager from '../../utils/avatars/avatarsManager';
import Screen from '../../utils/labels/screensLabel';
import { getUserById } from '../../utils/game/gameutils';
import Fonts from '../../utils/fonts/Fonts';
import Layout from '../../constants/Layout';
import Bg from '../../utils/background/backgroundimages';
import StatsItem from '../../components/StatsItem/StatsItem';

class Profile extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      rawStats: [],
      displayedStatsList: [],
      search: ''
    };
  }
  componentDidMount() {
    const UID = this.props.navigation.getParam('uid', '');
    getUserById(UID).then((u) => {
      this.setState({
        user: u,
        displayedStatsList: u.scores.score_theme,
        rawStats: u.scores.score_theme,
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
      displayedStatsList: this.state.rawStats
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
              navigationTo={Screen.labels.DASHBOARD}
            />
          }
          rightComponent={
            <NavBarButton
              iconName='notifications'
              navigationTo={Screen.labels.NOTIFICATIONS}
            />
          }
        />
        {
          this.state.user ?
            <View
              style={styles.container}
            >
              <ImageBackground
                style={{ width: '100%', height: 175 }}
                source={Bg.PROFILEBG}
              >
                <View style={styles.identity}>
                  <Image
                    style={styles.img}
                    source={
                      AvatarsManager.getAvatar(this.state.user.picture)
                    }
                  />
                  <View>
                    <Text style={styles.username}>
                      {this.state.user.username}
                    </Text>
                  </View>
                </View>
                <View style={styles.scoreContainer}>
                  <Text style={styles.number}>
                    {this.state.user.scores.score_global}
                  </Text>
                  <Text style={styles.labelNumber}>
                    Score
                    </Text>
                </View>
                <View style={styles.rankingContainer}>
                  <Text style={styles.number}>
                    {this.state.user.ranking}
                  </Text>
                  <Text style={styles.labelNumber}>
                    Ranking
                    </Text>
                </View>
              </ImageBackground>
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
              <View style={styles.gridContainer}>
                <FlatGrid
                  style={{ flex: 1, width: '100%' }}
                  itemDimension={Math.floor(Layout.window.width * 0.3)}
                  items={this.state.displayedStatsList}
                  renderItem={({ item }) => (
                    <StatsItem item={item} />
                  )}
                />
              </View>
            </View> :
            <View style={[styles.container, { justifyContent: 'center' }]}>
              <Spinner
                color="red"
              />
            </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  gridContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headerStyle: {
    backgroundColor: Colors.blueThemeColor,
    height: 56,
    paddingBottom: 15
  },
  identity: {
    position: 'absolute',
    right: (Layout.window.width / 2) - 65,
    top: 105
  },
  searchBar: {
    backgroundColor: '#fff',
    borderTopWidth: 0,
    padding: 0
  },
  img: {
    width: 130,
    height: 130,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#fff'
  },
  searchContainer: {
    width: '100%',
    marginTop: 100,
  },
  username: {
    fontSize: 19,
    fontFamily: Fonts.OPENSANSREGULAR,
    textAlign: 'center',
    color: '#999'
  },
  scoreContainer: {
    position: 'absolute',
    right: 50,
    top: 110
  },
  rankingContainer: {
    position: 'absolute',
    left: 50,
    top: 110
  },
  number: {
    paddingBottom: 5,
    fontSize: 22,
    fontFamily: Fonts.OPENSANSSEMIBOLD,
    textAlign: 'center',
    color: '#fff'
  },
  labelNumber: {
    fontSize: 13,
    fontFamily: Fonts.OPENSANSREGULAR,
    textAlign: 'center',
    color: '#fff'
  }
});

export default withNavigation(Profile);
