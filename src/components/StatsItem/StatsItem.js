import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const StatsItem = (props) => (
    <View style={styles.container}>
        <Image
            style={styles.img}
            source={{ uri: `http://10.0.2.2:8000/logo/${props.item.theme}` }}
        />
        <View style={styles.trophy}>
            <Icon
                name="md-trophy"
                size={20}
                color="#4d88ff"
            />
            <Text style={styles.text}>{props.item.numberOfTrophy}</Text>
        </View>
        <View style={styles.score}>
            <Icon
                name="md-star"
                size={20}
                color="#ff9933"
            />
            <Text style={styles.text}>{props.item.score}</Text>
        </View>
    </View>
);
export default StatsItem;

const styles = StyleSheet.create({
    container: {
        width: 125,
        height: 120,
        backgroundColor: '#003366',
        borderRadius: 5
    },
    img: {
        width: 80,
        height: 80,
        position: 'absolute',
        top: 10,
        left: 22
    },
    trophy: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        paddingLeft: 5,
        color: '#fff'
    },
    score: {
        position: 'absolute',
        bottom: 10,
        right: -70,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    }
});
