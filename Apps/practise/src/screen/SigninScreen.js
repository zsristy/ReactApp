import React, {useState} from 'react';
import {ImageBackground,Text,SafeAreaView, StyleSheet} from 'react-native';
import {Input, Button, Card} from 'react-native-elements';
import { Fontisto, Feather, FontAwesome  } from '@expo/vector-icons';
import {AuthContext} from '../provider/AuthProvider';
import * as firebase from "firebase/app";
require('firebase/auth');
import "firebase/firestore";

const SigninScreen=(props)=>{
    const [Email, setEmail]=useState("");
    const [Password, setPassword]=useState("");

    return(
        <AuthContext.Consumer>
        {(auth)=>(
        <SafeAreaView style={styles.viewStyle}>
            <ImageBackground source={require('./../../assets/05.jpg')} style={styles.imageStyle}>
            <Card>
                <Card.Title style={styles.textStyle}>Welcome to <Text style={styles.textStyle1}>The Office</Text></Card.Title>
                <Card.Divider/>
                <Input 
                leftIcon={<Fontisto name="email" size={24} color="gray" />}
                placeholder='Email'
                onChangeText={
                    function(currentinput){
                        setEmail(currentinput);
                    }
                }></Input>
                <Input 
                leftIcon={<Feather name="key" size={24} color="gray" />}
                placeholder='Password' 
                secureTextEntry={true}
                onChangeText={
                    function(currentinput){
                        setPassword(currentinput);
                    }
                }></Input>
                <Button
                icon={<FontAwesome name="sign-in" size={24} color="white" />}
                title="  Sign In"
                type="solid"
                onPress={async() => {
                    //setIsLoading(true);
                    firebase
                      .auth()
                      .signInWithEmailAndPassword(Email, Password)
                      .then((userCreds) => {
                        //setIsLoading(false);
                        auth.setIsloggedIn(true);
                        auth.setCurrentUser(userCreds.user);
                      })
                      .catch((error) => {
                        //setIsLoading(false);
                        alert(error);
                      });
                  }}
                /> 
                <Button
                title="  Haven't Signed Up !!"
                type="clear"
                onPress={
                    function(){
                        props.navigation.navigate('SignUp')
                    }                    
                }
                />

            </Card>
        </ImageBackground>
        </SafeAreaView>
        )}
        </AuthContext.Consumer>
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

export default SigninScreen;