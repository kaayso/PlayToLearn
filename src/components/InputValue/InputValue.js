import React, { Component } from 'react';
import { Text,Button, View, StyleSheet, TextInput, TouchableHighlight, ScrollView, Image } from 'react-native';



const InputValue = (props) => (


    <View>


    <TextInput
      style={props.style}
      placeholder={props.placeholder}
      onChangeText = {props.handleInput}
    />
    </View>
)
export default InputValue;
