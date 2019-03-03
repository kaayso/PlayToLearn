import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

const IconButton = (props) => (
    <View style={styles.container}>
        <Icon
            name="menu"
            size={28}
            color="#fff"
            onPress={() => props.navigation.toggleDrawer()
            }
        />
    </View>
);
export default withNavigation(IconButton);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
