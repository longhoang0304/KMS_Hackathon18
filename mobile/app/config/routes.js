import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Welcome from '../containers/Welcome';
import Help from '../screens/Help';
import Login from '../containers/Login';
import Home from '../screens/Home';
import Map from '../screens/Map';

const HomeStack = createStackNavigator(
  {
    Home,
    Map,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

const LoginStack = createSwitchNavigator(
  {
    Login,
    HomeStack,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

const LoginScreen = createStackNavigator(
  {
    LoginStack,
    Help,
  },
  {
    initialRouteName: 'LoginStack',
    headerMode: 'none',
  },
);

const WelcomeStack = createStackNavigator(
  {
    Welcome,
    Help,
    LoginScreen,
    HomeStack,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Welcome',
  },
);

export default WelcomeStack;