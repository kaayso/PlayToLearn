
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableHighlight
} from 'react-native';
import Fonts from '../../utils/fonts/Fonts';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ChoiceDifficultyModal = props => (
    <Modal
        animationType="slide"
        transparent={false}
        visible={props.modalVisible}
    >
        <View
            style={styles.container}
        >
            <View style={styles.content}>
                <Text style={styles.title}>Choose a difficulty</Text>
                <TouchableHighlight
                    onPress={props.modalVisibility}
                    style={styles.textContainer}
                >
                    <Text style={styles.difficultyText}>Easy</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={props.modalVisibility}
                >
                    <Text style={styles.difficultyText}>Medium</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={props.modalVisibility}
                >
                    <Text style={styles.difficultyText}>Hard</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={props.modalVisibility}
                >
                    <Text style={styles.difficultyText}>Expert</Text>
                </TouchableHighlight>
                <Icon
                    style={{ margin: 10 }}
                    name='close' size={40}
                    onPress={props.modalVisibility}
                />
            </View>
        </View>
    </Modal>
);
export default ChoiceDifficultyModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100
    },
    content: {
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontFamily: Fonts.OPENSANSREGULAR
    },
    difficultyText: {
        fontSize: 15,
        fontFamily: Fonts.OPENSANSREGULAR,
        color: '#000',
        padding: 20,
        margin: 5,
    },
    textContainer: {
        backgroundColor: 'red',
    }
});

