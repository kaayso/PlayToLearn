import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    ImageBackground,
    ScrollView,
    Image
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Colors from '../../constants/Colors';
import ScreenLabel from '../../utils/labels/screensLabel';
import Fonts from '../../utils/fonts/Fonts';
import avatarsManager from '../../utils/avatars/avatarsManager';
import Bg from '../../utils/background/backgroundimages';

class MenuDrawer extends Component {
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
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={{ width: '100%', height: 180 }}
                    source={Bg.PROFILEBG}
                >
                    <View style={styles.topLinks}>
                        <View style={styles.profile}>
                            <View style={styles.imgView}>
                                <Image
                                    style={styles.img}
                                    source={avatarsManager.getAvatar('User05b')}
                                />
                            </View>
                            {<Text style={styles.username}>
                                {this.props.navigation.getParam('name', 'J.Smith')}
                            </Text>}
                        </View>
                    </View>
                </ImageBackground>
                <ScrollView>
                    <View style={styles.bottomLinks}>
                        {this.navLink('Home', ScreenLabel.labels.HOME, 'md-home')}
                        {this.navLink('Profile', ScreenLabel.labels.PROFILE, 'md-finger-print')}
                        {this.navLink('Settings', ScreenLabel.labels.SETTINGS, 'md-settings')}
                        {this.navLink('Challenge', ScreenLabel.labels.CHALLENGE, 'md-flame')}
                        {this.navLink('Friends', ScreenLabel.labels.FRIENDS, 'md-contacts')}
                        {this.navLink('Achievements', ScreenLabel.labels.ACHIEVEMENTS, 'md-ribbon')}
                    </View>
                    <View>
                        <TouchableHighlight
                            underlayColor={Colors.redThemeColor}
                            style={{ height: 45 }}
                            onPress={() => console.log('disconnected')}
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
    },
    imgView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 50,
        paddingBottom: 10
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
        paddingBottom: 200
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    username: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 16,
        padding: 10,
        paddingTop: 25,
        fontFamily: Fonts.InknutAntiquaSemiBold
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
