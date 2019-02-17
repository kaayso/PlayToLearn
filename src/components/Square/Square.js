import React from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native';
import Fonts from '../../utils/fonts/Fonts';

const Square = props => (
          <TouchableHighlight
            onPress={() => props.navigation.navigate(props.label, { name: 'J.Smith' })}
            activeOpacity={0.1}
            underlayColor='transparent'
            style={[styles.square, props.style]}
          >
            <View style={styles.labelContainer}>
              <Image
                style={{ width: 90, height: 90 }}
                source={props.img}
              />
              <Text
                style={styles.labelText}
              >
                { props.label }
              </Text>
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
    fontSize: 16,
    color: '#fff',
    fontWeight: 'normal',
    fontFamily: Fonts.OPENSANSSEMIBOLD,
    paddingTop: 5
  }
});

export default withNavigation(Square);
