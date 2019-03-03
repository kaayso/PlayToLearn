/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React, { Component } from 'react';
import { Root } from 'native-base';

import NavigationRoot from './src/navigation/MainNavigator';

export default class App extends Component {
  render() {
    return (
      <Root>
        <NavigationRoot />
      </Root>
    );
  }
}
