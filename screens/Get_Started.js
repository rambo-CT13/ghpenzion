import React from "react";
import { ImageBackground, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../components/Styles";
import { StatusBar } from "expo-status-bar";

export default function Get_Started({ navigation }) {
  return (
    <View style={[styles.container]}>
      <ImageBackground
        style={styles.getStartedImage}
        source={{
          uri:
            "https://firebasestorage.googleapis.com/v0/b/user-app-6a3a7.appspot.com/o/micheile-henderson-ZVprbBmT8QA-unsplash.jpg?alt=media&token=c6e033f5-a827-4bbd-be7a-d58884eeacc6",
        }}
        resizeMode="cover"
      >
        <View style={styles.getCon}>
          <Text style={styles.getStartedHead}>Consolidated Pensions</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            containerStyle={styles.getBtn}
            onPress={() => navigation.navigate("About")}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <StatusBar style="light" />
    </View>
  );
}
