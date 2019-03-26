
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    ScrollView,
    Alert,
    TouchableHighlight,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Overlay, List, ListItem } from 'react-native-elements';
import Fonts from '../../utils/fonts/Fonts';
import quiz from '../../assets/mocks/Quiz';
import { getAllQuiz } from '../../utils/game/gameutils';
import ChooseQuizChallenge from '../../components/ChooseQuizChallenge/ChooseQuizChallenge';


class ChooseTheme extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      ThemeChoosed: null,
      ChooseQuizChallengeVisible: false,
    });
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

  renderNativeItem = (item) => {
    return <ListItem
      title={item.name}
      leftAvatar={{ source: item.image }}
      onPress={() => this.onPressItem(item)}
    />;
  }

  onPressItem = (item) => {
    this.setState({ ThemeChoosed: item.name });
    this.setChooseQuizChallengeVisible();
  }

    render() {
        return (
          <ScrollView>
          < Overlay
              isVisible={this.props.ChooseThemeVisible}
              onBackdropPress={this.props.ChooseThemeVisibility}
              windowBackgroundColor="rgba(0, 0, 0, .8)"
              width= '100%'
              height= '100%'

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
                          <Text style={styles.title}>
                              Choose
                              <Text style={{color: 'red'}}>
                                 Theme
                              </Text>
                            </Text>
                            <View>
                              <FlatList
                                data={quiz}
                                renderItem={({item}) => this.renderNativeItem(item)}
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
        marginLeft: 70,
        fontSize: 30,
        fontFamily: Fonts.OPENSANSLIGHT,
        padding: 20,
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
