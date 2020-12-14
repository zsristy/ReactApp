import React, { useState ,useEffect} from "react";
import {ImageBackground, SafeAreaView, ScrollView,TouchableOpacity, FlatList, View, StyleSheet } from "react-native";
import { Header} from "react-native-elements";
import {getDataJson, getAllindex} from '../function/AsyncstorageFunction';
import NotificationComponent from '../component/NotificationComponent';
import { AuthContext } from "../provider/AuthProvider"
import * as firebase from "firebase/app";
require('firebase/auth');
import "firebase/firestore";

const NotificationScreen = (props) => {
  const [Notification, setNotification]=useState([]);
  const getNotification = async () =>{
    firebase
    .firestore()
    .collection("notifications")
    .orderBy("time", "desc")
    .onSnapshot((querySnapshot) => {
      let temp_notifications = [];
      querySnapshot.forEach((doc) => {
        temp_notifications.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setNotification(temp_notifications);
      //setLoading(false);
    },(error) => {
      //setLoading(false);
      alert(error);
    });
  }


  useEffect(()=>{
     getNotification();
  },[]);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
            <Header
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: function () {
                props.navigation.toggleDrawer();
              },
            }}
            centerComponent={{ text: "The Office || "+auth.CurrentUser.displayName, style: { color: "#fff" ,fontSize: 20} }}         
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: function () {
                firebase
                .auth()
                .signOut()
                .then(() => {
                  auth.setIsloggedIn(false);
                  auth.setCurrentUser({});
                },(error) => {
                  alert(error);
                });
              },
            }}/>
          <ImageBackground source={require('./../../assets/05.jpg')} style={styles.imageStyle}> 
          <FlatList
          data={Notification}
          renderItem={function({item}){
            if(item.data.userId==auth.CurrentUser.uid){
            return(
                  <NotificationComponent title={item.data} link={props.navigation}/>
            );}
          }}
          keyExtractor={(item, index) => index.toString()}
          >
          </FlatList> 
          
          </ImageBackground>
        </View>
      )}
    </AuthContext.Consumer>
  );
};


const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
  imageStyle: {
    flex:1,
    resizeMode: "cover",
    justifyContent: "center"
},
});

export default NotificationScreen;