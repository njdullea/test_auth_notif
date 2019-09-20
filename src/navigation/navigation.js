import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Authentication from '../components/authentication';
import Home from '../components/home';
import SignIn from '../components/signin';


const AppNavigator = createStackNavigator({
  SignIn: { screen: SignIn },
  Authentication: { screen: Authentication },
  Home: { screen: Home },
});

export default createAppContainer(AppNavigator);