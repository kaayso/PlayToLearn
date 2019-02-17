import { FlatList, View, StyleSheet, Text, Image } from 'react-native';
import React, { Component } from 'react';
import QuizItem from '../QuizItem/QuizItem';
import Fonts from '../../utils/fonts/Fonts';
import Colors from '../../constants/Colors';

export default class QuizList extends Component {

    /**
     * TEMP :
     * shuffle an array list
     * @param {Array} list 
     */
    shuffle(list) {
        const input = list;      
        for (let i = input.length - 1; i >= 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1)); 
            const itemAtIndex = input[randomIndex]; 
             
            input[randomIndex] = input[i]; 
            input[i] = itemAtIndex;
        }
        return input;
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Image style={styles.logo} source={this.props.logo} />
                    <Text style={styles.title}> {this.props.title}</Text>
                </View>
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
                        data={this.shuffle(this.props.data)}
                        renderItem={({ item }) => <QuizItem item={item} />}
                    />
                </View>  
            </View>
        );
    }
}

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
    },
    logo: {
        height: 28,
        width: 28
    }
});
