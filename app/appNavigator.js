import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './screens/home';
import LogIn from './screens/logIn';


const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Login: { screen: LogIn},
});

const AppContainer = createAppContainer(AppNavigator);


export default AppContainer;
