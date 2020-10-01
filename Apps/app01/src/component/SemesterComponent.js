import React from 'react';
import { StyleSheet, View , Text,TouchableOpacity} from 'react-native';

const SemesterComponent = (props) => {
    return(
        <View>
            <TouchableOpacity style={styles.touchableStyle}
            onPress={
                function(){
                        props.link.navigate('Course List',{semester: props.title});
                }
            }>
            <Text style={styles.touchabletextStyle}>{props.title}</Text>      
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        touchableStyle:{ 
            marginTop: 20,
            height: 40,           
            width: 200,
            backgroundColor: 'gray',
            alignSelf: 'center',
        },
        touchabletextStyle:{
            marginTop: 5,
            fontSize: 20,
            color: 'white',
            fontWeight: 'bold',
            alignSelf: 'center',
        },
    }
)

export default SemesterComponent;