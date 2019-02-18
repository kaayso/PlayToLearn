import { StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, { Component } from 'react';

export default class QuizItem extends Component {
    render() {
        return (
            <LinearGradient
                colors={
                    [
                        '#E4E4E4',
                        '#F2F2F2',
                        '#fff',
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
        height: 80,
        width: 80,
    }
});

