import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image,
    ImageBackground,
    AsyncStorage
} from 'react-native';
import { Toast } from 'native-base';
import { withNavigation } from 'react-navigation';
import Input from '../../components/TextInput/Input';
import AvatarsManager from '../../utils/avatars/avatarsManager';
import Bg from '../../utils/background/backgroundimages';
import BackButton from '../../components/BackButton/BackButton';
import AvatatPicker from '../../components/AvatatPicker/AvatarPicker';
import { addNewUser } from '../../utils/game/gameutils';
import Screens from '../../utils/labels/screensLabel';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secureText: true,
            username: '',
            password: '',
            confirmPassword: '',
            pickerVisible: false,
            avatar: 'UserO1b'
        };
    }
    setPasswordVisibility() {
        this.setState({
            secureText: !this.state.secureText
        });
    }
    setPickerVisibility() {
        this.setState({
            pickerVisible: !this.state.pickerVisible
        });
    }
    choiceHandler(avatarName) {
        this.setState({
            avatar: avatarName
        });
        this.setPickerVisibility();
    }
    checkInputs() {
        // Remove space from the string
        const username = this.state.username.replace(/\s/g, '');
        const pwd = this.state.password.replace(/\s/g, '');
        const confirmPwd = this.state.confirmPassword.replace(/\s/g, '');
        // Test length of each field
        if (username.length < 2 || pwd.length < 6 || confirmPwd.length < 6) {
            Toast.show({
                text: 'Username length > 1, password length > 5 !',
                duration: 3000,
                type: 'danger',
                position: 'bottom',
                textStyle: { textAlign: 'center', fontSize: 13, color: '#fff' }
            });
        } else if (pwd !== confirmPwd) {
            Toast.show({
                text: 'Password don\'t match !',
                duration: 3000,
                type: 'danger',
                position: 'bottom',
                textStyle: { textAlign: 'center', fontSize: 13, color: '#fff' }
            });
        } else {
            // Test matching between username and password
            addNewUser(username, pwd, this.state.avatar).then((res) => {
                if (res.status === 409) {
                    // Conflict
                    Toast.show({
                        text: 'This username is not available.',
                        duration: 3000,
                        type: 'danger',
                        position: 'bottom',
                        textStyle: { textAlign: 'center', fontSize: 14, color: '#fff' }
                    });
                } else if (res.status === 201) {
                    // User was created 
                    Toast.show({
                        text: 'You have successfully registered and logged in.',
                        duration: 2000,
                        type: 'success',
                        position: 'top',
                        textStyle: { textAlign: 'center', fontSize: 14, color: '#fff' }
                    });
                    // eslint-disable-next-line no-underscore-dangle
                    AsyncStorage.setItem('uid', res.user._id);
                    this.props.navigation.navigate(Screens.labels.DASHBOARD);
                } else {
                    // Some errors
                    Toast.show({
                        text: 'Error, no response from server.',
                        duration: 2000,
                        type: 'danger',
                        position: 'bottom',
                        textStyle: { textAlign: 'center', fontSize: 14, color: '#fff' }
                    });
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
                <View
                    style={styles.container}
                >
                    <BackButton color='#fff' />
                    <AvatatPicker
                        pickerVisible={this.state.pickerVisible}
                        setPickerVisibility={() => this.setPickerVisibility()}
                        choiceHandler={(avatar) => this.choiceHandler(avatar)}
                    />
                    <View style={styles.imgView}>
                        <TouchableHighlight
                            underlayColor='transparent'
                            activeOpacity={0.4}
                            onPress={() => this.setPickerVisibility()}
                        >
                            <Image
                                style={styles.img}
                                source={AvatarsManager.getAvatar(this.state.avatar)}
                            />
                        </TouchableHighlight>
                    </View>
                    <View style={styles.form}>
                        <View style={styles.textInputContainer}>
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
                        <View style={styles.textInputContainer}>
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
                        <View style={styles.textInputContainer}>
                            <Input
                                placeholder="Confirm password"
                                iconName="md-lock"
                                secureTextEntry={this.state.secureText}
                                setPasswordVisibility={() => this.setPasswordVisibility()}
                                onChangeText={(pwd) => this.setState({ confirmPassword: pwd })}
                                containerBgColor='rgba(255, 255, 255, 0.3)'
                                inputStyle={{
                                    color: '#fff',
                                    fontSize: 13
                                }}
                            />
                        </View>
                        <TouchableHighlight
                            style={styles.signupBtn}
                            underlayColor='transparent'
                            activeOpacity={0.4}
                            onPress={() => this.checkInputs()}
                        >
                            <Text style={{ color: '#fff' }}>Signup</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{ height: 100 }} />
                </View>
            </ImageBackground>
        );
    }
}
export default withNavigation(Registration);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(15, 12, 143, 0.5)',
    },
    textInputContainer: {
        paddingVertical: 5
    },
    form: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    signupBtn: {
        marginVertical: 5,
        width: 280,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C0164D'
    },
    imgView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: 110,
        height: 110,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: '#fff'
    },
});
