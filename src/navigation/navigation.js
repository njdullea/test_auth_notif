import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import Home from './Home';
// import Friends from './Friends';
import Authentication from '../components/authentication';


const AppNavigator = createStackNavigator({
  Authentication: { screen: Authentication },
  // Home: { screen: Home },
  // Friends: { screen: Friends},
});

// export default AppNavigator;

export default createAppContainer(AppNavigator);