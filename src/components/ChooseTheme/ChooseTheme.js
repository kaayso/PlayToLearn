import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Overlay, ListItem } from 'react-native-elements';

import Fonts from '../../utils/fonts/Fonts';
import quiz from '../../assets/mocks/Quiz';
import ChooseQuizChallenge from '../../components/ChooseQuizChallenge/ChooseQuizChallenge';


class ChooseTheme extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      ThemeChoosed: null,
      ChooseQuizChallengeVisible: false,
    });
  }

  onPressItem = (item) => {
    this.setState({ ThemeChoosed: item.name });
    this.setChooseQuizChallengeVisible();
  }

  setChooseQuizChallengeVisible() {
    this.setState({
      ChooseQuizChallengeVisible: !this.state.ChooseQuizChallengeVisible
    });
  }

  handleChoice() {
    this.setChooseQuizChallengeVisible();
    this.props.handleChoice();
  }

  renderNativeItem = (item) => (
    <ListItem
      title={item.name}
      leftAvatar={{ source: item.image }}
      onPress={() => this.onPressItem(item)}
    />
  )

  render() {
    return (
      <ScrollView>
        < Overlay
          isVisible={this.props.ChooseThemeVisible}
          onBackdropPress={this.props.ChooseThemeVisibility}
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
                  onPress={this.props.ChooseThemeVisibility}
                  color='gray'
                />
              </View>
              <ChooseQuizChallenge
                ChooseQuizChallengeVisibility={() => this.setChooseQuizChallengeVisible()}
                ChooseQuizChallengeVisible={this.state.ChooseQuizChallengeVisible}
                ThemeChoosed={this.state.ThemeChoosed}
                handleChoice={() => this.handleChoice()}
                FRIEDN={this.props.FRIEDN}
              />
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
                  Theme
                </Text>
              </View>
              <View>
                <FlatList
                  data={quiz}
                  renderItem={({ item }) => this.renderNativeItem(item)}
                  keyExtractor={item => item.key}
                />
              </View>
            </View>
          </View>
        </Overlay >
      </ScrollView>
    );
  }
}
export default withNavigation(ChooseTheme);

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
