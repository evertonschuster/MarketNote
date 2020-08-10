import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Colors } from '../constants/Colors';
import { NewItemBuy } from '../screens/NewItemBuy/NewItemBuy';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

const Stack = createStackNavigator();
export function Router() {


  return (
    <NavigationContainer theme={{ colors: Colors, dark: false }}>
      <Stack.Navigator >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Bem vindo', headerBackTitle: "Tets" }} />
        <Stack.Screen name="NewItemBuy" component={NewItemBuy} options={{ title: "Novo item" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;