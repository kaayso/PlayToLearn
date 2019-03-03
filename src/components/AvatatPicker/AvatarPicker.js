import React from 'react';
import {
    StyleSheet,
    Image,
    TouchableHighlight
} from 'react-native';
import { Overlay } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';
import Layout from '../../constants/Layout';
import Avatars from '../../utils/avatars/avatar';

const AvatarPicker = (props) => (
    < Overlay
        isVisible={props.pickerVisible}
        onBackdropPress={props.setPickerVisibility}
        windowBackgroundColor="rgba(0, 0, 0, .7)"
    >
            <FlatGrid
                style={styles.container}
                itemDimension={Math.floor(Layout.window.width * 0.2)}
                items={Avatars.avatarsList}
                renderItem={({ item }) => (
                    <TouchableHighlight
                        underlayColor='transparent'
                        activeOpacity={0.4}
                        onPress={() => props.choiceHandler(item.name)}
                    >
                        <Image
                            source={item.source}
                            style={styles.img}
                        />
                    </TouchableHighlight>
                )}
            />
    </ Overlay>
);
export default AvatarPicker;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        width: 90,
        height: 90,
        borderRadius: 50,
    },
});
