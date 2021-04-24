import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RoundShape from "../components/RoundShape";
import { styles } from "../components/Styles";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onRegisterPress = () => {
    if (password) {
      if (password !== confirmPassword) {
        Alert.alert("Passwords don't match.");
        return;
      }
      navigation.navigate("Application Form", {
        email,
        password,
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: "#fff" }]}>
      <KeyboardAwareScrollView>
        <RoundShape shapeColor="#fff" />
        <Text style={[styles.loginHead]}>Sign Up</Text>
        <View style={styles.loginForm}>
          <TextInput
            style={styles.input}
            placeholder="EMAIL"
            keyboardType="email-address"
            placeholderTextColor="#143803"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="PASSWORD"
            secureTextEntry
            placeholderTextColor="#143803"
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TextInput
            style={styles.input}
            placeholder="CONFIRM PASSWORD"
            secureTextEntry
            placeholderTextColor="#143803"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{ flex: 1, marginBottom: 20 }}
          // onPress={onRegisterPress}
          onPress={onRegisterPress}
        >
          <Text style={styles.loginBtn}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{ flex: 1 }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={{ alignSelf: "center", marginBottom: -18 }}>
            Existing Users can Log in
          </Text>
          <Text style={styles.createBtn}>Existing User</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
