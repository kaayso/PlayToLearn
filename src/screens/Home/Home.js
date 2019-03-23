import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Header } from 'react-native-elements';

import Colors from '../../constants/Colors';
import MenuButton from '../../components/MenuButton/MenuButton';
import NavBarButton from '../../components/NavBarButton/NavBarButton';
import ScreensLabel from '../../utils/labels/screensLabel';
import PlayButton from '../../components/PlayButton/PlayButton';
import QuizList from '../../components/QuizList/QuizList';
import GameCat from '../../utils/logo/gamecategories';
import ChoiceDifficultyModal from '../../components/ChoiceDifficultyModal/ChoiceDifficultyModal';
import QuizListButton from '../../components/QuizListButton/QuizListButton';
import { getQuizByDifficulty, getUserNotifications } from '../../utils/game/gameutils';
import QuizListLabel from '../../utils/labels/quizList';

class Home extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      openQList: false,
      notificationsCount: null
    };
  }
  componentWillMount() {
    this.getNotifications();
    this.intervalId = setInterval(this.getNotifications.bind(this), 10000);
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
  setModalVisible() {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }
  setListVisibilty() {
    this.setState({
      openQList: !this.state.openQList
    });
  }
  handleChoice(difficulty) {
    AsyncStorage.getItem('uid').then((id) => {
      getQuizByDifficulty(id, difficulty).then((q) => {
        this.setModalVisible();
        this.props.navigation.navigate(ScreensLabel.labels.GAME, { quiz: q });
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
        <View
          style={styles.container}
        >
          <ChoiceDifficultyModal
            handleChoice={(difficulty) => this.handleChoice(difficulty)}
            modalVisibility={() => this.setModalVisible()}
            modalVisible={this.state.modalVisible}
          />
          <View
            style={[
              styles.playButtonContainer,
              { paddingTop: this.state.openQList ? 10 : 180 }
            ]}
          >
            <PlayButton modalVisibility={() => this.setModalVisible()} />
          </View>
          <View
            style={[
              styles.openQuizContainer,
              { alignItems: `${this.state.openQList ? 'flex-start' : 'center'}` }
            ]}
          >
            <QuizListButton
              isVisible={this.state.openQList}
              listVisibilty={() => this.setListVisibilty()}
            />
          </View>
          {
            this.state.openQList &&
            <ScrollView style={{ width: '100%' }}>
              <View>
                <QuizList title={QuizListLabel.NEW} logo={GameCat.NEW} />
                <QuizList title={QuizListLabel.MP} logo={GameCat.POPULAR} />
                <QuizList title={QuizListLabel.REC} logo={GameCat.RECOMMENDED} />
              </View>
            </ScrollView>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerStyle: {
    backgroundColor: Colors.blueThemeColor,
    height: 56,
    paddingBottom: 15
  },
  playButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  openQuizContainer: {
    width: '100%',
  }
});

export default withNavigation(Home);
