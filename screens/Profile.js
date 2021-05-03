import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { styles } from "../components/Styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import RoundShape from "../components/RoundShape";
import { auth, db } from "../services/Firebase";
import { ProfileContext } from "../services/ContextProvider";

export default function Profile() {
  const [signing, setSigning] = useState(false);
  const profile = useContext(ProfileContext);
  const logOut = () => {
    setSigning(true);
    auth
      .signOut()
      .then()
      .catch(function (error) {
        console.log(error);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <ScrollView style={[styles.container]}>
        <View style={[styles.greyView]}>
          <RoundShape shapeColor="#fff" />
          <Text style={[styles.loginHead]}>My Profile</Text>
          <Image
            style={styles.avatar}
            source={{
              uri: profile?.passPhoto,
            }}
            resizeMode="cover"
          ></Image>
        </View>
        <View style={[styles.penCon]}>
          <Text style={styles.penSub}>Full Name</Text>
          <Text style={styles.penHead}>
            {profile?.lastName +
              " " +
              profile?.firstName +
              " " +
              profile?.otherName}
          </Text>
          <Text style={styles.penSub}>Date of Birth</Text>
          <Text style={styles.penHead}>{profile?.dob}</Text>
          <Text style={styles.penSub}>Telephone No.</Text>
          <Text style={styles.penHead}>{profile?.phone}</Text>
          <Text style={styles.penSub}>Pension Organisation</Text>
          <View style={styles.penOrg}>
            <Image
              style={styles.orgLogo}
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/user-app-6a3a7.appspot.com/o/1519880397906.png?alt=media&token=dceaae9a-4a4c-4f17-8d3c-70df59b98925",
              }}
              resizeMode="cover"
            ></Image>
            <Text style={styles.penHead}>SNNIT</Text>
          </View>
          <Text style={styles.penSub}>ID Type</Text>
          <Text style={[styles.penHead]}>{profile?.idType}</Text>
          <Text style={styles.penSub}>ID No.</Text>
          <Text style={[styles.penHead, { color: "indigo" }]}>
            {profile?.idNumber}
          </Text>
          <Text style={styles.penSub}>Contribution</Text>
          <Text style={[styles.penHead, { color: "red" }]}>
            GHc {profile?.contribution} per Month
          </Text>
          <Text style={styles.penSub}>Status</Text>
          <Text style={[styles.penHead, { color: "#dd4400" }]}>
            {profile?.status ? "Approved" : "Pending Approval"}
          </Text>
          {/* //Logout Button */}
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={logOut}
            style={{ flex: 1 }}
          >
            {signing ? (
              <ActivityIndicator
                color="#dd4400"
                size="large"
                style={{ marginTop: 30 }}
              />
            ) : (
              <Text style={styles.outBtn}>Log Out</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* <TouchableOpacity style={styles.abRight}>
        <Icon
          type="MaterialCommunityIcons "
          name="pencil"
          style={styles.editIcon}
        />
        <Text style={styles.editText}>Update</Text>
      </TouchableOpacity> */}
    </View>
  );
}
