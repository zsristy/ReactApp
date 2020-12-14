import React, { useState ,useEffect} from "react";
import {ImageBackground, SafeAreaView, ScrollView,TouchableOpacity, FlatList, View, StyleSheet } from "react-native";
import {
  Card,
  Button,
  Text,
  Avatar,
  Input,
  Header,
} from "react-native-elements";
import ShowPostComponent from "../component/ShowPostComponent";
import WritePostComponent from "../component/WritePostComponent";;
import {getDataJson, getAllindex} from '../function/AsyncstorageFunction';
import { AuthContext } from "../provider/AuthProvider"
import * as firebase from "firebase/app";
require('firebase/auth');
import "firebase/firestore";


const HomeScreen = (props) => {

  const [Post, setPost]=useState([]);
  const getPost = async () =>{
    //setLoading(true);
    firebase
      .firestore()
      .collection("posts")
      .orderBy("created_at", "desc")
      .onSnapshot((querySnapshot) => {
        let temp_posts = [];
        querySnapshot.forEach((doc) => {
          temp_posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPost(temp_posts);
        //setLoading(false);
      }
      ,(error) => {
        //setLoading(false);
        alert(error);
      });
    }

  useEffect(()=>{
    getPost();
  },[]);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <SafeAreaView style={styles.viewStyle}>
            
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
                })
                .catch((error) => {
                  alert(error);
                });
              },
            }}/>

          <ImageBackground source={require('./../../assets/07.jpg')} style={styles.imageStyle}>  

          <WritePostComponent user={auth.CurrentUser}/>
          {/* <Button
                title="  Test "
                type="solid"
                onPress={() => {
                    //setIsLoading(true);
                   console.log(auth.CurrentUser.displayName);
                   console.log(auth.CurrentUser.uid);
                  }}
                />  */}

          <FlatList
          data={Post}
          renderItem={function({item}){
            return(
              <ShowPostComponent postid={item.id} title={item.data} user={auth.CurrentUser} link={props.navigation}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          >
          </FlatList> 

          </ImageBackground>

        </SafeAreaView>
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

export default HomeScreen;