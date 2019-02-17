import React from 'react';
import { Text, TouchableHighlight, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const QuizListButton = (props) => (
    <TouchableHighlight
        underlayColor='transparent'
        activeOpacity={0.9}
        onPress={(props.listVisibilty)}
    >
        <View
            style={styles.button}
        >
            <Icon name={props.isVisible ? 'expand-more' : 'expand-less'} size={30} />
            <Text> {props.isVisible ? 'Hide games' : 'Show games'}</Text>
        </View>
    </TouchableHighlight>
);

export default QuizListButton;

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    }
});
