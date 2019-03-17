import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  createSwitchNavigator
}
  from 'react-navigation';
import React from 'react';

import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import Achievements from '../screens/Achievements/Achievements';
import Settings from '../screens/Settings/Settings';
import Friends from '../screens/Friends/Friends';
import Challenge from '../screens/Challenge/Challenge';
import Dashboard from '../screens/Dashboard/Dashboard';
import Login from '../screens/Login/Login';
import Registration from '../screens/Registration/Registration';
import NotificationScreen from '../screens/Notifications/Notifications';
import Ranking from '../screens/Ranking/Ranking';
import GameScreen from '../screens/Game/Game';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import MenuDrawer from '../components/MenuDrawer/MenuDrawer';
import ScreensLabel from '../utils/labels/screensLabel';

const optionsNavigation = {
  initialRouteName: ScreensLabel.labels.AUTNAVIGATOR,
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
  Start: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  Challenge: {
    screen: Challenge,
    navigationOptions: {
      header: null
    }
  },
  Friends: {
    screen: Friends,
    navigationOptions: {
      header: null
    }
  },
  Achievements: {
    screen: Achievements,
    navigationOptions: {
      header: null
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      header: null
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null
    }
  },
  Ranking: {
    screen: Ranking,
    navigationOptions: {
      header: null
    }
  }
}, drawerConfig);

const appNavigator = createStackNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      header: null
    }
  },
  Start: {
    screen: menuNavigator,
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
});

const autNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Registration: {
    screen: Registration,
    navigationOptions: {
      header: null
    }
  },
});

const rootNavigator = createSwitchNavigator({
  autNavigator: {
    screen: autNavigator,
    navigationOptions: {
      header: null
    }
  },
  appNavigator: {
    screen: appNavigator,
    navigationOptions: {
      header: null
    }
  },
}, optionsNavigation);


export default createAppContainer(rootNavigator);
