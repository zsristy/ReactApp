import React, {useState} from 'react';
import {ImageBackground,Text, SafeAreaView, StyleSheet} from 'react-native';
import {Input, Button, Card} from 'react-native-elements';
import { Fontisto, Feather, FontAwesome, AntDesign  } from '@expo/vector-icons';
import * as firebase from "firebase/app";
require('firebase/auth');
import "firebase/firestore";

const SignupScreen=(props)=>{
    const [Name, setName]=useState("");
    const [Email, setEmail]=useState("");
    const [Sid, setSid]=useState("");
    const [Password, setPassword]=useState("");
    return(
        <SafeAreaView style={styles.viewStyle}>
            <ImageBackground source={require('./../../assets/04.jpg')} style={styles.imageStyle}>
            <Card>
                <Card.Title style={styles.textStyle}>Welcome to <Text style={styles.textStyle1}>The Office</Text></Card.Title>
                <Card.Divider/>

                <Input 
                leftIcon={<FontAwesome name="user-o" size={24} color="gray" />}
                placeholder='Name'
                onChangeText={
                    function(currentinput){
                        setName(currentinput);
                    }
                }
                ></Input>

                <Input 
                leftIcon={<Fontisto name="email" size={24} color="gray" />}
                placeholder='Email'
                onChangeText={
                    function(currentinput){
                        setEmail(currentinput);
                    }
                }
                ></Input>

                <Input 
                leftIcon={<AntDesign name="tagso" size={24} color="gray" />}
                placeholder='Student Id' 
                onChangeText={
                    function(currentinput){
                        setSid(currentinput);
                    }
                }
                ></Input>
                
                <Input 
                leftIcon={<Feather name="key" size={24} color="gray" />}
                placeholder='Password' 
                secureTextEntry={true}
                onChangeText={
                    function(currentinput){
                        setPassword(currentinput);
                    }
                }
                ></Input>

                <Button
                icon={<FontAwesome name="sign-in" size={24} color="white" />}
                title="  Sign Up"
                type="solid"
                onPress={async () => {
                    if (Name && Sid && Email && Password) {
                      //setIsLoading(true);
                      firebase
                        .auth()
                        .createUserWithEmailAndPassword(Email, Password)
                        .then((userCreds) => {
      
                          userCreds.user.updateProfile({ displayName: Name });
                          firebase
                            .firestore()
                            .collection("users")
                            .doc(userCreds.user.uid)
                            .set({
                              name: Name,
                              sid: Sid,
                              email: Email,
                              bornon: "",
                              livesat: "",
                              worksat: "",
                            })
      
                            .then(() => {
                              //setIsLoading(false);
                              alert("Account created successfully!  User ID: "+userCreds.user.uid);
                              console.log(userCreds.user)
                              props.navigation.navigate("SignIn");
                            })
      
                            .catch((error) => {
                              //setIsLoading(false);
                              alert(error);
                            });
                        })
      
                        .catch((error) => {
                          //setIsLoading(false);
                          alert(error);
                        });
                    } else {
                      alert("Fields can not be empty!");
                    }
                  }}
                /> 

                <Button
                title="  Already Signed Up !! "
                type="clear"
                onPress={
                    function(){
                        props.navigation.navigate('SignIn')
                    }
                }
                />

            </Card>
        </ImageBackground>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    textStyle:{
        fontSize: 20,
        color: "skyblue",

    },
    textStyle1:{
        fontSize: 30,
        color: "steelblue",
        fontStyle: "italic",
    },
    viewStyle:{
        flex: 1,
        justifyContent:'center',
    },
        imageStyle: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
})

export default SignupScreen;