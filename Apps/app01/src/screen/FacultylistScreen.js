import React from 'react';
import { StyleSheet, Text, View ,FlatList} from 'react-native';

const FacultylistScreenScreen = () => {
    const faculty=[
        {name: "AHK",key: '01'},
        {name: "AAK",key: '02'},
        {name: "FHS",key: '03'},
        {name: "SHA",key: '04'},
        {name: "MI",key: '05'},
        {name: "TA",key: '06'},

    ]

    return(
        <View>
            <FlatList
            data={faculty}
            renderItem={
                function({item}){
                return <Text style={styles.textStyle}>  {item.key}.   {item.name}</Text>;
                }
            }
            />      
        </View>

    );
}
const styles = StyleSheet.create(
    {
       textStyle:{
            height:30,
            backgroundColor: 'lightgray',
            fontSize: 20,
            color: 'black',
            marginLeft: 10,
            marginTop:10,
            marginRight: 10,
            fontWeight: 'bold'
        }
    }
)

export default FacultylistScreenScreen;