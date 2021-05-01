import React from "react";
import { View, ActivityIndicator, Image } from "react-native";
import { styles } from "./Styles";

const Loading = () => {
  return (
    <View style={styles.loadCon}>
      <Image
        style={styles.loadPic}
        source={require("../assets/penzion.png")}
        resizeMode="cover"
      ></Image>
      <ActivityIndicator
        color="#dd440090"
        size="large"
        style={{ marginTop: 15 }}
      />
    </View>
  );
};

export default Loading;
