import React from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import * as firebase from "firebase/app";
require('firebase/auth');
import "firebase/firestore";

const ShowCommentComponent = (props) => {
  return (
    <Card>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text h4Style={{ padding: 10 }} h4>
          {props.title.who}
        </Text>
        <Text h6Style={{ padding: 10}} h6 style={{alignSelf:"flex-end", color:'gray'}}>
        {new Date(props.title.when.toDate()).toDateString()}
        </Text>
        </View>
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        {props.title.body}
      </Text>
    </Card>
  );
};

export default ShowCommentComponent;