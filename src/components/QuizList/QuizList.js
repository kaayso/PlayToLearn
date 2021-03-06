import { FlatList, View, StyleSheet, Text, Image, AsyncStorage } from 'react-native';
import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Spinner } from 'native-base';

import QuizItem from '../QuizItem/QuizItem';
import Fonts from '../../utils/fonts/Fonts';
import Colors from '../../constants/Colors';
import {
    getQuizMostPlayed,
    getNewQuiz,
    getRecommendedQuiz,
    getDailyChallenge,
    getWeeklyChallenge,
    addKeysToList
} from '../../utils/game/gameutils';
import QuizListLabel from '../../utils/labels/quizList';

class QuizList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }
    componentWillMount() {
        AsyncStorage.getItem('uid').then((id) => {
            switch (this.props.title) {
                case QuizListLabel.MP:
                    getQuizMostPlayed(id, 5).then((d) => {
                        this.setState({
                            data: d
                        });
                    });
                    break;
                case QuizListLabel.NEW:
                    getNewQuiz(id, 5).then((d) => {
                        this.setState({
                            data: d
                        });
                    });
                    break;
                case QuizListLabel.REC:
                    getRecommendedQuiz(id, 5).then((d) => {
                        this.setState({
                            data: d
                        });
                    });
                    break;
                case QuizListLabel.WEEKLYC:
                    getWeeklyChallenge().then((d) => {
                        this.setState({
                            data: d
                        });
                    });
                    break;
                case QuizListLabel.DAILYC:
                    getDailyChallenge().then((d) => {
                        this.setState({
                            data: d
                        });
                    });
                    break;
                default:
                    break;
            }
        });
    }
    render() {        
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Image style={styles.logo} source={this.props.logo} />
                    <Text style={styles.title}> {this.props.title}</Text>
                </View>
                {
                    // eslint-disable-next-line no-nested-ternary
                    this.state.data ?
                        (!this.state.data.message ?
                        <View style={styles.list}>
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                ItemSeparatorComponent={() =>
                                    <View
                                        style={{
                                            width: 10,
                                            backgroundColor: Colors.blueThemeColor
                                        }}
                                    />}
                                data={addKeysToList(this.state.data)}
                                renderItem={({ item }) => <QuizItem item={item} />}
                            />
                        </View> : <View />) :
                        <Spinner color="red" />
                }
            </View>
        );
    }
}

export default withNavigation(QuizList);

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.blueBoldThemeColors,
        paddingBottom: 11,
    },
    list: {
        height: 110,
        padding: 5,
        backgroundColor: Colors.blueBoldThemeColors,
    },
    title: {
        fontSize: 14,
        color: '#F2F2F2',
        fontFamily: Fonts.OPENSANSREGULAR,
    },
    textContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 3,
        paddingTop: 8,
        paddingLeft: 2
    },
    logo: {
        height: 28,
        width: 28
    }
});
