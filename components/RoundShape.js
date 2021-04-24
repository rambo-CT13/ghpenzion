import React from "react";
import { View, Text } from "react-native";
import { styles } from "./Styles";

export default function RoundShape({ shapeColor }) {
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <View style={styles.shapeCon}>
        <View
          style={[styles.roundShape, { backgroundColor: shapeColor }]}
        ></View>
      </View>
    </View>
  );
}
