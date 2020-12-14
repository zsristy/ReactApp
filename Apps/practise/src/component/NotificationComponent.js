import React from "react";
import { View,TouchableOpacity } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import {getDataJson, getAllindex} from '../function/AsyncstorageFunction';


const NotificationComponent = (props) => {
  let notation;
  let bcolor;
  let nm;
  if(props.title.type=="like"){
      notation="Liked";
      bcolor="dodgerblue";
      nm="heart";
  }
  else{
      notation="Commented to";
      bcolor="#ffab91";
      nm="pencil";
  }
  return (
    <TouchableOpacity onPress={async function(){
      props.link.navigate('Comment',{key: props.title.pid, content: props.title}); 
    }}>
    <Card>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Avatar
        containerStyle={{backgroundColor: bcolor}}
        rounded
        icon={{
          name: nm,
          type: "font-awesome",
          color: "white",
          size:18,
        }}
        activeOpacity={1}
      />
      <Text style={{ paddingHorizontal: 10 }}>
      <Text style={{fontWeight:"bold" ,fontStyle:"italic"}}>{props.title.from} </Text> {notation} Your Post.
      </Text>
    </View>
  </Card>
  </TouchableOpacity>
  );
} 

export default NotificationComponent;
