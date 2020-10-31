import React from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

const ShowPostComponent = (props) => {
  const like=" (10)";
  const comment=" Comment (7)";
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
          {props.title.uname}
        </Text>
        </View>
        <Text h6Style={{ padding: 10}} h6 style={{alignSelf:"stretch",color:'gray'}}>
          <Text style={{fontWeight:"bold" ,fontStyle:"italic",color:'gray'}}>Posted at: </Text>{props.title.time}, {props.title.date}
        </Text>
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        {props.title.post}
      </Text>
      <Card.Divider />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          type="outline"
          title={like}
          icon={<AntDesign name="heart" size={24} color="dodgerblue" />}
        />
        <Button type="solid" title={comment} onPress={
          function(){
            props.link.navigate('Comment',{content: props.title});
    }
        }/>
      </View>
    </Card>
  );
};

export default ShowPostComponent;