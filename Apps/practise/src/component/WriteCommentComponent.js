import React,{useReducer, useState} from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";
import {storeDataJson, mergeData} from '../function/AsyncstorageFunction';
import { Entypo } from "@expo/vector-icons";
import * as firebase from "firebase/app";
require('firebase/auth');
import "firebase/firestore";

const WriteCommentComponent = (props) => {
    const [Commentno, setCommentno]=useState(props.postcontent.comments);
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
         {props.postcontent.author} 
        </Text>
      </View>
      <Text h6Style={{ padding: 10 }} h6 style={{alignSelf:"stretch", color:'gray'}}>
      <Text style={{fontWeight:"bold" ,fontStyle:"italic",color:'gray'}}>Posted on: </Text>{new Date(props.postcontent.created_at.toDate()).toDateString()}
        </Text>
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        {props.postcontent.body}
      </Text>
      <Text h6Style={{ padding: 10 }} h6 style={{color:'gray'}}>
      <Text style={{fontWeight:"bold" ,fontStyle:"italic",color:'gray'}}>Likes: </Text>{props.postcontent.likes} 
      <Text style={{fontWeight:"bold" ,fontStyle:"italic",color:'gray'}}> , Comments: </Text>{Commentno}
        </Text>
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
        async function(){
            if(Comment.size!=0){
              const id=Math.ceil(Math.random()*1000000000000000);
              firebase
              .firestore()
              .collection('posts')
              .doc(props.postcontent.postid)
              .collection('comments')
              .add({ 
                cid: "cid#"+id,
                who: props.user.displayName,
                whoid: props.user.uid,
                body: Comment,
                when: firebase.firestore.Timestamp.now()
              })
              .then(() => {
                  //setLoading(false);
                  console.log("Post created Successfully!");
              })
              .catch((error) => {
                  //setLoading(false);
                  console.log(error);
              });

              setComment("");
              input.current.clear(); 

            firebase
            .firestore()
            .collection("posts")
            .doc(props.pid)
            .update({
              comments: Commentno+1,
            })
            .catch((error) => {
              //setLoading(false);
              alert(error);
            });
            setCommentno(Commentno+1);
              
            }else{
            alert("Must enter any character");
            }   

                            firebase
                            .firestore()
                            .collection("notifications")
                            .add({
                              userId: props.postcontent.userId,
                              pid: props.pid, 
                              postid: props.postcontent.postid,
                              body: props.postcontent.body,
                              created_at: props.postcontent.created_at,
                              author: props.postcontent.author,
                              likes: props.postcontent.likes,
                              comments: Commentno+1,
                              from: props.user.displayName,
                              type:'comment',
                              time: firebase.firestore.Timestamp.now()
                            })
                            .catch((error) => {
                              //setIsLoading(false);
                              alert(error);
                            });
        
        }
    } />
    </View>
    </View>
  </Card>
  );
};

export default WriteCommentComponent;