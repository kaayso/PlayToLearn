
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Overlay } from 'react-native-elements';
import Fonts from '../../utils/fonts/Fonts';
import Difficulty from '../../utils/game/difficultylabels';


class ChoiceDifficultyModal extends Component {
    render() {
        return (
            < Overlay
                isVisible={this.props.modalVisible}
                onBackdropPress={this.props.modalVisibility}
                windowBackgroundColor="rgba(0, 0, 0, .8)"
            >
                <View
                    style={styles.container}
                >
                    <View style={styles.content}>
                        <View style={{ alignItems: 'flex-end', marginTop: 13 }}>
                            <Icon
                                name='close' size={30}
                                onPress={this.props.modalVisibility}
                                color='gray'
                            />
                            <Text style={styles.title}>Choose difficulty</Text>
                        </View>
                        <TouchableHighlight
                            onPress={() => this.props.handleChoice(Difficulty.EASY.toLowerCase())}
                            style={styles.textContainer}
                            underlayColor='#F2F2F2'
                        >
                            <Text style={styles.difficultyText}>{Difficulty.EASY}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => this.props.handleChoice(Difficulty.MEDIUM.toLowerCase())}
                            style={styles.textContainer}
                            underlayColor='#F2F2F2'
                        >
                            <Text style={styles.difficultyText}>{Difficulty.MEDIUM}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => this.props.handleChoice(Difficulty.HARD.toLowerCase())}
                            style={styles.textContainer}
                            underlayColor='#F2F2F2'
                        >
                            <Text style={styles.difficultyText}>{Difficulty.HARD}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => this.props.handleChoice(Difficulty.EXPERT.toLowerCase())}
                            style={styles.textContainer}
                            underlayColor='#F2F2F2'
                        >
                            <Text style={styles.difficultyText}>{Difficulty.EXPERT}</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Overlay >
        );
    }
}
export default withNavigation(ChoiceDifficultyModal);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    content: {
    },
    title: {
        fontSize: 22,
        fontFamily: Fonts.OPENSANSLIGHT,
        padding: 50,
    },
    difficultyText: {
        fontSize: 15,
        color: '#000',
        fontFamily: Fonts.OPENSANSREGULAR,
    },
    textContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#E4E4E4',
        alignItems: 'center',
        padding: 20,
    }
});

