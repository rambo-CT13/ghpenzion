import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import RoundShape from "../components/RoundShape";
import { styles } from "../components/Styles";

export default function About({ navigation }) {
  return (
    <View style={[styles.container, { backgroundColor: "#fff" }]}>
      <RoundShape shapeColor="#fff" />
      <View style={styles.aboutCon}>
        <Text style={styles.aboutHead}>About The app</Text>
        <Text style={styles.aboutText}>
          While the virus is the deadliest for adults 60yrs and over,they are
          particularly vulnerable to unanticipated economic downtowns.Also,with
          covid deaths comprising of majority of the aged,most families did not
          get the financial cushion of a pension payment
        </Text>
        <Text style={styles.aboutHead}>Key Features</Text>
        <View style={styles.featureCon}>
          <View style={styles.aboutFeature}>
            <Text style={styles.aboutFeatureText}>Interactive</Text>
            <Image
              style={styles.featureImage}
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/penzion-1ecd1.appspot.com/o/penzionApp_Pictures%2Fundraw_interaction_design_odgc.png?alt=media&token=764b250c-7349-448c-a12b-6e0a0da1bc57",
              }}
              resizeMode="cover"
            ></Image>
          </View>
          <View style={styles.aboutFeature}>
            <Text style={styles.aboutFeatureText}>Security</Text>
            <Image
              style={styles.featureImage}
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/penzion-1ecd1.appspot.com/o/penzionApp_Pictures%2Fundraw_Security_on_ff2u.png?alt=media&token=a2700be7-c39c-4115-8227-eac69b980d6f",
              }}
              resizeMode="cover"
            ></Image>
          </View>
          <View style={styles.aboutFeature}>
            <Text style={styles.aboutFeatureText}>24/7 Support</Text>
            <Image
              style={styles.featureImage}
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/penzion-1ecd1.appspot.com/o/penzionApp_Pictures%2Fundraw_active_support_6rwo.png?alt=media&token=25e7b0dc-8321-4f7f-9edd-d0cd06928479",
              }}
              resizeMode="cover"
            ></Image>
          </View>
        </View>
      </View>
      <View style={styles.btnCon}>
        <TouchableOpacity
          style={{ width: "48%" }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.logBtn}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: "48%" }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.logBtn}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
