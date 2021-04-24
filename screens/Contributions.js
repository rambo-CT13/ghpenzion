import React from "react";
import { View, Text } from "react-native";
import GreenShape from "../components/GreenShape";
import { styles } from "../components/Styles";

export default function Contributions() {
  return (
    <View style={styles.container}>
      <GreenShape />
      <Text style={styles.loginHead}>Contributions</Text>
    </View>
  );
}
