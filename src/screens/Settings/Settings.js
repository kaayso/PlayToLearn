import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Header } from 'react-native-elements';
import { Toast } from 'native-base';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ImageBackground,
  Image,
  AsyncStorage,
} from 'react-native';

import Colors from '../../constants/Colors';
import MenuButton from '../../components/MenuButton/MenuButton';
import NavBarButton from '../../components/NavBarButton/NavBarButton';
import Fonts from '../../utils/fonts/Fonts';
import Bg from '../../utils/background/backgroundimages';
import { getUserById, getUserNotifications, updateUser } from '../../utils/game/gameutils';
import AvatatPicker from '../../components/AvatatPicker/AvatarPicker';
import Screens from '../../utils/labels/screensLabel';
import Input from '../../components/TextInput/Input';
import AvatarsManager from '../../utils/avatars/avatarsManager';

class Settings extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      secureText: true,
      username: '',
      password: '',
      confirmPassword: '',
      pickerVisible: false,
      avatar: 'UserO1b',
      notificationsCount: null
    };
  }
  componentWillMount() {
    AsyncStorage.getItem('uid').then((id) => {
      getUserById(id).then((u) => {
        this.setState({
          user: u,
          avatar: u.picture,
          username: u.username
        });
      });
    });
    this.getNotifications();
    this.intervalId = setInterval(this.getNotifications.bind(this), 6000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  setPasswordVisibility() {
    this.setState({
      secureText: !this.state.secureText
    });
  }
  setPickerVisibility() {
    this.setState({
      pickerVisible: !this.state.pickerVisible
    });
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
  choiceHandler(avatarName) {
    this.setState({
      avatar: avatarName
    });
    this.setPickerVisibility();
  }
  checkInputs() {
    // Remove space from the string
    const username = this.state.username.replace(/\s/g, '');
    const pwd = this.state.password.replace(/\s/g, '');
    const confirmPwd = this.state.confirmPassword.replace(/\s/g, '');
    // eslint-disable-next-line no-underscore-dangle
    const uid = this.state.user._id;

    // Test length of each field
    if (username.length < 2 || pwd.length < 6 || confirmPwd.length < 6) {
      Toast.show({
        text: 'Username length > 1, password length > 5 !',
        duration: 3000,
        type: 'danger',
        position: 'bottom',
        textStyle: { textAlign: 'center', fontSize: 13, color: '#fff' }
      });
    } else if (pwd !== confirmPwd) {
      Toast.show({
        text: 'Password don\'t match !',
        duration: 3000,
        type: 'danger',
        position: 'bottom',
        textStyle: { textAlign: 'center', fontSize: 13, color: '#fff' }
      });
    } else {
      // Test matching between username and password
      updateUser(uid, username, pwd, this.state.avatar).then((res) => {
        // User was created
        Toast.show({
          text: 'You have successfully updated your account.',
          duration: 2000,
          type: 'success',
          position: 'top',
          textStyle: { textAlign: 'center', fontSize: 14, color: '#fff' }
        });
        // eslint-disable-next-line no-underscore-dangle
        this.props.navigation.navigate(Screens.labels.DASHBOARD, { uid: res.user._id });
      });
    }
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
              navigationTo={Screens.labels.DASHBOARD}
            />
          }
          rightComponent={
            <NavBarButton
              iconName='notifications'
              navigationTo={Screens.labels.NOTIFICATIONS}
              notificationsCount={this.state.notificationsCount}
            />
          }
        />
        <View style={styles.container}>
          <ImageBackground
            style={{ width: '100%', height: '100%' }}
            source={Bg.PROFILEBG}
          >
            <View style={styles.topLinks}>
              <View style={styles.profile}>
                <AvatatPicker
                  pickerVisible={this.state.pickerVisible}
                  setPickerVisibility={() => this.setPickerVisibility()}
                  choiceHandler={(avatar) => this.choiceHandler(avatar)}
                />
                <View style={styles.imgView}>
                  <TouchableHighlight
                    underlayColor='transparent'
                    activeOpacity={0.4}
                    onPress={() => this.setPickerVisibility()}
                  >
                    <Image
                      style={styles.img}
                      source={AvatarsManager.getAvatar(this.state.avatar)}
                    />
                  </TouchableHighlight>
                </View>
              </View>
            </View>
            <View style={styles.form}>
              <View style={styles.textInputContainer}>
                <Input
                  placeholder={this.state.user && this.state.user.username}
                  iconName="md-finger-print"
                  secureTextEntry={false}
                  onChangeText={(uname) => this.setState({ username: uname })}
                  containerBgColor='rgba(255, 255, 255, 0.3)'
                  inputStyle={{
                    color: '#fff',
                    fontSize: 13
                  }}
                />
              </View>
              <View style={styles.textInputContainer}>
                <Input
                  placeholder="Password"
                  iconName="md-lock"
                  secureTextEntry={this.state.secureText}
                  setPasswordVisibility={() => this.setPasswordVisibility()}
                  onChangeText={(pwd) => this.setState({ password: pwd })}
                  containerBgColor='rgba(255, 255, 255, 0.3)'
                  inputStyle={{
                    color: '#fff',
                    fontSize: 13
                  }}
                />
              </View>
              <View style={styles.textInputContainer}>
                <Input
                  placeholder="Confirm password"
                  iconName="md-lock"
                  secureTextEntry={this.state.secureText}
                  setPasswordVisibility={() => this.setPasswordVisibility()}
                  onChangeText={(pwd) => this.setState({ confirmPassword: pwd })}
                  containerBgColor='rgba(255, 255, 255, 0.3)'
                  inputStyle={{
                    color: '#fff',
                    fontSize: 13
                  }}
                />
              </View>
              <TouchableHighlight
                style={styles.signupBtn}
                underlayColor='transparent'
                activeOpacity={0.4}
                onPress={() => this.checkInputs()}
              >
                <Text style={{ color: '#fff' }}>Update</Text>
              </TouchableHighlight>
            </View>
          </ImageBackground>
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
    backgroundColor: 'rgba(15, 12, 143, 0.5)',
  },
  headerStyle: {
    backgroundColor: Colors.blueThemeColor,
    height: 56,
    paddingBottom: 15
  },
  textInputContainer: {
    paddingVertical: 5
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  signupBtn: {
    marginVertical: 5,
    width: 280,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1695c0'
  },
  img: {
    width: 110,
    height: 110,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  imgView: {
    padding: 10,
    paddingBottom: 5
  },
  iconContainer: {
    width: 25
  },
  link: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5
  },
  linkText: {
    flex: 1,
    fontSize: 14,
    color: 'gray',
    padding: 6,
  },
  disconnectText: {
    flex: 1,
    fontSize: 14,
    color: 'gray',
    padding: 6,
  },
  topLinks: {
    height: 180,
  },
  bottomLinks: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#fff',
    paddingBottom: 200
  },
  username: {
    color: '#fff',
    fontSize: 16,
    fontFamily: Fonts.OPENSANSSEMIBOLD
  },
  atUsername: {
    color: Colors.blueBoldThemeColors,
    fontSize: 11,
    fontFamily: Fonts.OPENSANSREGULAR
  },
  footer: {
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E4E4E4',
  },
  description: {
    flex: 1,
    textAlign: 'left',
    marginLeft: 10,
    color: 'gray'
  },
  version: {
    flex: 1,
    textAlign: 'right',
    marginRight: 10,
    color: 'gray'
  }
});

export default withNavigation(Settings);
