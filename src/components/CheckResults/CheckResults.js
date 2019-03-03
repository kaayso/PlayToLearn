import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Overlay } from 'react-native-elements';
import * as Progress from 'react-native-progress';
import Layout from '../../constants/Layout';
import Fonts from '../../utils/fonts/Fonts';
import Colors from '../../constants/Colors';
import Logo from '../../utils/logo/otherslogo';
import Screens from '../../utils/labels/screensLabel';
import { getProgressCircleColor } from '../../utils/game/gameutils';

class CheckResults extends Component {
    render() {
        return (
            <Overlay
                isVisible={this.props.showResults}
                windowBackgroundColor="rgba(255, 255, 255, 1)"
                width={Layout.window.width}
                height={Layout.window.height}
            >
                <View style={styles.container}>
                    <Text style={styles.timeOut}> {this.props.timeOut ? 'Time out' : ''} </Text>
                    <View style={styles.topSection}>
                        <Progress.Circle
                            progress={this.props.result / 10}
                            size={200}
                            color={getProgressCircleColor(this.props.result)}
                        />
                        <Text
                            style={[
                                styles.textProg,
                                { color: `${getProgressCircleColor(this.props.result)}` }
                            ]}
                        >
                            {this.props.result * 10} %
                        </Text>
                        <View style={styles.infosContainer}>
                            <Image
                                source={this.props.result === 10 ?
                                    Logo.TROPHIE :
                                    Logo.TROPHIEDISABLE}
                                style={{ width: 70, height: 70 }}
                            />
                            <Text style={styles.textScore}>
                                Score : {this.props.result}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.navButtons}>
                        <TouchableHighlight
                            onPress={() => this.props.navigation.navigate(Screens.labels.START)}
                            style={styles.controlButtons}
                        >
                            <Text style={styles.textCB}>Home</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={this.props.checkAnswers}
                            underlayColor='transparent'
                            style={styles.controlButtons}
                        >
                            <Text style={styles.textCB}>Check Answers</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Overlay>
        );
    }
}
export default withNavigation(CheckResults);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    topSection: {
        marginTop: 30,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeOut: {
        fontFamily: Fonts.OPENSANSBOLD,
        marginTop: 20,
        fontSize: 22,
        color: Colors.redThemeColor
    },
    infosContainer: {
        width: '100%',
        marginTop: 30,
        padding: 10,
        justifyContent: 'center',
    },
    navButtons: {
        width: '110%',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: Colors.blueBoldThemeColors,
        height: 160,
    },
    controlButtons: {
        width: 130,
        height: 50,
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.redThemeColor
    },
    textProg: {
        position: 'absolute',
        top: 100,
        fontFamily: Fonts.OPENSANSREGULAR,
        fontSize: 24
    },
    textCB: {
        fontFamily: Fonts.OPENSANSREGULAR,
        color: '#fff'
    },
    textScore: {
        fontFamily: Fonts.OPENSANSREGULAR,
        marginTop: 10,
        fontSize: 17
    }
});
