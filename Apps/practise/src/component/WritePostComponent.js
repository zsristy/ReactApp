import React,{useReducer, useState} from "react";
import { Card, Button, Text, Avatar,   Input } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import * as firebase from "firebase/app";
require('firebase/auth');
import "firebase/firestore";


const WritePostComponent = (props) => {
    const [Post, setPost]=useState("");
    const input = React.createRef();

  return (
    <Card>
    <Input
        ref={input}
        placeholder="What's On Your Mind?"
        leftIcon={<Entypo name="pencil" size={24} color="gray" />}
        onChangeText={
        function(currentinput){
                setPost(currentinput);
        }
    }
    />
    <Button title="Post" type="outline" onPress={
        function(){
            if(Post.size!=0){
                const id=Math.ceil(Math.random()*1000000000000000);
                //setLoading(true);
                firebase
                  .firestore()
                  .collection("posts")
                  .add({
                    postid: "pid#"+id,
                    userId: props.user.uid,
                    body: Post,
                    author: props.user.displayName,
                    created_at: firebase.firestore.Timestamp.now(),
                    likes: 0,
                    comments: 0,
                  })
                  .then((docRef) => {
                    //setLoading(false);
                    alert("Post created Successfully! Post ID: "+ docRef.id);
                  })
                  .catch((error) => {
                    //setLoading(false);
                    alert(error);
                  });
                // console.log(props.user.uid);
                // console.log(props.user.displayName)
            }else{
            alert("Must enter any character");
            }
        setPost("");
        input.current.clear(); 
        }
    } />
  </Card>
  );
};

export default WritePostComponent;