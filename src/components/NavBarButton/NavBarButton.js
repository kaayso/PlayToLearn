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
            name={props.iconName}
            size={28}
            color="#fff"
            onPress={() => props.navigation.navigate(props.navigationTo)
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
