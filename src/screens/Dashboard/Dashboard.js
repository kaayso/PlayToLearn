import React, { Component } from 'react';
import { FlatGrid } from 'react-native-super-grid';
import { StyleSheet, ImageBackground } from 'react-native';
import Square from '../../components/Square/Square';
import DashboardItems from '../../utils/dashboard/Squares';
import Layout from '../../constants/Layout';
import Bg from '../../utils/background/backgroundimages';
import Screen from '../../utils/labels/screensLabel';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null
    };
  }
  componentDidMount() {
    const UID = this.props.navigation.getParam('uid', null);
    // if no uid then return to authentication screen...
    if (!UID || UID === '') {
      this.props.navigation.navigate(Screen.labels.LOGIN, { authError: true });
    } else {
      this.setState({
        uid: UID
      });
    }
    //TEMP
    /*this.setState({
      uid: '5c7c1b701d8e3ab24b0ea7bb'//UID
    });*/
  }

  render() {
    return (
      <ImageBackground
        style={{ width: '100%', height: '100%' }}
        source={Bg.GAMEBG}
      >
        <FlatGrid
          style={styles.container}
          itemDimension={Math.floor(Layout.window.width * 0.4)}
          items={DashboardItems}
          renderItem={({ item }) => (
            <Square
              label={item.label}
              screen={item.label === 'Disconnect' ? 'Login' : item.label}
              img={item.image}
              style={item.style}
              uid={this.state.uid}
            />
          )}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
