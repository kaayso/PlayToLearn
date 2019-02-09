import React, { Component } from 'react';
import { FlatGrid } from 'react-native-super-grid';
import { StyleSheet, ScrollView } from 'react-native';
import Square from '../../components/Square/Square';
import DashboardItems from '../../utils/dashboard/Squares';
import Layout from '../../constants/Layout';

export default class Dashboard extends Component {
  render() {
    return (
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
              />)
            }
          />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#273547',
  }
});
