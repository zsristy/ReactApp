import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screen/HomeScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import FacultylistScreen from './src/screen/FacultylistScreen';
import SemesterScreen from './src/screen/SemesterScreen';
import CourselistScreen from './src/screen/CourselistScreen';

const stack = createStackNavigator();

function App(){
  return(
    <NavigationContainer>
      <stack.Navigator initialRouteName='Home'>
        <stack.Screen name='Home' component={HomeScreen}/>
        <stack.Screen name='Profile' component={ProfileScreen}/>
        <stack.Screen name='Faculty List' component={FacultylistScreen}/>
        <stack.Screen name='Semester' component={SemesterScreen}/>
        <stack.Screen name='Course List' component={CourselistScreen}/>
      </stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
