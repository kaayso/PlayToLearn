import { StyleSheet, Image, TouchableHighlight } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import ScreensLabel from '../../utils/labels/screensLabel';

class QuizItem extends Component {
    startGame() {
        const UID = this.props.navigation.getParam('uid', null);
        this.props.navigation.navigate(
            ScreensLabel.labels.GAME,
            { quiz: this.props.item, uid: UID }
        );
    }
    render() {
        return (
            <TouchableHighlight
                onPress={() => this.startGame()}
                underlayColor='transparent'
            >
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
                    <Image
                        style={styles.logo}
                        source={{ uri: `http://10.0.2.2:8000/logo/${this.props.item.image}` }}
                    />
                </LinearGradient>
            </TouchableHighlight>
        );
    }
}
export default withNavigation(QuizItem);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: 100,
        height: 100
    },
    logo: {
        height: 80,
        width: 80,
    }
});

