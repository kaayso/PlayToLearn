import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';

const IconButton = (props) => (
    <TouchableHighlight
        underlayColor='transparent'
        onPress={() =>
            props.navigation.navigate(props.navigationTo)
        }
    >
        <View style={styles.container}>
            <Icon
                name={props.iconName}
                size={28}
                color="#fff"
            />
            {
                props.iconName === 'notifications' &&
                props.notificationsCount &&
                props.notificationsCount > 0 &&
                <View style={styles.notificationCount}>
                    <Text style={{ color: '#fff', fontSize: 12 }}>
                        {props.notificationsCount > 99 ? '+99' : props.notificationsCount}
                    </Text>
                </View>
            }
        </View>
    </TouchableHighlight>
);
export default withNavigation(IconButton);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationCount: {
        position: 'absolute',
        top: -12,
        left: -8,
        height: 22,
        width: 22,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: Colors.redThemeColor,
    }
});
