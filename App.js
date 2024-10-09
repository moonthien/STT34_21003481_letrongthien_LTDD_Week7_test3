import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import ShopsScreen from './screens/ShopsScreen';
import DrinksScreen from './screens/DrinksScreen';
import OrderScreen from './screens/OrderScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ headerShown: false }} // Ẩn tiêu đề cho màn hình Welcome
        />
        <Stack.Screen 
          name="Shops" 
          component={ShopsScreen} 
          options={{ headerShown: false }} // Ẩn tiêu đề cho màn hình Shops
        />
        <Stack.Screen 
          name="Drinks" 
          component={DrinksScreen} 
          options={{ headerShown: false }} // Ẩn tiêu đề cho màn hình Drinks
        />
        <Stack.Screen 
          name="Orders" 
          component={OrderScreen} 
          options={{ headerShown: false }} // Ẩn tiêu đề cho màn hình Orders
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
