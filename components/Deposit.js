import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Button,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "./Styles";
import { PayWithFlutterwave } from "flutterwave-react-native";
import uuid from "react-native-uuid";
import RoundShape from "../components/RoundShape";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { db } from "../services/Firebase";
import { ProfileContext } from "../services/ContextProvider";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function Deposit({ navigation }) {
  const profile = useContext(ProfileContext);
  const transactionID = uuid.v4();
  const [amount, setAmount] = useState("");
  const payAmount = parseInt(amount);
  const [topping, setTopping] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isWrongVisible, setIsWrongVisible] = useState(false);
  const uid = profile?.id;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleWrongModal = () => {
    setIsWrongVisible(!isWrongVisible);
  };

  function record() {
    db.collection("Transactions")
      .add({
        time: new Date(),
        amount,
        user: uid,
        type: "Top Up",
        method: "Mobile Money",
      })
      .then(() => setModalVisible(true))
      .catch((err) => Alert.alert(err.message));
  }

  function addToWallet() {
    db.collection("users")
      .doc(uid)
      .update({ wallet: parseInt(profile?.wallet) + parseInt(amount) })
      .then(() => {
        record();
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
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
                  setTopping(false);
                  const status = res.status;
                  if (status === "successful") {
                    addToWallet();
                  } else {
                    setIsWrongVisible(true);
                  }
                }}
                options={{
                  tx_ref: transactionID,
                  authorization:
                    "FLWPUBK_TEST-a232cbe6c1595c2d05c81e28624a905d-X",
                  customer: {
                    email: profile?.email,
                  },
                  amount: payAmount,
                  currency: "GHS",
                  payment_options: "card",
                }}
                customButton={(props) =>
                  topping ? (
                    <ActivityIndicator
                      color="#dd4400"
                      size="large"
                      style={{ marginTop: 30 }}
                    />
                  ) : (
                    <TouchableOpacity
                      onPress={props.onPress}
                      isBusy={props.isInitializing}
                      disabled={false}
                    >
                      <Text style={styles.modalBtn}>
                        Top Up {amount && "GHc " + amount}
                      </Text>
                    </TouchableOpacity>
                  )
                }
              />
            </ScrollView>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalSuccess}>
          <Icon name="check-circle" color="green" style={styles.modalIcon} />
          <Text style={styles.modalText}>Transaction Succesfull</Text>
          <Button
            title="Check Your Wallet"
            onPress={() => navigation.goBack()}
            color="#dd4400"
          />
        </View>
      </Modal>
      <Modal isVisible={isWrongVisible}>
        <View style={styles.modalSuccess}>
          <Icon name="times-circle" color="red" style={styles.modalIcon} />
          <Text style={styles.modalText}>Sorry Something Went Wrong</Text>
          <Button
            title="Try Again"
            onPress={toggleWrongModal}
            color="#dd4400"
          />
          <Text>Or</Text>
          <Button
            title="Go to Wallet"
            onPress={() => navigation.goBack()}
            color="green"
          />
        </View>
      </Modal>
    </View>
  );
}
