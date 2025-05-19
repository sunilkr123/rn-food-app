
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen';
import ResetPassword from './Screens/ResetPassword';
import BottomTabBar from './Screens/Tabbar/BottomTabBar';
import ProductDetails from './Screens/Tabbar/ProductDetails';
import AllProducts from './Screens/Tabbar/AllProducts';
import store from './store/store';
import { Provider } from 'react-redux'
import Splash from './Screens/Splash';


export type StackScreens = {
  login: undefined,
  register: undefined,
  tabBar: undefined,
  resetPassword: undefined,
  ProductDetails: { id: number },
  allProducts: undefined,
  forgotPassword: undefined
  splash: undefined
}
const Stack = createNativeStackNavigator<StackScreens>();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
    <NavigationContainer>
        <Stack.Navigator>
      <Stack.Screen name='splash' component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name='login' component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name='tabBar' component={BottomTabBar} options={{ headerShown: false, title: 'home' }} />
      <Stack.Screen name='register' component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name='forgotPassword' component={ForgotPasswordScreen} options={{headerShown: false, title: 'Forgot Password'}}/>
      <Stack.Screen name='resetPassword' component={ResetPassword} options={{ headerShown: true, title: 'Reset Passowrd' }} />
      <Stack.Screen name='ProductDetails' component={ProductDetails} options={{ headerShown: false }} />
      <Stack.Screen name='allProducts' component={AllProducts} options={{ headerShown: true, title: 'All Products' }} />
    </Stack.Navigator>
      </NavigationContainer>
      </Provider>);
}
 
export default App;