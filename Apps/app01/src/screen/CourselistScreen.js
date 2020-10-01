import React from 'react';
import { StyleSheet, Text, View ,FlatList} from 'react-native';

const CourselistScreen = (props) => {
    let course=[]
    const course01=[
        {name: "CSE 4101",key: '01'},
        {name: "SWE 4103",key: '02'},
        {name: "SWE 4147",key: '03'},
        {name: "MATH 4101",key: '04'},
        {name: "HUM 4107",key: '05'},
        {name: "HUM 4133",key: '06'},
    ]

    const course02=[
        {name: "CSE 4201",key: '01'},
        {name: "SWE 4201",key: '02'},
        {name: "SWE 4207",key: '03'},
        {name: "SWE 4243",key: '04'},
        {name: "MATH 4201",key: '05'},        
        {name: "HUM 4233",key: '06'},
    ]

    const course03=[
        {name: "CSE 4301",key: '01'},
        {name: "CSE 4309",key: '02'},
        {name: "SWE 4301",key: '03'},
        {name: "SWE 4307",key: '04'},
        {name: "SWE 4335",key: '05'},        
        {name: "SWE 4367",key: '06'},
    ]

    const course04=[
        {name: "CSE 4409",key: '01'},
        {name: "SWE 4401",key: '02'},
        {name: "SWE 4431",key: '03'},
        {name: "SWE 4447",key: '04'},
        {name: "MATH 4435",key: '05'},        
        {name: "HUM 4427",key: '06'},
    ]

    const semester=props.route.params.semester;

    if(semester == '1st Semester'){
        course=course01;
    }
    else if(semester == '2nd Semester'){
        course=course02;
    }
    else if(semester == '3rd Semester'){
        course=course03;
    }
    else{
        course=course04;
    }

    return(
        <View>
            <Text style={styles.textStyle}>{semester}</Text>
            <FlatList
            data={course}
            renderItem={
                function({item}){
                return <Text style={styles.itemtextStyle}>  {item.key}.   {item.name}</Text>;
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
            marginTop:10,
        },
        itemtextStyle:{
            height:30,
            backgroundColor: 'lightgray',
            fontSize: 20,
            color: 'black',
            marginLeft: 10,
            marginTop:10,
            marginRight: 10,
        }
    }
)

export default CourselistScreen;