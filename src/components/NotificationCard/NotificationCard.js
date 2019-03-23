import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
} from 'react-native';
import { upperFirst } from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';

import {
    getUserById,
    getQuizById,
    getDate
} from '../../utils/game/gameutils';
import AvatarsManager from '../../utils/avatars/avatarsManager';
import Colors from '../../constants/Colors';

class NotificationCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userNotify: null,
            quiz: null,
        };
    }
    componentWillMount() {
        const uid = this.props.item.user_id_who_notify;
        const qid = this.props.item.id_quiz;
        getUserById(uid).then((u) => {
            this.setState({
                userNotify: u
            });
        });
        getQuizById(qid).then((q) => {
            this.setState({
                quiz: q
            });
        });
    }
    render() {
        return (
            <View>
                {
                    this.state.quiz &&
                    this.props.item.subject === 'accepte_challenge' &&
                    this.state.userNotify &&
                    <View style={styles.cNotifications}>
                        <View style={styles.imgContainer}>
                            <Image
                                style={styles.img}
                                source={
                                    AvatarsManager.getAvatar(this.state.userNotify.picture)
                                }
                            />
                        </View>
                        <View style={styles.infos}>
                            <Text style={styles.infosText}>
                                Challenge received from
                                <Text
                                    style={[styles.infosText, { fontWeight: '900', color: '#000' }]}
                                >
                                    {` ${upperFirst(this.state.userNotify.username)}`}
                                </Text>
                            </Text>
                            <Text style={{ fontSize: 10 }}>{getDate(this.props.item.date)}</Text>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <TouchableHighlight
                                style={styles.controlButtons}
                                underlayColor='transparent'
                                onPress={() =>
                                    this.props.onAcceptChallenge(this.state.quiz, this.props.item)
                                }
                            >
                                <Icon name='md-checkmark' size={22} color='#000' />
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={styles.controlButtons}
                                underlayColor='transparent'
                                // eslint-disable-next-line no-underscore-dangle
                                onPress={() => this.props.onDeleteItem(this.props.item._id)}
                            >
                                <Icon name='md-close' size={22} color='#000' />
                            </TouchableHighlight>
                        </View>
                    </View>
                }
                {
                    this.state.quiz &&
                    this.props.item.subject === 'friend_Request' &&
                    this.state.userNotify &&
                    <View style={styles.cNotifications}>
                        <View style={styles.imgContainer}>
                            <Image
                                style={styles.img}
                                source={
                                    AvatarsManager.getAvatar(this.state.userNotify.picture)
                                }
                            />
                        </View>
                        <View style={styles.infos}>
                            <Text style={styles.infosText}>
                                Friend request received from
                                <Text
                                    style={[styles.infosText, { fontWeight: '900', color: '#000' }]}
                                >
                                    {` ${upperFirst(this.state.userNotify.username)}`}
                                </Text>
                            </Text>
                            <Text style={{ fontSize: 10 }}>{getDate(this.props.item.date)}</Text>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <TouchableHighlight
                                style={styles.controlButtons}
                                underlayColor='transparent'
                                onPress={() =>
                                    this.props.onAcceptFriendReq(
                                        // eslint-disable-next-line no-underscore-dangle
                                        this.state.userNotify._id, this.props.item._id
                                        )
                                }
                            >
                                <Icon name='md-checkmark' size={22} color='#000' />
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={styles.controlButtons}
                                underlayColor='transparent'
                                // eslint-disable-next-line no-underscore-dangle
                                onPress={() => this.props.onDeleteItem(this.props.item._id)}
                            >
                                <Icon name='md-close' size={22} color='#000' />
                            </TouchableHighlight>
                        </View>
                    </View>
                }
            </View>
        );
    }
}
export default NotificationCard;

const styles = StyleSheet.create({
    cNotifications: {
        width: '100%',
        height: 90,
        backgroundColor: '#fff',
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: '#E4E4E4'
    },
    infos: {
        width: '50%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    infosText: {
        color: '#111'
    },
    imgContainer: {
        borderRightWidth: 1,
        borderRightColor: '#E4E4E4',
        paddingRight: 5
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: Colors.redThemeColor
    },
    buttonsContainer: {
        width: '25%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    controlButtons: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
