import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ImageBackground,
    ScrollView,
    Image,
    TouchableHighlight,
    BackHandler,
    AsyncStorage
} from 'react-native';
import { Spinner } from 'native-base';
import { withNavigation } from 'react-navigation';
import { Header } from 'react-native-elements';

import CloseButton from '../../components/CloseButton/CloseButton';
import Timer from '../../components/Timer/Timer';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Bg from '../../utils/background/backgroundimages';
import Fonts from '../../utils/fonts/Fonts';
import QuizResponse from '../../components/QuizResponse/QuizResponse';
import {
    initAnswersList,
    computeResult,
    getUserById,
    pushUserScore,
    sendScoreChallenge,
    deleteNotification,
    launchAChallengeFriend
} from '../../utils/game/gameutils';
import CheckResults from '../../components/CheckResults/CheckResults';
import ConfirmationMsg from '../../components/ConfirmationMsg/ConfirmationMsg';
import QuizNotFound from '../../components/QuizNotFound/QuizNotFound';
import Screens from '../../utils/labels/screensLabel';

const GAME_TIME = 150; // 150 seconds

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remainingTime: GAME_TIME,
            currentQuestion: 0,
            resposesChoosed: initAnswersList(),
            showResults: false,
            timeOut: false,
            modeCheckAnswers: false,
            quizResult: 0,
            showConfirmationMsg: false,
            quizPicked: null,
            user: null,
            isLoading: true
        };
    }
    componentWillMount() {
        this.intervalId = setInterval(this.timer.bind(this), 1000);
        AsyncStorage.getItem('uid').then((id) => {
            getUserById(id).then((u) => {
                this.setState({
                    quizPicked: this.props.navigation.getParam('quiz', null),
                    user: u,
                    isLoading: false
                });
            });
        });
        // Disable hardware back button
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    }
    componentWillUnmount() {
        clearInterval(this.intervalId);
        this.backHandler.remove();
    }
    timer() {
        this.setState({
            remainingTime: this.state.remainingTime - 1
        });
        if (this.state.remainingTime < 1) {
            // End of the game
            clearInterval(this.intervalId);
            this.setState({
                showResults: true,
                timeOut: true
            });
        }
    }
    handleResponse(number) {
        const responsesToCurrentQ = this.state.resposesChoosed[this.state.currentQuestion];
        if (!responsesToCurrentQ.includes(number)) {
            responsesToCurrentQ.push(number);
            this.state.resposesChoosed[this.state.currentQuestion] = responsesToCurrentQ;
            // Force reload the render method of the component
            this.setState({
                resposesChoosed: this.state.resposesChoosed
            });
        } else {
            responsesToCurrentQ.splice(responsesToCurrentQ.indexOf(number), 1);
            this.state.resposesChoosed[this.state.currentQuestion] = responsesToCurrentQ;
            this.setState({
                resposesChoosed: this.state.resposesChoosed
            });
        }
        return;
    }
    nextQuestion() {
        if (this.state.currentQuestion < 9) {
            this.setState({
                currentQuestion: this.state.currentQuestion + 1,
            });
        } else {
            // move to results vue
            // clear interval timer
            // send score
            const score = computeResult(this.state.quizPicked.answers, this.state.resposesChoosed);
            clearInterval(this.intervalId);
            this.setState({
                showResults: true,
                quizResult: !this.state.modeCheckAnswers ?
                    score :
                    this.state.quizResult
            });
            this.pushScore(score);
        }
        return;
    }
    pushScore(score) {
        pushUserScore(
            // eslint-disable-next-line no-underscore-dangle
            this.state.user._id,
            // eslint-disable-next-line no-underscore-dangle
            this.state.quizPicked._id,
            score,
            this.state.quizPicked.theme
        );
        // if this is a challenge push score on /accepteAChallenge
        const notification = this.props.navigation.getParam('notification', null);
        if (notification) {
            // eslint-disable-next-line no-underscore-dangle
            deleteNotification(notification._id);
            // eslint-disable-next-line no-underscore-dangle
            sendScoreChallenge(notification.p_jObject._id, score);
        }

        const challengeFriend = this.props.navigation.getParam('friendId', null);
        if (challengeFriend) {
          AsyncStorage.getItem('uid').then((id) => {
              // eslint-disable-next-line no-underscore-dangle
              launchAChallengeFriend(id, challengeFriend, this.state.quizPicked._id, score);
          });
        }
    }
    previousQuestion() {
        if (this.state.currentQuestion > 0) {
            this.setState({
                currentQuestion: this.state.currentQuestion - 1,
            });
        }
        return;
    }
    checkAnswersMode() {
        this.setState({
            modeCheckAnswers: true,
            showResults: false,
            currentQuestion: 0
        });
    }
    handleCloseAction() {
        this.setState({
            showConfirmationMsg: true
        });
    }
    closeConfirmationMsg() {
        this.setState({
            showConfirmationMsg: false
        });
    }
    confirmToGoHome() {
        this.setState({
            showConfirmationMsg: false
        });
        // push 0 as score for the current quiz
        if (this.state.quizPicked) {
            this.pushScore(0);
        }
        this.props.navigation.navigate(Screens.labels.START);
    }
    // Questions 200 caracteres
    // Reponse 90 caracteres
    render() {
        return (
            <ImageBackground
                style={{ width: '100%', height: '100%' }}
                source={Bg.GAMEBG}
            >
                <View style={{ flex: 1 }}>
                    <Header
                        containerStyle={styles.headerStyle}
                        leftComponent={
                            <CloseButton handleCloseAction={() => this.handleCloseAction()} />
                        }
                        rightComponent={
                            <Image
                                style={{ width: 40, height: 40 }}
                                source={{ uri: `http://10.0.2.2:8000/logo/${this.state.quizPicked && this.state.quizPicked.image}` }}
                            />
                        }
                    />
                    <CheckResults
                        showResults={this.state.showResults}
                        result={this.state.quizResult}
                        timeOut={this.state.timeOut}
                        checkAnswers={() => this.checkAnswersMode()}
                    />
                    <ConfirmationMsg
                        showMessage={this.state.showConfirmationMsg}
                        message="Are you sure you want to abort this game ?"
                        onClose={() => this.closeConfirmationMsg()}
                        onConfirm={() => this.confirmToGoHome()}
                    />
                    <View
                        style={[
                            styles.container,
                            { justifyContent: `${this.state.quizPicked ? 'flex-start' : 'center'}` }
                        ]}
                    >
                        {
                            // eslint-disable-next-line no-nested-ternary
                            (this.state.quizPicked && !this.state.isLoading) ?
                                <ScrollView>
                                    <View
                                        style={[
                                            styles.progressCircle,
                                            { marginTop: this.state.modeCheckAnswers ? 65 : 0 }
                                        ]}
                                    >
                                        {
                                            !this.state.modeCheckAnswers &&
                                            <Timer
                                                remainingTime={this.state.remainingTime}
                                                time={GAME_TIME}
                                            />
                                        }
                                    </View>
                                    <View style={styles.question}>
                                        <Text style={styles.questionText}>
                                            {
                                                this.state.quizPicked
                                                    .questionsResponse[this.state.currentQuestion]
                                                    .question
                                            }
                                        </Text>
                                    </View>
                                    <ProgressBar value={this.state.currentQuestion + 1} />
                                    <View style={styles.responsesContainer}>
                                        <View style={styles.responsesLeft}>
                                            <QuizResponse
                                                text={
                                                    this.state.quizPicked
                                                    .questionsResponse[this.state.currentQuestion]
                                                        .response1
                                                }
                                                choosed={() => this.handleResponse(0)}
                                                pressed={
                                                    this.state
                                                        .resposesChoosed[this.state.currentQuestion]
                                                        .includes(0)
                                                }
                                                modeCheckAnswers={this.state.modeCheckAnswers}
                                                correct={
                                                    this
                                                        .state.quizPicked
                                                        .answers[this.state.currentQuestion]
                                                        .includes(0)
                                                }
                                            />
                                            <QuizResponse
                                                text={
                                                    this.state.quizPicked
                                                    .questionsResponse[this.state.currentQuestion]
                                                        .response3
                                                }
                                                choosed={() => this.handleResponse(2)}
                                                pressed={
                                                    this.state
                                                        .resposesChoosed[this.state.currentQuestion]
                                                        .includes(2)
                                                }
                                                modeCheckAnswers={this.state.modeCheckAnswers}
                                                correct={
                                                    this.state.quizPicked
                                                        .answers[this.state.currentQuestion]
                                                        .includes(2)
                                                }
                                            />
                                        </View>
                                        <View style={styles.responsesRight}>
                                            <QuizResponse
                                                text={
                                                    this.state.quizPicked
                                                    .questionsResponse[this.state.currentQuestion]
                                                        .response2
                                                }
                                                choosed={() => this.handleResponse(1)}
                                                pressed={
                                                    this.state
                                                        .resposesChoosed[this.state.currentQuestion]
                                                        .includes(1)
                                                }
                                                modeCheckAnswers={this.state.modeCheckAnswers}
                                                correct={
                                                    this.state.quizPicked
                                                        .answers[this.state.currentQuestion]
                                                        .includes(1)
                                                }
                                            />
                                            <QuizResponse
                                                text={
                                                    this.state.quizPicked
                                                    .questionsResponse[this.state.currentQuestion]
                                                        .response4
                                                }
                                                choosed={() => this.handleResponse(3)}
                                                pressed={
                                                    this.state
                                                        .resposesChoosed[this.state.currentQuestion]
                                                        .includes(3)
                                                }
                                                modeCheckAnswers={this.state.modeCheckAnswers}
                                                correct={
                                                    this.state.quizPicked
                                                        .answers[this.state.currentQuestion]
                                                        .includes(3)
                                                }
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.controlButtonsContainer}>
                                        <TouchableHighlight
                                            onPress={() => this.previousQuestion()}
                                            underlayColor='rgba(255, 0, 0, 1)'
                                            style={styles.controlButtons}
                                        >
                                            <Text style={styles.controlText}>Previous</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight
                                            onPress={() => this.nextQuestion()}
                                            underlayColor='rgba(0, 255, 153, 1)'
                                            style={styles.controlButtons}
                                        >
                                            <Text style={styles.controlText} >
                                                {
                                                    this.state.currentQuestion === 9 ?
                                                        'Results' :
                                                        'Next'
                                                }
                                            </Text>
                                        </TouchableHighlight>
                                    </View>
                                </ScrollView> :
                                this.state.isLoading ?
                                    <Spinner color="red" /> :
                                    <QuizNotFound />
                        }
                    </View>
                </View>
            </ImageBackground >
        );
    }
}
export default withNavigation(Game);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    headerStyle: {
        backgroundColor: 'transparent',
        height: 56,
        paddingBottom: 15,
    },
    question: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        height: 160,
    },
    progressCircle: {
        alignItems: 'center',
    },
    responsesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    responsesRight: {
        flexDirection: 'column',
    },
    responsesLeft: {
        flexDirection: 'column',
    },
    questionText: {
        color: '#e6e6e6',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: Fonts.OPENSANSREGULAR
    },
    controlButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    controlText: {
        color: '#000',
        fontSize: 16
    },
    controlButtons: {
        width: '30%',
        height: 40,
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.4)'
    }
});
