import { StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, { Component } from 'react';

export default class QuizItem extends Component {
    render() {
        return (
            <LinearGradient
                colors={
                    [
                        '#63004c',
                        '#3a012d',
                        '#23011b',
                    ]
                }
                style={styles.container}
            >
                <Image style={styles.logo} source={this.props.item.image} />
            </LinearGradient>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: 100,
    },
    logo: {
        height: 70,
        width: 70,
    }
});

