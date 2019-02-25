import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';

const ProgressBar = (props) => (
    <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
        <Text style={styles.text}>
            {props.value * 10}%
        </Text>
        <Progress.Bar
            progress={props.value / 10}
            color='#33ccff'
            animationType='timing'
            borderRadius={2}
        />
    </View>
);

export default ProgressBar;

const styles = StyleSheet.create({
    text: {
        marginRight: 3,
        fontSize: 16,
        color: '#33ccff'
    }
});
