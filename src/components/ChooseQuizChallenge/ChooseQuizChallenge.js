import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Overlay, ListItem } from 'react-native-elements';

import ScreensLabel from '../../utils/labels/screensLabel';
import Fonts from '../../utils/fonts/Fonts';
import { getAllQuiz, getQuizById } from '../../utils/game/gameutils';

class ChooseQuizChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      quizs: null,
      test: this.props.ChooseQuizChallengeVisible,
    });
  }

  componentWillMount() {
    getAllQuiz().then((u) => {
      this.setState({
        quizs: u,
      });
    });
  }

  onPressItem = (item) => {
    // eslint-disable-next-line no-underscore-dangle
    const qid = item._id;
    getQuizById(qid).then((q) => {
      this.props.handleChoice();
      this.props.navigation.navigate(
        ScreensLabel.labels.GAME,
        { quiz: q, friendId: this.props.FRIEDN }
      );
    });
  }

  renderNativeItem = (item) => {
    if (this.props.ThemeChoosed === item.theme) {
      return (
        <ListItem
          title={item.level}
          leftAvatar={{ source: { uri: `http://10.0.2.2:8000/logo/${item.image}` } }}
          onPress={() => this.onPressItem(item)}
        />
      );
    }
  }

  render() {
    return (
      < Overlay
        isVisible={this.props.ChooseQuizChallengeVisible}
        onBackdropPress={this.props.ChooseQuizChallengeVisibility}
        windowBackgroundColor="rgba(0, 0, 0, .8)"
        width='100%'
        height='100%'
      >
        <View
          style={styles.container}
        >
          <View style={styles.content}>
            <View style={{ alignItems: 'flex-end', marginTop: 13 }}>
              <Icon
                name='close' size={30}
                onPress={this.props.ChooseQuizChallengeVisibility}
                color='gray'
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={styles.title}>
                Choose
                </Text>
              <Text style={[styles.title, { color: 'red' }]}>
                Quiz
                </Text>
            </View>
            <View>
              <FlatList
                data={this.state.quizs}
                renderItem={({ item }) => this.renderNativeItem(item)}
                // eslint-disable-next-line no-underscore-dangle
                keyExtractor={item => item._id}
              />
            </View>
          </View>
        </View>
      </Overlay >
    );
  }
}
export default withNavigation(ChooseQuizChallenge);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  alignItems: 'center',
  },
  content: {
  },
  title: {
    fontSize: 30,
    fontFamily: Fonts.OPENSANSLIGHT,
    padding: 5,
    fontWeight: 'bold',
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
