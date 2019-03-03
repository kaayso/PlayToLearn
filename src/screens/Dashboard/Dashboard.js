import React, { Component } from 'react';
import { FlatGrid } from 'react-native-super-grid';
import { StyleSheet, ScrollView, ImageBackground } from 'react-native';
import Square from '../../components/Square/Square';
import DashboardItems from '../../utils/dashboard/Squares';
import Layout from '../../constants/Layout';
import Bg from '../../utils/background/backgroundimages';

export default class Dashboard extends Component {
  render() {
    return (
      <ImageBackground
        style={{ width: '100%', height: '100%' }}
        source={Bg.GAMEBG}
      >
        <ScrollView>
          <FlatGrid
            style={styles.container}
            itemDimension={Math.floor(Layout.window.width * 0.4)}
            items={DashboardItems}
            renderItem={({ item }) => (
              <Square
                label={item.label}
                img={item.image}
                style={item.style}
              />
            )}
          />

        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
