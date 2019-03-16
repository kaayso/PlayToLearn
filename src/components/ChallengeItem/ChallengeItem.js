import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground
} from 'react-native';
import { upperFirst } from 'lodash';

import Fonts from '../../utils/fonts/Fonts';
import Bg from '../../utils/background/backgroundimages';
import resultLabel from '../../utils/labels/resultChallenge';

class ChallengeItem extends Component {
    render() {
        return (
            <ImageBackground
                style={{
                    width: '100%',
                    height: 80
                }}
                source={Bg.VSBG}
            >
                <View style={styles.container}>
                    <View style={styles.userInfoContainer}>
                        <Text style={styles.username}>
                            {upperFirst(this.props.resultChallenge.userName)}
                        </Text>
                        <Text style={styles.score}>{this.props.resultChallenge.scoreUser}</Text>
                    </View>
                    <View style={styles.userInfoContainer}>
                        <Text style={styles.username}>
                            {upperFirst(this.props.resultChallenge.userNameVersus)}
                        </Text>
                        <Text style={styles.score}>{this.props.resultChallenge.scoreVersus}</Text>
                    </View>
                    <View
                        style={[
                            styles.resultIndicator,
                            {
                                // eslint-disable-next-line no-nested-ternary
                                backgroundColor: `${this.props.resultChallenge.result === resultLabel.WON ?
                                    '#03A86F' :
                                    this.props.resultChallenge.result === resultLabel.LOST ?
                                        '#cc0634' :
                                        '#2895ba'}`
                            }
                        ]}
                    />
                </View>
            </ImageBackground>
        );
    }
}


export default ChallengeItem;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
        padding: 10,
    },
    userInfoContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: '43%',
        justifyContent: 'flex-end',
    },
    username: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: Fonts.OPENSANSREGULAR,
        color: '#fff'
    },
    score: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold'
    },
    resultIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
        position: 'absolute',
        right: 10,
        top: 10
    }
});
