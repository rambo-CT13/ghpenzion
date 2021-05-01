import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

import { styles } from "./Styles";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { db } from "../services/Firebase";

export default function Withdraw({ uid }) {
  const [network, setNetwork] = useState("");
  const [amount, setAmount] = useState("");
  const [number, setNumber] = useState("");
  const [signing, setSigning] = useState(false);

  const onWithdraw = () => {
    setSigning(true);
    db.collection("Withdrawals")
      .doc()
      .set({
        network,
        amount,
        number,
        time: new Date(),
        id: uid,
      })
      .then((res) => {
        Alert.alert("Success");
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  };

  return (
    <View style={styles.contentContainer}>
      <KeyboardAwareScrollView style={styles.sectionP}>
        <Text style={styles.modalHead}>Withdraw</Text>
        <Text style={styles.modalLabel}>Amount</Text>
        <TextInput
          style={styles.modalInput}
          placeholder="10"
          placeholderTextColor="#666"
          keyboardType="numeric"
          onChangeText={(text) => setAmount(text)}
          value={amount}
        />
        <Text style={styles.formLabel}>Select Network</Text>
        <View style={styles.pickerInput2}>
          <Picker
            style={{ color: "#777" }}
            selectedValue={network}
            onValueChange={(itemValue, itemIndex) => setNetwork(itemValue)}
          >
            <Picker.Item label="MTN GH" value="MTN" />
            <Picker.Item label="Vodafone Gh" value="Vodafone" />
            <Picker.Item label="Airtel/Tigo" value="Airtel/Tigo" />
            <Picker.Item label="G-Money" value="G-Money" />
          </Picker>
        </View>
        <Text style={styles.modalLabel}>Phone Number</Text>
        <TextInput
          style={styles.modalInput}
          placeholder="Phone Number"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          onChangeText={(text) => setNumber(text)}
          value={number}
        />
        {signing ? (
          <ActivityIndicator
            color="#dd4400"
            size="large"
            style={{ marginTop: 30 }}
          />
        ) : (
          <TouchableOpacity onPress={() => onWithdraw}>
            <Text style={styles.modalBtn}>Withdraw</Text>
          </TouchableOpacity>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}
