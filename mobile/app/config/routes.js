import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Welcome from '../containers/Welcome';
import Help from '../screens/Help';
import Login from '../containers/Login';
import Home from '../containers/Home';
import SkillInput from '../screens/SkillInput';
import JobResult from '../containers/JobResult';
import Interview from '../containers/Interview';

const HomeStack = createStackNavigator(
  {
    Home,
    SkillInput,
    JobResult,
    Interview,
  },
  {
    initialRouteName: 'SkillInput',
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