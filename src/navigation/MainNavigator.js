import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import React from 'react';

import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import Achievements from '../screens/Achievements/Achievements';
import Settings from '../screens/Settings/Settings';
import Friends from '../screens/Friends/Friends';
import Challenge from '../screens/Challenge/Challenge';
import Dashboard from '../screens/Dashboard/Dashboard';
import NotificationScreen from '../screens/Notifications/Notifications';
import GameScreen from '../screens/Game/Game';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import MenuDrawer from '../components/MenuDrawer/MenuDrawer';
import ScreensLabel from '../utils/labels/screensLabel';

const optionsNavigation = {
  initialRouteName: ScreensLabel.labels.START,
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Colors.blueThemeColor,
    },
    headerTintColor: '#fff',
  },
};

const drawerConfig = {
    drawerWidth: Layout.window.width * 0.70,
    contentComponent: ({ props }) => (<MenuDrawer {...props} />)
};

const menuNavigator = createDrawerNavigator({
    Home: {
      screen: Home,
    },
    Profile: {
      screen: Profile,
    },
    Settings: {
      screen: Settings,
    },
    Challenge: {
      screen: Challenge,
    },
    Friends: {
      screen: Friends,
    },
    Achievements: {
      screen: Achievements,
    },
}, drawerConfig);

const navigator = createStackNavigator({
  Start: {
    screen: menuNavigator,
    navigationOptions: {
      header: null
    }
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      header: null
    }
  },
  Notifications: {
    screen: NotificationScreen,
    navigationOptions: {
      title: ScreensLabel.labels.NOTIFICATIONS
    }
  },
  GameScreen: {
    screen: GameScreen,
    navigationOptions: {
      header: null
    }
  }
}, optionsNavigation);

export default createAppContainer(navigator);
