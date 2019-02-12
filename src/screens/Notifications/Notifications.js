import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export class Notifications extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> notifications list... </Text>
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
    }
  });

export default withNavigation(Notifications);

