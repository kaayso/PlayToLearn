
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Overlay } from 'react-native-elements';
import Fonts from '../../utils/fonts/Fonts';
import Difficulty from '../../utils/game/difficultylabels';
import ChooseTheme from '../../components/ChooseTheme/ChooseTheme'
import avatarsManager from '../../utils/avatars/avatarsManager';
import { getUserById } from '../../utils/game/gameutils';


class ProfileFriend extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      FriendIDChallenge: null,
      ChooseThemeVisible: false,
      openQList: false,
    };
  }

  componentDidMount() {
      this.setState({
        FriendIDChallenge: this.props.FriendID
      });
  }

  setChooseThemeVisible() {
    this.setState({
      ChooseThemeVisible: !this.state.ChooseThemeVisible
    });
  }

  setListVisibilty() {
    this.setState({
      openQList: !this.state.openQList
    });
  }

  handleChoice() {
    this.setChooseThemeVisible();
    this.props.handleChoice();
  }

    render() {
        return (
            <Overlay
                isVisible={this.props.ProfileFriendVisible}
                onBackdropPress={this.props.ProfileFriendVisibility}
                windowBackgroundColor="rgba(0, 0, 0, .8)"

            >
                <View
                    style={styles.container}
                >
                        <View style={{ alignItems: 'flex-end', marginTop: 13 }}>
                            <Icon
                                name='close' size={30}
                                onPress={this.props.ProfileFriendVisibility}
                                color='gray'
                            />
                        </View>
                        <View style={styles.content}>
                            <Image
                                style={{ width: 145, height: 145, alignItems: 'flex-end', marginTop: 10 }}
                                source={avatarsManager.getAvatar(
                                    this.props.FriendPicture
                                )}
                            />

                          <View style={styles.title}>
                            <Text>{this.props.FriendUsename}</Text>
                            <Text>Score: {this.props.FriendScore}</Text>
                            <Text>Classment: {this.props.FriendRanking}</Text>
                          </View>

                          <ChooseTheme
                            ChooseThemeVisibility={() => this.setChooseThemeVisible()}
                            ChooseThemeVisible={this.state.ChooseThemeVisible}
                            FriendIDChallenge={this.state.FriendIDChallenge}
                            handleChoice={() => this.handleChoice()}
                            FRIEDN={this.props.FriendID}
                          />

                            <Button
                              onPress={() => this.setChooseThemeVisible()}
                              color="#88aac2"
                              title="Challenge"
                              accessibilityLabel="Learn more about this button"
                            />
                    </View>
                </View>
            </Overlay >
        );
    }
}
export default withNavigation(ProfileFriend);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
    },
    content: {
      alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontFamily: Fonts.OPENSANSSEMIBOLD,
        padding: 50,
        alignItems: 'center',
        color: '#fff',
        justifyContent: 'center',
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
