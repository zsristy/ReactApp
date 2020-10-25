import React from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

const CardComponent = (props) => {
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
          Sristy
        </Text>
      </View>
      <Text style={{ fontStyle: "italic" }}> Good Morning </Text>
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        Good Morning World.It is a beautiful winter day. And this snow fall is awesome.
      </Text>
      <Card.Divider />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          type="outline"
          title="  Like (17)"
          icon={<AntDesign name="like2" size={24} color="dodgerblue" />}
        />
        <Button type="solid" title="Comment (10)" />
      </View>
    </Card>
  );
};

export default CardComponent;