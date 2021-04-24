import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { styles } from "./Styles";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Withdraw() {
  const [network, setNetwork] = useState("");
  return (
    <View style={styles.contentContainer}>
      <ScrollView style={styles.sectionP}>
        <Text style={styles.modalHead}>Withdraw</Text>
        <Text style={styles.modalLabel}>Amount</Text>
        <TextInput
          style={styles.modalInput}
          placeholder="10"
          placeholderTextColor="#666"
          keyboardType="numeric"
        />
        <Text style={styles.formLabel}>Select Network</Text>
        <View style={styles.pickerInput}>
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
          placeholder="0248879654"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
        />
        <TouchableOpacity>
          <Text style={styles.modalBtn}>Withdraw</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
