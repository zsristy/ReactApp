import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
    return(<Text style={styles.textStyle}>Home</Text>);
}

const styles = StyleSheet.create(
    {
        textStyle:{
            fontSize: 20,
            color: 'red',
            alignSelf: 'center',
        }
    }
)

export default HomeScreen;