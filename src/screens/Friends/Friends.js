import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Header } from 'react-native-elements';
import Colors from '../../constants/Colors';
import MenuButton from '../../components/MenuButton/MenuButton';
import NavBarButton from '../../components/NavBarButton/NavBarButton';
import ScreensLabel from '../../utils/labels/screensLabel';
import {
  getUserNotifications
} from '../../utils/game/gameutils';

class Friends extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      notificationsCount: null
    };
  }
  componentWillMount() {
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
          <Text> Friends screen </Text>
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
  },
  headerStyle: {
    backgroundColor: Colors.blueThemeColor,
    height: 56,
    paddingBottom: 15
  },
});

export default withNavigation(Friends);
