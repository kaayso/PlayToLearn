import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import { upperFirst } from 'lodash';
import Logo from '../../utils/logo/otherslogo';
import Colors from '../../constants/Colors';

const TrophiesWon = (props) => (
  <View style={styles.trophyItem}>
    <Image source={Logo.TROPHIE} style={styles.img} />
    <View style={styles.nbTrophyContainer}>
      <Text style={styles.numberOfTrophy}>{props.item.number_achievements}</Text>
    </View>
    <View style={styles.bottomContainer}>
      <Image source={{ uri: `http://10.0.2.2:8000/logo/${props.item.theme}` }} style={styles.themeLogo} />
      <Text style={styles.themeName}>{upperFirst(props.item.theme)}</Text>
    </View>
  </View>
);
export default TrophiesWon;

const styles = StyleSheet.create({
  themeName: {
    color: '#fff',
    fontSize: 13
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blueLightThemeColors,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    padding: 3
  },
  nbTrophyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 15,
    top: 10,
    backgroundColor: Colors.redThemeColor,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  numberOfTrophy: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  },
  trophyItem: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#003366',
    borderRadius: 5,
    width: 123,
    height: 120
  },
  img: {
    height: 70,
    width: 60
  },
  themeLogo: {
    height: 25,
    width: 25,
    left: 2,
    position: 'absolute',
  }
});
