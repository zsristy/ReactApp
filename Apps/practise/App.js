import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import {AuthContext, AuthProvider} from './src/provider/AuthProvider';
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";

import HomeScreen from './src/screen/HomeScreen';
import NotificationScreen from './src/screen/NotificationScreen';
import SignupScreen from './src/screen/SignupScreen';
import SigninScreen from './src/screen/SigninScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import CommentScreen from './src/screen/CommentScreen';
import EditProfileScreen from './src/screen/EditProfileScreen';
import * as firebase from 'firebase/app';



const firebaseConfig = {
  apiKey: "AIzaSyA92gcZJFsWmMqJHIb2ceU_RM7hITS9pr4",
  authDomain: "blog-183c8.firebaseapp.com",
  projectId: "blog-183c8",
  storageBucket: "blog-183c8.appspot.com",
  messagingSenderId: "943473434762",
  appId: "1:943473434762:web:e7705d069142f4393acd73"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


const AuthStack =createStackNavigator();
const HomeTab = createMaterialBottomTabNavigator();
const AppDrawer = createDrawerNavigator();
const HomeStack=createStackNavigator();
const ProfileStack=createStackNavigator();

const AuthStackScreen=()=>{
  return(
    <AuthStack.Navigator initialRouteName='Signin'>
      <AuthStack.Screen name='SignIn' component={SigninScreen} options={{headerShown: false}}/> 
      <AuthStack.Screen name='SignUp' component={SignupScreen} options={{headerShown: false}}/>
    </AuthStack.Navigator>
  );
}

const HomeTabScreen=()=>{
  return(
    < HomeTab.Navigator initialRouteName='Home'>
      < HomeTab.Screen name='Home' component={HomeScreen} options={{headerShown: false, tabBarLabel: "Home",
      tabBarIcon: ({ focused }) =>
        focused ? (
          <Entypo name="home" color="white" size={26} />
        ) : (
          <AntDesign name="home" color="white" size={22} />
        )
        }}/>

      < HomeTab.Screen name="Notification" component={NotificationScreen} options={{tabBarLabel: "Notifications",
      tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="ios-notifications" size={26} color="white" />
            ) : (
              <Ionicons name="ios-notifications-outline" size={22} color="white"/>
            )
        }}
      />

    </ HomeTab.Navigator>
  );
}


const HomeStackScreen =()=>{
  return(
    <HomeStack.Navigator initialRouteName='Home'>
      <HomeStack.Screen name='Home' component={ HomeTabScreen}  options={{headerShown: false}}/>
      <HomeStack.Screen name='Comment'component={ CommentScreen} options={{headerShown: false}}/>
    </HomeStack.Navigator>
  )

}

const ProfileStackScreen =()=>{
  return(
    <ProfileStack.Navigator initialRouteName='Profile'>
      <ProfileStack.Screen name='Profile' component={ProfileScreen }  options={{headerShown: false}}/>
      <ProfileStack.Screen name='EditProfile'component={ EditProfileScreen} options={{headerShown: false}}/>
    </ProfileStack.Navigator>
  )

}


const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator>
      <AppDrawer.Screen name="Home" component={ HomeStackScreen} options={{headerShown: false}} />
      <AppDrawer.Screen name="Profile" component={ProfileStackScreen} options={{headerShown: false}}/>

    </AppDrawer.Navigator>
  );
}

function App(){
  return(
    <AuthProvider>
      <AuthContext.Consumer>
      {(auth)=>(
            <NavigationContainer >
              {auth.IsloggedIn ? <AppDrawerScreen/>:<AuthStackScreen/>}
            </NavigationContainer>
      )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;

