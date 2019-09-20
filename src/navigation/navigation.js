import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SignUp from '../components/signup';
import Home from '../components/home';
import SignIn from '../components/signin';


const AppNavigator = createStackNavigator({
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
  Home: { screen: Home },
});

export default createAppContainer(AppNavigator);