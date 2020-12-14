import React, { useState,useEffect } from "react";
import { ImageBackground,View, ScrollView, StyleSheet, AsyncStorage,Image } from "react-native";
import { Text, Card, Button, Avatar, Header,Input } from "react-native-elements";
import DatePicker from 'react-native-datepicker'
import { FontAwesome5 } from '@expo/vector-icons';
import {storeDataJson, mergeData, removeData} from '../function/AsyncstorageFunction';
import { AuthContext } from "../provider/AuthProvider";
import * as firebase from "firebase/app";
require('firebase/auth');
import "firebase/firestore";

const EditProfileScreen = (props) => { 
const content=props.route.params.title
const [Bornon, setBornon]=useState(content.bornon);
const [Livesat, setLivesat]=useState(content.livesat);
const [Worksat, setWorksat]=useState(content.worksat);


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
            <Card >
            <Image style={styles.imageStyle1} source={require('./../../assets/profile.png')}/>
            <Text style={styles.textStyle2}> {auth.CurrentUser.displayName}   </Text>  
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginBottom: 40 }}>
            </View>  
            <Card.Divider/> 
            <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <Text style={styles.textStyle1}>Born On</Text> 
            <DatePicker
                date={Bornon}
                mode="date"
                androidMode="spinner"
                customStyles={{
                  dateInput: {
                    marginLeft: 10
                    ,
                  },
                }}
                onDateChange={(date) => {
                  setBornon(date);
                }}
            />   
            </View>
                <Input 
                placeholder='Lives At' 
                onChangeText={
                    function(currentinput){
                        setLivesat(currentinput);
                    }
                }
                ></Input>
                
                <Input 
                placeholder='Works At' 
                onChangeText={
                    function(currentinput){
                        setWorksat(currentinput);
                    }
                }
                ></Input> 

                <Button
              type="solid"
              title=" Edit Account "
              icon={<FontAwesome5 name="user-edit" size={24} color="white" />}
              onPress={   
                async function(){
                  firebase
                  .firestore()
                  .collection("users")
                  .doc(auth.CurrentUser.uid)
                  .update({
                      bornon: Bornon,
                      livesat: Livesat,
                      worksat: Worksat,
                  })
                  .catch((error) => {
                    //setLoading(false);
                    alert(error);
                  });
                  

                  props.navigation.navigate('Profile');
                }
                
            }
            />

          </Card>
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
  fontSize: 18,
  color: 'gray',
  marginLeft: 10,
  marginRight: 10,
  marginTop:10,
  marginBottom:25
},
textStyle2:{
  fontSize: 20,
  color: 'black',
  alignSelf: 'center',
  marginTop:10,
  fontStyle: "italic"
},
imageStyle1:{
  height: 200,
  width: 160,
  alignSelf: 'center',
  marginTop: 40,
},
// datePickerStyle: {
//   width: 200,
//   marginTop: 20,
// },
});

export default EditProfileScreen;