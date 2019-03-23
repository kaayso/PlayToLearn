import React from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native';
import Fonts from '../../utils/fonts/Fonts';

const Square = props => (
  <TouchableHighlight
    onPress={() =>
      props.pressed(props.screen)
    }
    activeOpacity={0.1}
    underlayColor='transparent'
    style={[styles.square, props.style]}
  >
    <View style={styles.labelContainer}>
      <Image
        style={{ width: 90, height: 90 }}
        source={props.img}
      />
      <View style={styles.labelTextContainer}>
        <Text
          style={styles.labelText}
        >
          {props.label}
        </Text>
      </View>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  square: {
    backgroundColor: '#3DBFF2',
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
    fontFamily: Fonts.OPENSANSREGULAR,
    paddingTop: 5
  },
  labelTextContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 3,
    height: 40,
    alignItems: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, 0.3)'
  }
});

export default withNavigation(Square);
