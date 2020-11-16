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


const HomeScreen = (props) => {

  const [Post, setPost]=useState([]);
  const [Render, setRender]=useState(false);
  const getPost = async () =>{
    setRender(true);
    let keys=await getAllindex();
    let Allposts=[];
    if(keys!=null){
      for (let k of keys){
          if(k.startsWith("pid#")){
            let post= await getDataJson(k);
            Allposts.push(post);
          }
        }
        setPost(Allposts);
      }
      else{
        console.log("No post to show");
      }
      setRender(false);
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
            centerComponent={{ text: "The Office", style: { color: "#fff" ,fontSize: 20} }}         
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: function () {
                auth.setIsloggedIn(false);
                auth.setCurrentUser({});
              },
            }}/>

          <ImageBackground source={require('./../../assets/07.jpg')} style={styles.imageStyle}>  

          <WritePostComponent user={auth.CurrentUser}/>

          <FlatList
          data={Post}
          onRefresh={getPost}
          refreshing={Render}
          renderItem={function({item}){
            return(
              <ShowPostComponent title={item} user={auth.CurrentUser} link={props.navigation}
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