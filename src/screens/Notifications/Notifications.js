import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { View, StyleSheet, FlatList, AsyncStorage } from 'react-native';
import { Toast } from 'native-base';

import Colors from '../../constants/Colors';
import NotificationCard from '../../components/NotificationCard/NotificationCard';
import {
  addKeysId,
  deleteNotification,
  getUserNotifications,
  addAFriend
} from '../../utils/game/gameutils';
import Screens from '../../utils/labels/screensLabel';

export class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: null
    };
  }
  componentWillMount() {
    this.getNotifications();
  }
  getNotifications() {
    AsyncStorage.getItem('uid').then((id) => {
      getUserNotifications(id).then((notif) => {
        this.setState({
          notifications: notif.message ? [] : notif
        });
      });
    });
  }
  acceptChallenge(q, n) {
    this.props.navigation.navigate(
      Screens.labels.GAME, { quiz: q, notification: n }
    );
  }
  removeNotification(id) {
    deleteNotification(id).then((res) => {
      if (res.message === 'Successfully deleted notification!') {
        Toast.show({
          text: 'Notification removed',
          duration: 3000,
          type: 'success',
          position: 'bottom',
          textStyle: { textAlign: 'center', fontSize: 13, color: '#fff' }
        });
      }
    });
    this.getNotifications();
  }
  addANewFriend(fid, nid) {
    AsyncStorage.getItem('uid').then((id) => {
      addAFriend(id, fid).then((res) => {
        if (res.message === 'friend added') {
          Toast.show({
            text: 'Friend added',
            duration: 3000,
            type: 'success',
            position: 'bottom',
            textStyle: { textAlign: 'center', fontSize: 13, color: '#fff' }
          });
        }
      });
    });
    this.removeNotification(nid);
  }
  render() {
    return (
      <View style={styles.container}>
        {
          this.state.notifications &&
          <FlatList
            showsVerticalScrollIndicator={false}
            data={addKeysId(this.state.notifications)}
            renderItem={({ item }) =>
              <NotificationCard
                item={item}
                onAcceptChallenge={(quiz, notif) => this.acceptChallenge(quiz, notif)}
                onDeleteItem={(id) => this.removeNotification(id)}
                onAcceptFriendReq={(fid, nid) => this.addANewFriend(fid, nid)}
              />
            }
          />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerStyle: {
    backgroundColor: Colors.blueThemeColor,
  },
});

export default withNavigation(Notifications);

