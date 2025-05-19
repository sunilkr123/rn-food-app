import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeProductScreen from './HomeProductScreen';
import CartScreen from './CartScreen';
import ProfileScreen from './ProfileScreen';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RecentChats from './RecentChat/RecentChats';

const BottomView = createBottomTabNavigator();


const BottomTabBar = (): React.JSX.Element => {
  return (
       <BottomView.Navigator>
      <BottomView.Screen
        name="home"
        component={HomeProductScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({size, color}) => (<FontAwesomeIcon name='home' size={size} color={color}/>)}}/>
      <BottomView.Screen name='cart' component={CartScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (<Ionicons name='bag-add' size={size} color={color} />)
        }} />
      <BottomView.Screen name='chat' component={RecentChats}
        options={
          {
            headerShown: false,
            tabBarIcon: ({ size, color }) => (<Ionicons name='chatbubble-ellipses' size={size} color={color} />)
          }} />
      <BottomView.Screen name='profile' component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (<Ionicons name='person' size={size} color={color}
          />)
        }} />
      </BottomView.Navigator>
  )
}

export default BottomTabBar