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

const homeNavigator = createDrawerNavigator({
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
  Ranking: {
    screen: Ranking,
  },
}, drawerConfig);

const settingsNavigator = createDrawerNavigator({
  Settings: {
    screen: Settings,
  },
  Home: {
    screen: Home,
  },
  Profile: {
    screen: Profile,
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
  Ranking: {
    screen: Ranking,
  },
}, drawerConfig);

const profileNavigator = createDrawerNavigator({
  Profile: {
    screen: Profile,
  },
  Settings: {
    screen: Settings,
  },
  Home: {
    screen: Home,
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
  Ranking: {
    screen: Ranking,
  },
}, drawerConfig);

const challengeNavigator = createDrawerNavigator({
  Challenge: {
    screen: Challenge,
  },
  Settings: {
    screen: Settings,
  },
  Home: {
    screen: Home,
  },
  Profile: {
    screen: Profile,
  },
  Friends: {
    screen: Friends,
  },
  Achievements: {
    screen: Achievements,
  },
  Ranking: {
    screen: Ranking,
  },
}, drawerConfig);

const friendsNavigator = createDrawerNavigator({
  Friends: {
    screen: Friends,
  },
  Settings: {
    screen: Settings,
  },
  Home: {
    screen: Home,
  },
  Profile: {
    screen: Profile,
  },
  Challenge: {
    screen: Challenge,
  },
  Achievements: {
    screen: Achievements,
  },
  Ranking: {
    screen: Ranking,
  },
}, drawerConfig);

const achievementsNavigator = createDrawerNavigator({
  Achievements: {
    screen: Achievements,
  },
  Settings: {
    screen: Settings,
  },
  Home: {
    screen: Home,
  },
  Profile: {
    screen: Profile,
  },
  Challenge: {
    screen: Challenge,
  },
  Friends: {
    screen: Friends,
  },
  Ranking: {
    screen: Ranking,
  },
}, drawerConfig);

const rankingNavigator = createDrawerNavigator({
  Ranking: {
    screen: Ranking,
  },
  Achievements: {
    screen: Achievements,
  },
  Settings: {
    screen: Settings,
  },
  Home: {
    screen: Home,
  },
  Profile: {
    screen: Profile,
  },
  Challenge: {
    screen: Challenge,
  },
  Friends: {
    screen: Friends,
  },
}, drawerConfig);

const appNavigator = createStackNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      header: null
    }
  },
  Start: {
    screen: homeNavigator,
    navigationOptions: {
      header: null
    }
  },
  Challenge: {
    screen: challengeNavigator,
    navigationOptions: {
      header: null
    }
  },
  Friends: {
    screen: friendsNavigator,
    navigationOptions: {
      header: null
    }
  },
  Achievements: {
    screen: achievementsNavigator,
    navigationOptions: {
      header: null
    }
  },
  Settings: {
    screen: settingsNavigator,
    navigationOptions: {
      header: null
    }
  },
  Profile: {
    screen: profileNavigator,
    navigationOptions: {
      header: null
    }
  },
  Ranking: {
    screen: rankingNavigator,
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
