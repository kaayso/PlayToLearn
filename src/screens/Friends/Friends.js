import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, AppRegistry, Button, FlatList, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Header, SearchBar, ListItem } from 'react-native-elements';
import Colors from '../../constants/Colors';
import MenuButton from '../../components/MenuButton/MenuButton';
import NavBarButton from '../../components/NavBarButton/NavBarButton';
import FriendItem from '../../components/FriendItem/FriendItem'
import ScreensLabel from '../../utils/labels/screensLabel';


class Friends extends Component {
  static navigationOptions ={
    header: null
  };

  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  handlePress = () => {
    Alert.alert('You tapped the button!')
  }

  render() {
    const { search } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header
          containerStyle={styles.headerStyle}
          leftComponent={<MenuButton />}
          centerComponent={
            <NavBarButton
              iconName='dashboard'
              navigationTo={ScreensLabel.labels.DASHBOARD}
            />
          }
          rightComponent={
            <NavBarButton
            iconName='notifications'
            navigationTo={ScreensLabel.labels.NOTIFICATIONS}
            />
          }
        />
        <View>
        <TouchableHighlight
              style ={{
                  height: 40,
                  width:160,
                  borderRadius:10,
                  marginLeft :250,
                  marginTop :10,
                  marginBottom: 10
              }}>
          <Button onPress={this.handlePress}
            color="#88aac2"
            title="Add new friend"
            accessibilityLabel="Learn more about this button"
        />
        </TouchableHighlight>
          <SearchBar
            lightTheme
            inputStyle={{backgroundColor: 'white'}}
            containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
            placeholder="Search Friends"
            onChangeText={this.updateSearch}
            value={search}
          />
          <FlatList
            data={[{key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}]}
            renderItem={({item}) => <FriendItem/>}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              Alert.alert('End of list!')
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    marginLeft: 5,
    marginRight: 5,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  headerStyle: {
    backgroundColor: Colors.blueThemeColor,
  }
});

export default withNavigation(Friends);
