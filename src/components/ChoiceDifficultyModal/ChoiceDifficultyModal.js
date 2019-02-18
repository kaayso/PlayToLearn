
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Overlay } from 'react-native-elements';
import Fonts from '../../utils/fonts/Fonts';

const ChoiceDifficultyModal = props => (
    < Overlay
        isVisible={props.modalVisible}
        onBackdropPress={props.modalVisibility}
        windowBackgroundColor="rgba(0, 0, 0, .8)"
    >
        <View
            style={styles.container}
        >
            <View style={styles.content}>
                <View style={{ alignItems: 'flex-end', marginTop: 13 }}>
                    <Icon
                        name='close' size={30}
                        onPress={props.modalVisibility}
                        color='gray'
                    />
                    <Text style={styles.title}>Choose difficulty</Text>
                </View>
                <TouchableHighlight
                    onPress={props.modalVisibility}
                    style={styles.textContainer}
                >
                    <Text style={styles.difficultyText}>Easy</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={props.modalVisibility}
                    style={styles.textContainer}
                >
                    <Text style={styles.difficultyText}>Medium</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={props.modalVisibility}
                    style={styles.textContainer}
                >
                    <Text style={styles.difficultyText}>Hard</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={props.modalVisibility}
                    style={styles.textContainer}
                >
                    <Text style={styles.difficultyText}>Expert</Text>
                </TouchableHighlight>
            </View>
        </View>
    </Overlay >
);
export default ChoiceDifficultyModal;

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

