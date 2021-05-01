import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { styles } from "../components/Styles";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  ProfileContext,
  TransactionContext,
} from "../services/ContextProvider";

export default function Wallet({ navigation }) {
  const profile = useContext(ProfileContext);
  const transactions = useContext(TransactionContext);
  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
  }

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="dark-content" />
      <ScrollView style={styles.container}>
        <View style={styles.plainView}>
          <Text
            style={[
              styles.loginHead,
              { color: "#333", marginTop: 0, alignSelf: "flex-start" },
            ]}
          >
            My Wallet
          </Text>
          <View style={styles.gradView}>
            <View style={styles.balCon}>
              <Text style={styles.balText}>Your Balance</Text>
              <View style={styles.flexRow}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Withdraw")}
                >
                  <Icon
                    type="MaterialCommunityIcons "
                    name="minus"
                    style={styles.gradIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Deposit")}
                >
                  <Icon
                    type="MaterialCommunityIcons "
                    name="plus"
                    style={styles.gradIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.flexRow}>
              <Text style={styles.totalWallet}>
                {profile?.wallet ? profile?.wallet + ".00" : "0.00"}
              </Text>
              <Text style={styles.ghc}>GHC</Text>
            </View>

            <View style={styles.gradBtnCon}>
              <TouchableOpacity
                style={{ width: "48%" }}
                onPress={() => navigation.navigate("Deposit")}
              >
                <Text style={styles.gradBtn}>Top Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: "48%" }}
                onPress={() => navigation.navigate("Withdraw")}
              >
                <Text style={styles.gradBtn}>Withdraw</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={styles.recentText}>Recent Activity</Text>
        <View style={styles.section}>
          {transactions.map((item, index) => {
            if (item.user == profile.id) {
              return (
                <View style={styles.recentCard} key={index}>
                  <Icon
                    type="MaterialCommunityIcons "
                    name={
                      item.type === "Wallet Top Up"
                        ? "arrow-bottom-right-bold-outline"
                        : "arrow-top-left-bold-outline"
                    }
                    style={[
                      styles.topUpIcon,
                      { color: item.type === "Wallet Top Up" && "#dd4400" },
                    ]}
                  />
                  <View style={styles.recentTitle}>
                    <Text style={styles.recentTitleText}>{item.type}</Text>
                    <Text style={{ fontSize: 12 }}>Mobile Payment</Text>
                  </View>
                  <View style={styles.recentAmount}>
                    <Text style={styles.recentTitleText2}>
                      {item.type === "Wallet Top Up" ? "+" : "-"}Ghc{" "}
                      {item.amount}
                    </Text>
                    <Text style={{ fontSize: 12, alignSelf: "flex-end" }}>
                      {item.time.toDate().toDateString()}
                    </Text>
                  </View>
                </View>
              );
            }
          })}
        </View>
      </ScrollView>
    </View>
  );
}
