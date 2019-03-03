import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import { Overlay } from 'react-native-elements';
import Colors from '../../constants/Colors';
import Fonts from '../../utils/fonts/Fonts';


const ConfirmationMsg = (props) => (
    <Overlay
        isVisible={props.showMessage}
        width={280}
        height={150}
        windowBackgroundColor="rgba(0, 0, 0, 0.8)"
    >
        <View style={styles.container}>
            <Text style={styles.message}>{props.message}</Text>
            <View style={styles.buttonsContainer}>
                <TouchableHighlight
                    onPress={props.onConfirm}
                    style={styles.controlButtons}
                >
                    <Text style={styles.textButton}>Yes</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={props.onClose}
                    style={styles.controlButtons}
                >
                    <Text style={styles.textButton}>Cancel</Text>
                </TouchableHighlight>
            </View>
        </View>
    </Overlay>
);
export default ConfirmationMsg;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    buttonsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 10
    },
    textButton: {
        color: '#fff'
    },
    controlButtons: {
        width: 80,
        height: 30,
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.redThemeColor
    },
    message: {
        marginTop: 25,
        fontSize: 14,
        textAlign: 'center',
        fontFamily: Fonts.OPENSANSREGULAR
    }
});
