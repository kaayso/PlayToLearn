import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from '../screens/Home/Home';
import Dashboard from '../screens/Dashboard/Dashboard';
import Colors from '../constants/Colors';

const optionsNavigation = {
  initialRouteName: 'Dashboard',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Colors.blueThemeColor,
    },
    headerTintColor: '#fff',
  },
};
const navigator = createStackNavigator({
  Start: {
    screen: Home,
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      header: null
    }
  },
}, optionsNavigation);

export default createAppContainer(navigator);
