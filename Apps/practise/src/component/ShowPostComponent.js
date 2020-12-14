import React, { useState ,useEffect}  from "react";
import { AsyncStorage } from 'react-native';
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import {storeDataJson, mergeData, removeData} from '../function/AsyncstorageFunction';
import { AntDesign } from "@expo/vector-icons";
import * as firebase from "firebase/app";
require('firebase/auth');
import "firebase/firestore";

const ShowPostComponent = (props) => {
  const [Comment, setCommon]=useState(props.title.comments);
  const [Like, setLike]=useState(props.title.likes);
  let like=" ("+props.title.likes+")";
  const comment="Comment";
  
  return (
    <Card>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar
          containerStyle={{ backgroundColor: "#ffab91" }}
          rounded
          icon={{ name: "user", type: "font-awesome", color: "white" }}
          activeOpacity={1}
        />
        <Text h4Style={{ padding: 10 }} h4>
          {props.title.author}
        </Text>
        </View>
        <Text h6Style={{ padding: 10}} h6 style={{alignSelf:"stretch",color:'gray'}}>
          <Text style={{fontWeight:"bold" ,fontStyle:"italic",color:'gray'}}>Posted on: </Text>{new Date(props.title.created_at.toDate()).toDateString()}
        </Text>
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        {props.title.body}
      </Text>
      <Card.Divider />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          type="outline"
          title={like} 
          icon={<AntDesign name="heart" size={24} color="dodgerblue" />}
          onPress={
            async function(){
            const id=Math.ceil(Math.random()*1000000000000000);
            firebase
            .firestore()
            .collection('posts')
            .doc(props.title.postid)
            .collection('likes')
            .add({ 
              lid: "lid#"+id,
              who: props.user.displayName,
              whoid: props.user.uid,
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

            firebase
                  .firestore()
                  .collection("posts")
                  .doc(props.postid)
                  .update({
                    likes: Like+1,
                  })
                  .catch((error) => {
                    //setLoading(false);
                    alert(error);
                  });
                  setLike(Like+1);      
            

                  firebase
                  .firestore()
                  .collection("notifications")
                  .add({
                    userId: props.title.userId,
                    pid: props.postid, 
                    postid: props.title.postid,
                    body: props.title.body,
                    created_at: props.title.created_at,
                    author: props.title.author,
                    likes: Like+1,
                    comments: props.title.comments,
                    from: props.user.displayName,
                    type:'like',
                    time: firebase.firestore.Timestamp.now()
                  })
                  .catch((error) => {
                    //setIsLoading(false);
                    alert(error);
                  });      

            
          }
        }
        />
        <Button type="solid" title={comment} onPress={
            function(){
            props.link.navigate('Comment',{ key :props.postid ,content: props.title });
           }
        }/>

        {/* <Button type="solid" title="Remove" onPress={
          function(){
          console.log(props.postid);
          }
        }/> */}

      </View>
    </Card>
  );
};

export default ShowPostComponent;