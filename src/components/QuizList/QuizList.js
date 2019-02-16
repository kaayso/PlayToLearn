import { FlatList, View, StyleSheet, Text, Image } from 'react-native';
import React, { Component } from 'react';
import QuizItem from '../QuizItem/QuizItem';
import Fonts from '../../utils/fonts/Fonts';

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
                                width: 5,
                                backgroundColor: '#fff'
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
        backgroundColor: '#fff',
        marginBottom: 30,
    },
    list: { 
        height: 110,
        padding: 5,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 14,
        color: '#000',
        fontFamily: Fonts.OPENSANSSEMIBOLD
    },
    textContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#E4E4E4',
        paddingBottom: 3,
        paddingTop: 5,
    },
    logo: {
        height: 28,
        width: 28
    }
});
