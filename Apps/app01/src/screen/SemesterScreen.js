import React from 'react';
import { View } from 'react-native';
import SemesterComponent from '../component/SemesterComponent';

const SemesterScreen = (props) => {
    return(
        <View>
            <SemesterComponent title='1st Semester' link={props.navigation}/>
            <SemesterComponent title='2nd Semester' link={props.navigation}/>
            <SemesterComponent title='3rd Semester' link={props.navigation}/>
            <SemesterComponent title='4th Semester' link={props.navigation}/>       
        </View>

    );
}

export default SemesterScreen;