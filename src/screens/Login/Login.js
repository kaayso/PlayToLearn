import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableHighlight,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Toast } from 'native-base';
import Bg from '../../utils/background/backgroundimages';
import Logo from '../../utils/logo/otherslogo';
import Fonts from '../../utils/fonts/Fonts';
import Input from '../../components/TextInput/Input';
import Screens from '../../utils/labels/screensLabel';
import { UserAuthentication } from '../../utils/game/gameutils';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secureText: true,
            username: '',
            password: ''
        };
    }
    setPasswordVisibility() {
        this.setState({
            secureText: !this.state.secureText
        });
    }
    checkInputs() {
        // Remove space from the string
        const username = this.state.username.replace(/\s/g, '');
        const pwd = this.state.password.replace(/\s/g, '');
        // Test if no empty
        if (!pwd || !username) {
            Toast.show({
                text: 'Fields can not be empty',
                duration: 3000,
                type: 'danger',
                position: 'bottom',
                textStyle: { textAlign: 'center', fontSize: 14, color: '#fff' }
            });
        } else {
            // Test matching between username and password
            UserAuthentication(username, pwd).then((u) => {
                if (!u) {
                    // Matching not found
                    Toast.show({
                        text: 'Your username and password don\'t match',
                        duration: 3000,
                        type: 'danger',
                        position: 'bottom',
                        textStyle: { textAlign: 'center', fontSize: 14, color: '#fff' }
                    });
                } else {
                    // Matching found
                    Toast.show({
                        text: `Connection successful, welcome ${u.username} !`,
                        duration: 1000,
                        type: 'success',
                        position: 'top',
                        textStyle: { textAlign: 'center', fontSize: 14, color: '#fff' }
                    });
                    // eslint-disable-next-line no-underscore-dangle
                    this.props.navigation.navigate(Screens.labels.DASHBOARD, { uid: u._id });
                }
            });
        }
    }
    render() {
        return (
            <ImageBackground
                style={{ width: '100%', height: '100%' }}
                source={Bg.LOGINBG}
            >
                <View style={styles.container}>
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Image
                            source={Logo.PTL}
                            style={styles.logo}
                        />
                        <Text style={styles.PTL}>Play To Learn</Text>
                    </View >
                    <View style={styles.bottomPart}>
                        <View style={{ marginBottom: 10 }}>
                            <Input
                                placeholder="Username"
                                iconName="md-finger-print"
                                secureTextEntry={false}
                                onChangeText={(uName) => this.setState({ username: uName })}
                                containerBgColor='rgba(255, 255, 255, 0.3)'
                                inputStyle={{
                                    color: '#fff',
                                    fontSize: 13
                                }}
                            />
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Input
                                placeholder="Password"
                                iconName="md-lock"
                                secureTextEntry={this.state.secureText}
                                setPasswordVisibility={() => this.setPasswordVisibility()}
                                onChangeText={(pwd) => this.setState({ password: pwd })}
                                containerBgColor='rgba(255, 255, 255, 0.3)'
                                inputStyle={{
                                    color: '#fff',
                                    fontSize: 13
                                }}
                            />
                        </View>
                        <TouchableHighlight
                            style={styles.loginBtn}
                            underlayColor='transparent'
                            activeOpacity={0.4}
                            onPress={() =>
                                this.checkInputs()
                            }
                        >
                            <Text style={{ color: '#fff' }}>Login</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.footer}>
                        <Text style={{ color: '#9F9F9F' }}>
                            Don’t have an account yet ?
                            </Text>
                        <TouchableHighlight
                            underlayColor='transparent'
                            activeOpacity={0.4}
                            onPress={() =>
                                this.props.navigation.navigate(Screens.labels.REGISTRATION)
                            }
                        >
                            <Text style={{ color: '#fff' }}> Singup</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}
export default withNavigation(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(15, 12, 143, 0.5)',
        flexDirection: 'column',
    },
    logo: {
        width: 154,
        height: 161
    },
    PTL: {
        fontSize: 19,
        color: '#fff',
        marginLeft: 2,
        fontFamily: Fonts.OPENSANSLIGHT
    },
    loginBtn: {
        width: 280,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C0164D'
    },
    bottomPart: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginVertical: 5,
    }
});
