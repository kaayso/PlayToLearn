import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    ImageBackground,
    ScrollView,
    Image,
    AsyncStorage
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Colors from '../../constants/Colors';
import ScreenLabel from '../../utils/labels/screensLabel';
import Fonts from '../../utils/fonts/Fonts';
import avatarsManager from '../../utils/avatars/avatarsManager';
import Bg from '../../utils/background/backgroundimages';
import { getUserById } from '../../utils/game/gameutils';
import ConfirmationMsg from '../../components/ConfirmationMsg/ConfirmationMsg';

class MenuDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            showConfirmationMsg: false
        };
    }
    componentWillMount() {
        AsyncStorage.getItem('uid').then((id) => {
            getUserById(id).then((u) => {
                this.setState({
                    user: u
                });
            });
        });
    }
    navLink(text, nav, iconName) {
        return (
            <TouchableHighlight
                underlayColor={Colors.redThemeColor}
                style={{ height: 45 }}
                onPress={() => this.props.navigation.navigate(nav)}
            >
                <View style={styles.link}>
                    <View style={styles.iconContainer}>
                        <Icon
                            name={iconName}
                            size={22}
                            type='ionicon'
                            color='gray'
                        />
                    </View>
                    <Text style={styles.linkText}>{text}</Text>
                </View>
            </TouchableHighlight>
        );
    }
    closeConfirmationMsg() {
        this.setState({
            showConfirmationMsg: false
        });
    }
    confirmToGoLoginScreen() {
        this.setState({
            showConfirmationMsg: false
        });
        AsyncStorage.setItem('uid', '');
        this.props.navigation.navigate(ScreenLabel.labels.AUTNAVIGATOR);
    }
    handleVisibilityAction() {
        this.setState({
            showConfirmationMsg: true
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={{ width: '100%', height: 180 }}
                    source={Bg.PROFILEBG}
                >
                    <ConfirmationMsg
                        showMessage={this.state.showConfirmationMsg}
                        message="Are you sure you want to disconnect ?"
                        onClose={() => this.closeConfirmationMsg()}
                        onConfirm={() => this.confirmToGoLoginScreen()}
                    />
                    <View style={styles.topLinks}>
                        <View style={styles.profile}>
                            <View style={styles.imgView}>
                                <Image
                                    style={styles.img}
                                    source={avatarsManager.getAvatar(
                                        this.state.user && this.state.user.picture
                                    )}
                                />
                            </View>
                            <Text style={styles.username}>
                                {this.state.user && this.state.user.username}
                            </Text>
                            <Text style={styles.atUsername}>
                                {this.state.user && `@${this.state.user.username}`}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
                <ScrollView>
                    <View style={styles.bottomLinks}>
                        {this.navLink(
                            'Home',
                            ScreenLabel.labels.START,
                            'md-home')
                        }
                        {this.navLink(
                            'Profile',
                            ScreenLabel.labels.PROFILE,
                            'md-person')
                        }
                        {this.navLink(
                            'Ranking',
                            ScreenLabel.labels.RANKING,
                            'md-podium')
                        }
                        {this.navLink(
                            'Challenge',
                            ScreenLabel.labels.CHALLENGE,
                            'md-flame')
                        }
                        {this.navLink(
                            'Friends',
                            ScreenLabel.labels.FRIENDS,
                            'md-contacts')
                        }
                        {this.navLink(
                            'Achievements',
                            ScreenLabel.labels.ACHIEVEMENTS,
                            'md-ribbon')
                        }
                        {this.navLink(
                            'Account settings',
                            ScreenLabel.labels.SETTINGS,
                            'md-settings')
                        }
                        <TouchableHighlight
                            underlayColor={Colors.redThemeColor}
                            style={{ height: 45 }}
                            onPress={() =>
                                this.handleVisibilityAction()
                            }
                        >
                            <View style={styles.link}>
                                <View style={styles.iconContainer}>
                                    <Icon
                                        name={'md-log-out'}
                                        size={22}
                                        type='ionicon'
                                        color={Colors.redThemeColor}
                                    />
                                </View>
                                <Text style={styles.disconnectText}>Log out</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <Text style={styles.description}>Play to learn </Text>
                    <Text style={styles.version}>v1.0</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    profile: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20,
    },
    imgView: {
        padding: 10,
        paddingBottom: 5
    },
    iconContainer: {
        width: 25
    },
    link: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5
    },
    linkText: {
        flex: 1,
        fontSize: 14,
        color: 'gray',
        padding: 6,
    },
    disconnectText: {
        flex: 1,
        fontSize: 14,
        color: 'gray',
        padding: 6,
    },
    topLinks: {
        height: 180,
    },
    bottomLinks: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#fff',
        paddingBottom: 60,
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#000'
    },
    username: {
        color: '#fff',
        fontSize: 16,
        fontFamily: Fonts.OPENSANSSEMIBOLD
    },
    atUsername: {
        color: Colors.blueBoldThemeColors,
        fontSize: 11,
        fontFamily: Fonts.OPENSANSREGULAR
    },
    footer: {
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E4E4E4',
    },
    description: {
        flex: 1,
        textAlign: 'left',
        marginLeft: 10,
        color: 'gray'
    },
    version: {
        flex: 1,
        textAlign: 'right',
        marginRight: 10,
        color: 'gray'
    }
});

export default withNavigation(MenuDrawer);
