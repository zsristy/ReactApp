import React from 'react';
import { StyleSheet, Text, View ,Image} from 'react-native';

const ProfileScreen = () => {
    const name= "Zannatun Naim Sristy";
    const sid= "170042043";
    const roomno= "104, Female hall";
    const email= "zannatunsristy@gmail.com";

    return(
        <View>
            <Image style={styles.imageStyle} source={require('./../../assets/profile.png')}/>
            <Text style={styles.textStyle}>  Name : {name}</Text>
            <Text style={styles.textStyle}>  Student ID : {sid}</Text>
            <Text style={styles.textStyle}>  Room no : {roomno}</Text>
            <Text style={styles.textStyle}>  Student ID : {email}</Text>        
        </View>

    );
}
const styles = StyleSheet.create(
    {
       textStyle:{
            backgroundColor: 'lightgray',
            fontSize: 20,
            color: 'black',
            marginLeft: 10,
            marginRight: 10,
            marginTop:10,
            fontWeight: 'bold',
        },
        imageStyle:{
            height: 200,
            width: 160,
            alignSelf: 'center',
            marginTop: 140,
            marginBottom: 30,
        },
    }
)

export default ProfileScreen;