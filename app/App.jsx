import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IndexScreen from './index';
import CategoryScreen from './category';
import ProfileScreen from './profile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
      <Stack.Navigator initialRouteName="index" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" component={IndexScreen} />
        <Stack.Screen name="category" component={CategoryScreen} />
        <Stack.Screen name="profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
