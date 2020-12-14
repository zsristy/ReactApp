import React, { useState,useEffect } from "react";
import { ImageBackground,View, ScrollView, StyleSheet, AsyncStorage,FlatList,Image } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { FontAwesome5 } from '@expo/vector-icons';
import {getDataJson, getAllindex, removeData} from '../function/AsyncstorageFunction';
import PostlistComponent from "../component/PostListComponent";
import { AuthContext } from "../provider/AuthProvider";
import * as firebase from "firebase/app";
require('firebase/auth');
import "firebase/firestore";


const ProfileScreen = (props) => {
  const [Post, setPost]=useState([]);
  const [Data, setData]=useState([]);

  const getData = async () =>{
    firebase
      .firestore()
      .collection("users")
      .onSnapshot((querySnapshot) => {
        let temp_users = [];
        querySnapshot.forEach((doc) => {
          temp_users.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setData(temp_users);
        //setLoading(false);
      }
      ,(error) => {
        //setLoading(false);
        alert(error);
      });
    }

  const getPost = async () =>{
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

  useEffect(()=>{
    getData();
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
                })
                .catch((error) => {
                  alert(error);
                });
              },
            }}/>
          

          <ImageBackground source={require('./../../assets/08.jpg')} style={styles.imageStyle}>
            <Card>
            <Image style={styles.imageStyle1} source={require('./../../assets/profile.png')}/>
            <Text style={styles.textStyle2}> {auth.CurrentUser.displayName}   </Text>  
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginBottom: 20 }}>
            <Button
              type="solid"
              title=" Edit Account "
              icon={<FontAwesome5 name="user-edit" size={24} color="white" />}
              onPress={
                function(){
                    props.navigation.navigate('EditProfile',{title: auth.CurrentUser});
                }
            }
            />


            {/* <Button
              type="solid"
              title=" Testing "
              icon={<FontAwesome5 name="user-edit" size={24} color="white" />}
              onPress={
                function(){
                    console.log(userDocument(auth.CurrentUser.uid));
                }
            }
            /> */}


            </View>
            <Card.Divider />  

          <FlatList
          data={Data}
          renderItem={function({item}){
            if(item.data.name==auth.CurrentUser.displayName){
            return(
              <Text style={styles.textStyle1}>Born On : {item.data.bornon} {'\n'}
              Lives At : {item.data.livesat} {'\n'} 
              Works At : {item.data.worksat} {'\n'} </Text>
            );
            }
          }}
          keyExtractor={(item, index) => index.toString()}
          >
          </FlatList>    

          </Card>

          <FlatList
          data={Post}
          renderItem={function({item}){
            if(item.data.userId==auth.CurrentUser.uid){
            return(
              <PostlistComponent title={item.data} user={auth.CurrentUser}
              />
            );
            }
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
textStyle1:{
  fontSize: 20,
  color: 'black',
  marginLeft: 30,
  marginRight: 10,
  marginTop:10,
},
textStyle2:{
  fontSize: 20,
  color: 'black',
  alignSelf: 'center',
  marginTop:10,
  marginBottom: 20,
  fontStyle: "italic"
},
imageStyle1:{
  height: 120,
  width: 85,
  alignSelf: 'center',
  marginTop: 40,
},
});

export default ProfileScreen;