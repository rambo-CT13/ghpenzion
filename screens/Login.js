import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RoundShape from "../components/RoundShape";
import { styles } from "../components/Styles";
import { auth, db } from "../services/Firebase";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [logging, setlogging] = useState(false);

  const onLoginPress = () => {
    setlogging(true),
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const uid = userCredential.user.uid;
          const usersRef = db.collection("users");
          usersRef
            .doc(uid)
            .get()
            .then((firestoreDocument) => {
              if (!firestoreDocument.exists) {
                console.log("User does not exist anymore.");
                setlogging(false);
              }
              setlogging(false);
              // navigation.navigate("Pension");
            })
            .catch((error) => {
              setlogging(false);
              Alert.alert(error.message);
            });
        })
        .catch((error) => {
          setlogging(false);
          Alert.alert(error.message);
        });
  };

  return (
    <View style={[styles.container, { backgroundColor: "#fff" }]}>
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <RoundShape shapeColor="#fff" />
        <Text style={[styles.loginHead]}>Login</Text>
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
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{ flex: 1, marginBottom: 20 }}
          onPress={onLoginPress}
        >
          {logging ? (
            <ActivityIndicator
              color="#dd4400"
              size="large"
              style={{ marginTop: 30 }}
            />
          ) : (
            <Text style={styles.loginBtn}>Login</Text>
          )}
        </TouchableOpacity>
        <View
          style={{
            marginTop: 40,
            alignSelf: "center",
            flexDirection: "row",
          }}
        >
          <Text>Not a member?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text
              style={{
                color: "#dd4400",
                marginHorizontal: 5,
                fontWeight: "bold",
              }}
            >
              Register Now
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
