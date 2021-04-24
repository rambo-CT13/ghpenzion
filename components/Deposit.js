import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "./Styles";
import { PayWithFlutterwave } from "flutterwave-react-native";
import uuid from "react-native-uuid";
import RoundShape from "../components/RoundShape";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { db } from "../services/Firebase";

export default function Deposit() {
  const transactionID = uuid.v4();
  const [amount, setAmount] = useState("");
  const payAmount = parseInt(amount);
  const [topping, setTopping] = useState(false);

  function topUp() {
    db.collection("users").doc(uid).update({ wallet: amount });
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={[styles.container]}>
        <View style={[styles.greyView]}>
          <RoundShape shapeColor="#fff" />
          <Text style={[styles.loginHead]}>Wallet Top Up</Text>
          <View style={styles.contentContainer}>
            <ScrollView style={styles.sectionP}>
              <Text style={styles.modalHead}>Top Up Wallet</Text>
              <Text style={styles.modalLabel}>Amount</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="10"
                placeholderTextColor="#666"
                keyboardType="numeric"
                onChangeText={(text) => setAmount(text)}
                value={amount}
              />

              <PayWithFlutterwave
                onRedirect={(res) => {
                  const status = res.status;
                  if (status === "successful") {
                    Alert.alert(
                      `Your Transaction with ID ${res.transaction_id} was Successful`
                    );
                  } else {
                    return Alert.alert("Something Went Wrong");
                  }
                }}
                options={{
                  tx_ref: transactionID,
                  authorization:
                    "FLWPUBK_TEST-a232cbe6c1595c2d05c81e28624a905d-X",
                  customer: {
                    email: "customer-email@example.com",
                  },
                  amount: payAmount,
                  currency: "GHS",
                  payment_options: "card",
                }}
                customButton={(props) => (
                  <TouchableOpacity
                    onPress={props.onPress}
                    isBusy={props.isInitializing}
                    disabled={false}
                  >
                    <Text style={styles.modalBtn}>
                      Top Up {amount && "GHc " + amount}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </ScrollView>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
