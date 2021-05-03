import React, { useContext } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { styles } from "../components/Styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  TransactionContext,
  ProfileContext,
} from "../services/ContextProvider";

export default function Home() {
  const profile = useContext(ProfileContext);
  const transactions = useContext(TransactionContext);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.greenView}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 10,
            }}
          >
            <View style={{ width: "75%" }}>
              <Text style={styles.greeting}>Hello {profile?.firstName},</Text>
              <Text style={styles.greetSub}>
                Here's a summary of your pension.
              </Text>
            </View>
            <Image
              style={styles.avatarHome}
              source={{
                uri: profile?.passPhoto,
              }}
              resizeMode="cover"
            ></Image>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
            }}
          >
            <View style={styles.sumView}>
              <Text style={styles.greetSub2}>Total Contributions</Text>
              <Text style={styles.totalPen}>GHc 0.00</Text>
              <Text style={styles.greetSub2}>as @ 07/05/2021</Text>
            </View>

            <View style={styles.walletView}>
              <Icon
                type="MaterialCommunityIcons "
                name="wallet"
                style={styles.walletIcon}
              />
              <Text style={{ fontSize: 12, color: "#333" }}>My Wallet</Text>
              <Text style={styles.walletAmount}>GHc {profile?.wallet}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.recentText}>Recent Activity</Text>
        <View style={styles.section}>
          {transactions ? (
            transactions.map((item, index) => {
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
            })
          ) : (
            <Text style={{ alignSelf: "center", marginVertical: 30 }}>
              You have no recent activities
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
