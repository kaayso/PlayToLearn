import { View, Text } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import { getTimeInMinutes } from '../../utils/game/gameutils';
import Layout from '../../constants/Layout';

// green: 66ff99
// orange: ff884d
// red: ff1a1a

const Timer = (props) => (
    <View style={{ alignItems: 'center' }}>
        <Progress.Bar
            width={Layout.window.width}
            progress={props.remainingTime / props.time}
            color={
                // eslint-disable-next-line no-nested-ternary
                props.remainingTime <= 60 ?
                    '#ff1a1a' : props.remainingTime <= 105 ?
                        '#ff884d' : '#66ff99'
            }
            animationType='spring'
            borderRadius={0}
            height={3}
            borderColor='transparent'
        />
        <Text
            style={{
                fontSize: 20,
                color: `${
                    // eslint-disable-next-line no-nested-ternary
                    props.remainingTime <= 60 ?
                        '#ff1a1a' : props.remainingTime <= 105 ?
                            '#ff884d' : '#66ff99'
                }`,
                marginTop: 35
            }}
        >
            {getTimeInMinutes(props.remainingTime)}
        </Text>
    </View>
);

export default Timer;
