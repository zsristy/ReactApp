import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screen/HomeScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import FacultylistScreenScreen from './src/screen/FacultylistScreen';

const stack = createStackNavigator();

function App(){
  return(
    <NavigationContainer>
      <stack.Navigator initialRouteName='Home'>
        <stack.Screen name='Home' component={HomeScreen}/>
        <stack.Screen name='Profile' component={ProfileScreen}/>
        <stack.Screen name='Faculty List' component={FacultylistScreenScreen}/>
      </stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
