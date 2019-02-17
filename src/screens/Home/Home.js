import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Header } from 'react-native-elements';
import Colors from '../../constants/Colors';
import MenuButton from '../../components/MenuButton/MenuButton';
import NavBarButton from '../../components/NavBarButton/NavBarButton';
import ScreensLabel from '../../utils/labels/screensLabel';
import PlayButton from '../../components/PlayButton/PlayButton';
import QuizList from '../../components/QuizList/QuizList';
import QuizItem from '../../assets/mocks/Quiz';
import GameCat from '../../utils/logo/gamecategories';
import ChoiceDifficultyModal from '../../components/ChoiceDifficultyModal/ChoiceDifficultyModal';
import QuizListButton from '../../components/QuizListButton/QuizListButton';

class Home extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      openQList: false
    };
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
          style={styles.container}
        >
          <ChoiceDifficultyModal
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
            <ScrollView>
              <View>
                <QuizList data={QuizItem} title="New games" logo={GameCat.NEW} />
                <QuizList data={QuizItem} title="Most played games" logo={GameCat.POPULAR} />
                <QuizList data={QuizItem} title="Recommended games" logo={GameCat.RECOMMENDED} />
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
