import React from 'react';
import { StyleSheet, Text, View ,Image,TouchableOpacity,Button} from 'react-native';

const HomeScreen = (props) => {
    return(
        <View>
            <Image style={styles.imageStyle} source={require('./../../assets/Iut.png')}/>
            <Text style={styles.textStyle}>Department of CSE</Text>
            <Text style={styles.textStyle}>Programme: SWE</Text>
            <TouchableOpacity style={styles.touchableStyle}
            onPress={
                function(){
                        props.navigation.navigate('Profile');
                }
            }>
            <Text style={styles.touchabletextStyle}>My Profile</Text>      
            </TouchableOpacity>
            <Button
            title='Semesterwise Course List'
            color='skyblue'
            />
            <Button
            title='List of Faculty Member'
            color='steelblue'
            onPress={
                function(){
                        props.navigation.navigate('Faculty List');
                }
            }
            />
        </View>
    );
}

const styles = StyleSheet.create(
    {
       textStyle:{
            fontSize: 20,
            color: 'black',
            alignSelf: 'center',
            fontWeight: 'bold',
        },

        imageStyle:{
            height: 170,
            width: 100,
            alignSelf: 'center',
            marginTop: 100,
            marginBottom: 30,
        },

        touchableStyle:{ 
            marginTop:100,
            marginBottom: 40,
            height: 40,           
            width: 200,
            backgroundColor: 'yellow',
            alignSelf: 'center',
        },
        touchabletextStyle:{
            marginTop: 5,
            fontSize: 20,
            color: 'black',
            alignSelf: 'center',
        },
    }
)

export default HomeScreen;