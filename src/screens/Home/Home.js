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

class Home extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }
  setModalVisible() {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }
  render() {
    console.log(this.state.modalVisible);

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
        <ScrollView>
          <View style={styles.container}>
            <ChoiceDifficultyModal
              modalVisibility={() => this.setModalVisible()}
              modalVisible={this.state.modalVisible}
            />
            <View style={styles.playButtonContainer}>
              <PlayButton modalVisibility={() => this.setModalVisible()} />
            </View>
            <View>
              <QuizList data={QuizItem} title="New games" logo={GameCat.NEW} />
              <QuizList data={QuizItem} title="Most played games" logo={GameCat.POPULAR} />
              <QuizList data={QuizItem} title="Recommended games" logo={GameCat.RECOMMENDED} />
            </View>
          </View>
        </ScrollView>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  playButtonContainer: {
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F2F2F2',
  },
  headerStyle: {
    backgroundColor: Colors.blueThemeColor,
    height: 56,
    paddingBottom: 15
  },
});

export default withNavigation(Home);
