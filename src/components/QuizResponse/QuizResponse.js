import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import React from 'react';
import Fonts from '../../utils/fonts/Fonts';

const ProgressBar = (props) => (
    <TouchableHighlight
        onPress={props.choosed}
        underlayColor='transparent'
    >
        <View
            style={[
                styles.response,
                {
                    backgroundColor: `${props.pressed ?
                        'rgba(255, 255, 255, 1)' :
                        'rgba(0, 0, 0, 0.4)'}`,
                }
            ]}
        >
            <Text
                style={[styles.responseText, {
                    color: `${props.pressed ?
                        '#000' :
                        '#fff'}`,
                }]}
            >
                {props.text}
            </Text>
            {
                props.modeCheckAnswers &&
                <View
                    style={[
                        styles.indicator,
                        { backgroundColor: `${props.correct ? 'green' : 'red'}` }
                    ]}
                />
            }
        </View>
    </TouchableHighlight>

);

export default ProgressBar;

const styles = StyleSheet.create({
    response: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: 190,
        margin: 5,
        padding: 10,
        height: 120,
    },
    responseText: {
        fontSize: 14,
        fontFamily: Fonts.OPENSANSSEMIBOLD,
        textAlign: 'center',
    },
    indicator: {
        width: 15,
        height: 15,
        borderRadius: 10,
        top: 10,
        right: 10,
        position: 'absolute'
    }
});
