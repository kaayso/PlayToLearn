import React from 'react';
import {
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';

const BackButton = (props) => (
    <View style={styles.backBtn}>
        <TouchableHighlight
            underlayColor='transparent'
            activeOpacity={0.2}
            onPress={() => props.navigation.goBack()}
        >
            <Icon
                name="md-arrow-back"
                size={30}
                color={props.color}
            />
        </TouchableHighlight>
    </View>
);
export default withNavigation(BackButton);

const styles = StyleSheet.create({
    backBtn: {
        position: 'absolute',
        top: 5,
        left: 7,
        padding: 10,
    }
});
