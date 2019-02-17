import React, { Component } from 'react';
import { View, Image, TouchableHighlight, StyleSheet } from 'react-native';
import AppLogo from '../../utils/logo/playbutton';

export default class PlayButton extends Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor='transparent'
        activeOpacity={0.4}
        onPress={this.props.modalVisibility}
      >
        <View style={{ padding: 20 }}>
          <Image source={AppLogo.PLAY} style={styles.logo} />
        </View>
      </TouchableHighlight>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    height: 200,
    width: 150,
  }
});
