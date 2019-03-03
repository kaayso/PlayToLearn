// Components/FriendItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import avatarsManager from '../../utils/avatars/avatarsManager';
import CircleButton from 'react-native-circle-button';


class FriendItem extends React.Component {
  render() {
    return (
      <View style={styles.main_container}>
        <TouchableOpacity>
            <View style={styles.box}>
              <Image
                style={styles.image}
                source={avatarsManager.getAvatar('User05b')}
              />
              <Text style={styles.username}>Username</Text>
              <CircleButton size={45} />
            </View>
          </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 130,
    flexDirection: 'row'
  },
  image: {
    margin: 5,
    backgroundColor: 'gray',
    height:65,
    width: 65,
    borderRadius: 64
  },
  box: {
    width : 500,
    padding:5,
    marginTop:5,
    marginBottom:5,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:1,
      width:-2
    },
    elevation:2
  },
  username:{
    color: "#20B2AA",
    fontSize:22,
    alignSelf:'center',
    marginLeft:10
  }
})

export default FriendItem
