import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Header } from 'react-native-elements';
import Colors from '../../constants/Colors';

class Home extends Component {
  static navigationOptions ={
    header: null
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          containerStyle={styles.headerStyle}
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ icon: 'dashboard', type: 'material', color: '#fff' }}
          rightComponent={{ icon: 'notifications', type: 'material', color: '#fff' }}
        />
        <View style={styles.container}>
          <Text> Home screen </Text>
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
  }
});

export default withNavigation(Home);
