import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Overlay } from 'react-native-elements';

import ChallengeItem from '../ChallengeItem/ChallengeItem';
import { addKeysToList } from '../../utils/game/gameutils';

class ChallengesHistory extends Component {
    render() {
        return (
            < Overlay
                isVisible={this.props.modalVisible}
                onBackdropPress={this.props.modalVisibility}
                windowBackgroundColor="rgba(0, 0, 0, .8)"
            >
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <Icon
                            name='close' size={30}
                            onPress={this.props.modalVisibility}
                            color='gray'
                        />
                    </View>
                    <View style={styles.caption}>
                        <View style={[styles.flag, { backgroundColor: '#03A86F' }]} />
                        <Text>Won</Text>
                        <View style={[styles.flag, { backgroundColor: '#cc0634' }]} />
                        <Text>Lost</Text>
                        <View style={[styles.flag, { backgroundColor: '#2895ba' }]} />
                        <Text>Draw</Text>
                    </View>
                    <FlatList
                        style={{ width: '100%' }}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() =>
                            <View
                                style={{
                                    height: 5,
                                    backgroundColor: '#fff'
                                }}
                            />}
                        data={addKeysToList(this.props.items)}
                        renderItem={({ item }) =>
                            <ChallengeItem resultChallenge={item} />
                        }
                    />
                </View>
            </ Overlay>
        );
    }
}
export default ChallengesHistory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    topContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: '100%',
        paddingBottom: 5,
    },
    caption: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width: '100%',
        marginBottom: 5,
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#E4E4E4'
    },
    flag: {
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 5
    }
});
