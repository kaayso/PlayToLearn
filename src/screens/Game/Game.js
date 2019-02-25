import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ImageBackground,
    ScrollView,
    Image,
    TouchableHighlight
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Header } from 'react-native-elements';
import CloseButton from '../../components/CloseButton/CloseButton';
import Timer from '../../components/Timer/Timer';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Bg from '../../utils/background/backgroundimages';
import Fonts from '../../utils/fonts/Fonts';
import QuizResponse from '../../components/QuizResponse/QuizResponse';
import QuizQR from '../../assets/mocks/QuizQR';
import { initAnswersList, computeResult } from '../../utils/game/gameutils';
import CheckResults from '../../components/CheckResults/CheckResults';
import ConfirmationMsg from '../../components/ConfirmationMsg/ConfirmationMsg';
import ScreensLabel from '../../utils/labels/screensLabel';

const GAME_TIME = 150; // 150 seconds 

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remainingTime: GAME_TIME,
            currentQuestion: 0,
            resposesChoosed: initAnswersList(),
            answers: initAnswersList(),
            showResults: false,
            timeOut: false,
            modeCheckAnswers: false,
            quizResult: 0,
            showConfirmationMsg: false
        };
    }
    componentDidMount() {
        this.intervalId = setInterval(this.timer.bind(this), 1000);
        this.setState({
            answers: QuizQR.Answers
        });
    }
    componentWillUnmount() {
        clearInterval(this.intervalId);
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
            // Force reload the render of the component
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
            clearInterval(this.intervalId);
            this.setState({
                showResults: true,
                quizResult: !this.state.modeCheckAnswers ?
                    computeResult(this.state.answers, this.state.resposesChoosed) :
                    this.state.quizResult
            });
        }
        return;
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
        this.props.navigation.navigate(ScreensLabel.labels.START);
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
                            <Image style={{ width: 40, height: 40 }} source={QuizQR.image} />
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
                        message="Are you sure you want to back to home screen ?"
                        onClose={() => this.closeConfirmationMsg()}
                        onConfirm={() => this.confirmToGoHome()}
                    />
                    <View style={styles.container}>
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
                                    {QuizQR.QuestionsResponses[this.state.currentQuestion].Question}
                                </Text>
                            </View>
                            <ProgressBar value={this.state.currentQuestion + 1} />
                            <View style={styles.responsesContainer}>
                                <View style={styles.responsesLeft}>
                                    <QuizResponse
                                        text={
                                            QuizQR.QuestionsResponses[this.state.currentQuestion]
                                                .response1
                                        }
                                        choosed={() => this.handleResponse(0)}
                                        pressed={
                                            this.state.resposesChoosed[this.state.currentQuestion]
                                                .includes(0)
                                        }
                                        modeCheckAnswers={this.state.modeCheckAnswers}
                                        correct={
                                            this.state.answers[this.state.currentQuestion]
                                                .includes(0)
                                        }
                                    />
                                    <QuizResponse
                                        text={
                                            QuizQR.QuestionsResponses[this.state.currentQuestion]
                                                .response3
                                        }
                                        choosed={() => this.handleResponse(2)}
                                        pressed={
                                            this.state.resposesChoosed[this.state.currentQuestion]
                                                .includes(2)
                                        }
                                        modeCheckAnswers={this.state.modeCheckAnswers}
                                        correct={
                                            this.state.answers[this.state.currentQuestion]
                                                .includes(2)
                                        }
                                    />
                                </View>
                                <View style={styles.responsesRight}>
                                    <QuizResponse
                                        text={
                                            QuizQR.QuestionsResponses[this.state.currentQuestion]
                                                .response2
                                        }
                                        choosed={() => this.handleResponse(1)}
                                        pressed={
                                            this.state.resposesChoosed[this.state.currentQuestion]
                                                .includes(1)
                                        }
                                        modeCheckAnswers={this.state.modeCheckAnswers}
                                        correct={
                                            this.state.answers[this.state.currentQuestion]
                                                .includes(1)
                                        }
                                    />
                                    <QuizResponse
                                        text={
                                            QuizQR.QuestionsResponses[this.state.currentQuestion]
                                                .response4
                                        }
                                        choosed={() => this.handleResponse(3)}
                                        pressed={
                                            this.state.resposesChoosed[this.state.currentQuestion]
                                                .includes(3)
                                        }
                                        modeCheckAnswers={this.state.modeCheckAnswers}
                                        correct={
                                            this.state.answers[this.state.currentQuestion]
                                                .includes(3)
                                        }
                                    />
                                </View>
                            </View>
                            <View style={styles.controlButtonsContainer}>
                                <TouchableHighlight
                                    onPress={() => this.previousQuestion()}
                                    underlayColor='rgba(255, 255, 255, 0.4)'
                                    style={styles.controlButtons}
                                >
                                    <Text style={styles.controlText}>Previous</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    onPress={() => this.nextQuestion()}
                                    underlayColor='rgba(255, 255, 255, 0.4)'
                                    style={styles.controlButtons}
                                >
                                    <Text style={styles.controlText} >Next</Text>
                                </TouchableHighlight>
                            </View>
                        </ScrollView>
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
        marginTop: 5
    },
    controlText: {
        color: '#fff',
        fontSize: 17
    },
    controlButtons: {
        width: 100,
        height: 50,
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

