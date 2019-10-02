import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './screens/home';
import LogIn from './screens/logIn';
import Shopping from './screens/shopping';
import SignUp from './screens/signUp';
import { connect } from 'react-redux';


const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Login: { screen: LogIn },
  Signup: { screen: SignUp },
  Shopping: { screen: Shopping }
});

const AppContainer = createAppContainer(AppNavigator);


export default connect()(AppContainer);
