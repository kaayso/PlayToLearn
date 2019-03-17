import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

const QuizNotFound = () => (
    <View style={styles.container}>
        <Image
            // eslint-disable-next-line global-require
            source={require('../../assets/images/not-found.png')}
            style={{ width: 100, height: 100 }}
        />
        <Text style={styles.errMessage}>Quiz not found...</Text>
    </View>
);
export default QuizNotFound;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    errMessage: {
        fontSize: 15,
        color: '#fff',
        textAlign: 'center'
    }
});
