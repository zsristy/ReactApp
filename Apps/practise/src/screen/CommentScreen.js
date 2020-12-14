import React, { useState ,useEffect} from "react";
import {ImageBackground, SafeAreaView, ScrollView, FlatList, View, StyleSheet } from "react-native";
import {
  Card,
  Button,
  Text,
  Avatar,
  Input,
  Header,
} from "react-native-elements";

import WriteCommentComponent from "../component/WriteCommentComponent";
import ShowCommentComponent from "../component/ShowCommentComponent";
import {getDataJson, getAllindex} from '../function/AsyncstorageFunction';
import { AuthContext } from "../provider/AuthProvider"
import * as firebase from "firebase/app";
require('firebase/auth');
import "firebase/firestore";


const CommentScreen = (props) => {
  const content=props.route.params.content;
  const idx=props.route.params.key;

  const [Comment, setComment]=useState([]);
  const getComment = async () =>{
    //setRender(true);
    firebase
    .firestore()
    .collection('posts')
    .doc(content.postid)
    .collection('comments')
    .orderBy("when", "desc")
    .onSnapshot((querySnapshot) => {
      let temp_comments = [];
      querySnapshot.forEach((doc) => {
        temp_comments.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setComment(temp_comments);
      //setLoading(false);
    },(error) => {
      //setLoading(false);
      alert(error);
    });
    }

  useEffect(()=>{
    getComment();
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

          <ImageBackground source={require('./../../assets/04.jpg')} style={styles.imageStyle}>  

          <WriteCommentComponent user={auth.CurrentUser} postcontent={content} pid={idx}/>
             
             
             {/* <Button
                title="  Test "
                type="solid"
                onPress={() => {
                    //setIsLoading(true);
                   console.log(idx);
                  }}
                />  */}


          <FlatList
          data={Comment}
          renderItem={function({item}){
            return(
              <ShowCommentComponent title={item.data}/>
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

export default CommentScreen;