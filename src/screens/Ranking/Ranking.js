import React, { Component } from 'react';
import { FlatList, View, StyleSheet, Text, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Header } from 'react-native-elements';

import {
  getTopScore,
  getTopScoreByEveryTheme,
  filterEmptyItems,
  getUserNotifications,
  addKeysToList
} from '../../utils/game/gameutils';
import Colors from '../../constants/Colors';
import Fonts from '../../utils/fonts/Fonts';
import MenuButton from '../../components/MenuButton/MenuButton';
import NavBarButton from '../../components/NavBarButton/NavBarButton';
import ScreensLabel from '../../utils/labels/screensLabel';
import TopScore from '../../components/TopScore/TopScore';
import TopScoreEveryTheme from '../../components/TopScoreEveryTheme/TopScoreEveryTheme';


class Ranking extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      users: null,
      rawList: null,
      scores: null
    };
  }
  //to get the top score List
  componentWillMount() {
    getTopScore().then((list) => {
      this.setState({
        rawList: list,
      });
    });
    //get the top score for every theme
    getTopScoreByEveryTheme().then((users) => {
      this.setState({
        scores: filterEmptyItems(users),
      });
    });
    this.getNotifications();
    this.intervalId = setInterval(this.getNotifications.bind(this), 6000);
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
              notificationsCount={this.state.notificationsCount}
            />
          }
        />
        <View style={styles.container}>
          <View style={styles.list}>
            <Text style={styles.title}> TOP SCORE</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() =>
                <View
                  style={{
                    width: 10,
                    backgroundColor: Colors.blueThemeColor
                  }}
                />}

              data={addKeysToList(this.state.rawList)}
              renderItem={({ item }) => <TopScore item={item} />}
            />
          </View>
          <View style={styles.list}>
            <Text style={styles.title}> TOP SCORE By Topic</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() =>
                <View
                  style={{
                    width: 10,
                    backgroundColor: Colors.blueThemeColor
                  }}
                />}
              data={addKeysToList(this.state.scores)}
              renderItem={({ item }) => <TopScoreEveryTheme item={item} />}
            />
          </View>
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
    backgroundColor: Colors.blueBoldThemeColors,
  },
  title: {
    fontSize: 14,
    color: '#F2F2F2',
    fontFamily: Fonts.OPENSANSREGULAR,
    backgroundColor: Colors.blueBoldThemeColors,

  },
  list: {
    height: 220,
    padding: 5,
    backgroundColor: Colors.blueBoldThemeColors,
  },

  headerStyle: {
    backgroundColor: Colors.blueThemeColor,
    height: 56,
    paddingBottom: 15
  }
});

export default withNavigation(Ranking);
