import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Header } from 'react-native-elements';

import Colors from '../../constants/Colors';
import MenuButton from '../../components/MenuButton/MenuButton';
import NavBarButton from '../../components/NavBarButton/NavBarButton';
import ScreensLabel from '../../utils/labels/screensLabel';
import QuizListLabel from '../../utils/labels/quizList';
import GameCat from '../../utils/logo/gamecategories';
import QuizList from '../../components/QuizList/QuizList';
import {
  getChallengeHistory,
  filterHistoryChallengeList,
} from '../../utils/game/gameutils';
import Layout from '../../constants/Layout';
import Logo from '../../utils/logo/otherslogo';
import ChallengesHistory from '../../components/ChallengesHistory/ChallengesHistory';
import Fonts from '../../utils/fonts/Fonts';

class Challenge extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      challengeHistory: []
    };
  }
  componentDidMount() {
    const UID = this.props.navigation.getParam('uid', '');
    getChallengeHistory(UID).then((history) => {
      // test if no empty
      if (!history.message) {
        this.setState({
          challengeHistory: filterHistoryChallengeList(history),
        });
      }
    });
  }
  setModalVisible() {
    this.setState({
      modalVisible: !this.state.modalVisible
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
        <View style={styles.container}>
          <ChallengesHistory
            modalVisible={this.state.modalVisible}
            modalVisibility={() => this.setModalVisible()}
            items={this.state.challengeHistory}
          />
          <View style={styles.topContainer}>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate(ScreensLabel.labels.FRIENDS)}
              underlayColor='rgba(255, 255, 255, 0.1)'
            >
              <Image source={Logo.CHALLENGEFRIEND} style={{ height: 130, width: 130 }} />
            </TouchableHighlight>
          </View>
          <TouchableHighlight
            onPress={() => this.setModalVisible()}
            underlayColor='rgba(255, 255, 255, 0.1)'
          >
            <View style={styles.historyBtn}>
              <Icon name="history" size={35} color={Colors.redThemeColor} />
              <Text style={styles.historic}>Historic</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.bottomContainer}>
            <QuizList title={QuizListLabel.DAILYC} logo={GameCat.DAILY} />
            <QuizList title={QuizListLabel.WEEKLYC} logo={GameCat.WEEKLY} />
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
    justifyContent: 'flex-end'
  },
  topContainer: {
    position: 'absolute',
    right: (Layout.window.width / 2) - 65,
    top: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerStyle: {
    backgroundColor: Colors.blueThemeColor,
    height: 56,
    paddingBottom: 15
  },
  bottomContainer: {
    width: '100%'
  },
  historyBtn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 5
  },
  historic: {
    fontFamily: Fonts.OPENSANSSEMIBOLD,
    fontSize: 14,
  }
});

export default withNavigation(Challenge);
