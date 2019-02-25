import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CloseButton = (props) => (
    <View style={styles.container}>
        <Icon
            name="keyboard-backspace"
            size={30}
            color="#fff"
            onPress={props.handleCloseAction}
        />
    </View>
);
export default CloseButton;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },
});
