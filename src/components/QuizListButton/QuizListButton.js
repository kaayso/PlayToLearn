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
            style={[
                styles.button,
                { flexDirection: `${props.isVisible ? 'row' : 'column'}` }
            ]}
        >
            <Icon
                name={props.isVisible ? 'expand-more' : 'expand-less'}
                size={28} style={styles.logo}
            />
            <Text style={styles.text}> {props.isVisible ? 'Hide games' : 'Show games'}</Text>
        </View>
    </TouchableHighlight>
);

export default QuizListButton;

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    text: {
        fontSize: 15,
    },
    logo: {
        backgroundColor: '#DF4723',
        borderRadius: 15,
        elevation: 5,
        color: '#fff'
    }
});
