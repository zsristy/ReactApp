import React, { useState } from "react";
import { ImageBackground,View, ScrollView, StyleSheet, AsyncStorage,Image } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from "../provider/AuthProvider";
const ProfileScreen = (props) => {
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
            centerComponent={{ text: "The Office", style: { color: "#fff",fontSize: 20 } }}
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: function () {
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              },
            }}
          />
          <ImageBackground source={require('./../../assets/08.jpg')} style={styles.imageStyle}>
            <Card >
            <Image style={styles.imageStyle1} source={require('./../../assets/profile.png')}/>
            <Text style={styles.textStyle2}>  Name  </Text>  
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginBottom: 40 }}>
            <Button
              type="solid"
              title=" Edit Account "
              icon={<FontAwesome5 name="user-edit" size={24} color="white" />}
            />
            <Button 
              type="solid" 
              title=" Delete Account "
              icon={<FontAwesome5 name="user-times" size={24} color="white" />}
              />
            </View>         
            <Text style={styles.textStyle1}>  Born On : </Text>
            <Text style={styles.textStyle1}>  Lives At : </Text>
            <Text style={styles.textStyle1}>  Works At : </Text> 
            <Text style={styles.textStyle1}>  </Text>       
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
  fontSize: 20,
  color: 'black',
  marginLeft: 10,
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
  height: 200,
  width: 160,
  alignSelf: 'center',
  marginTop: 120,
},
});

export default ProfileScreen;