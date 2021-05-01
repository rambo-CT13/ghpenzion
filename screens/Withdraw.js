import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from "react-native";

import { styles } from "../components/Styles";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { db } from "../services/Firebase";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import RoundShape from "../components/RoundShape";
import { ProfileContext } from "../services/ContextProvider";

export default function Withdraw({ navigation }) {
  const profile = useContext(ProfileContext);
  const [network, setNetwork] = useState("");
  const [amount, setAmount] = useState("");
  const [number, setNumber] = useState("");
  const [signing, setSigning] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isWrongVisible, setIsWrongVisible] = useState(false);
  const uid = profile?.id;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleWrongModal = () => {
    setIsWrongVisible(!isWrongVisible);
  };

  const onWithdraw = () => {
    setSigning(true);
    db.collection("Transactions")
      .doc()
      .set({
        network,
        amount,
        number,
        time: new Date(),
        user: uid,
        type: "withdrawal Request",
      })
      .then((res) => {
        setModalVisible(true);
      })
      .catch((err) => {
        toggleWrongModal();
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={[styles.container]}>
        <View style={[styles.greyView]}>
          <RoundShape shapeColor="#fff" />
          <Text style={[styles.loginHead]}>Withdraw</Text>

          <View style={{ padding: 20 }}>
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
                <Picker.Item label="Choose Network" value="." />
                <Picker.Item label="Vodafone Gh" value="Vodafone" />
                <Picker.Item label="Airtel/Tigo" value="Airtel/Tigo" />
                <Picker.Item label="MTN Gh" value="MTN" />
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
              <TouchableOpacity onPress={onWithdraw}>
                <Text style={styles.modalBtn}>Withdraw</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalSuccess}>
          <Icon name="check-circle" color="green" style={styles.modalIcon} />
          <Text style={styles.modalText}>Withdrawal Request Succesfull</Text>
          <Text style={styles.modalText}>
            Withdrawal request can take maximum 24hrs before it sent to your
            preferred mobile money Account.
          </Text>
          <Button
            title="Done"
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
      <TouchableOpacity
        style={{ position: "absolute", top: 65 }}
        onPress={() => navigation.goBack()}
      >
        <Icon
          type="MaterialCommunityIcons "
          name="arrow-left"
          style={{
            color: "#fff",
            backgroundColor: "#dd4400",
            padding: 10,
            borderRadius: 100,
            fontSize: 24,
            borderColor: "#fff",
            borderWidth: 0.8,
            left: 15,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
