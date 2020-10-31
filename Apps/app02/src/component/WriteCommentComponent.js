import React,{useReducer, useState} from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";
import {storeDataJson} from '../function/AsyncstorageFunction';
import { Entypo } from "@expo/vector-icons";


const WriteCommentComponent = (props) => {
    
    const [Comment, setComment]=useState("");
    const input = React.createRef();
    let today = new Date().toLocaleDateString();
    let currenttime = new Date().toLocaleTimeString();

  return (
    <Card>
    <View style={{flexDirection: "row",alignItems: "center"}}>
        <Avatar
          containerStyle={{ backgroundColor: "#ffab91" }}
          rounded
          icon={{ name: "user", type: "font-awesome", color: "white" }}
          activeOpacity={1}
        />
        <Text h4Style={{ padding: 10 }} h4>
         {props.postcontent.uname} 
        </Text>
      </View>
      <Text h6Style={{ padding: 10 }} h6 style={{alignSelf:"stretch", color:'gray'}}>
      <Text style={{fontWeight:"bold" ,fontStyle:"italic",color:'gray'}}>Posted at: </Text>{props.postcontent.time}, {props.postcontent.date}
        </Text>
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        {props.postcontent.post}
      </Text>
      <Card.Divider />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Button
          type="solid"
          title="Checking"
          onPress={
            function(){
                  console.log(props.postcontent)
            }
          } 
          />
      </View>
    <Card.Divider />
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <View style={{width:"75%"}}>
    <Input

        ref={input}
        placeholder="Write Something"
        leftIcon={<Entypo name="pencil" size={24} color="gray" />}
        onChangeText={
        function(currentinput){
                setComment(currentinput);
        }
    }
    />
    </View>
    <View style={{width:"25%",justifyContent: "center",marginBottom:20}}>
    <Button title="Comment" type="solid" onPress={
        function(){
            if(Comment.size!=0){
            const id=Math.ceil(Math.random()*1000000000000000);
            let newcomment = {
                pid: props.postcontent.pid,
                cid: "cid#"+id,
                comment: Comment,
                uname: props.user.name,
                date: today,
                time: currenttime,
            }
            storeDataJson("cid#"+id, newcomment);
            console.log(newcomment);
            }else{
            alert("Must enter any character");
            }
        setComment("");
        input.current.clear(); 
        }
    } />
    </View>
    </View>
  </Card>
  );
};

export default WriteCommentComponent;