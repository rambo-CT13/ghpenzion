import React, { useContext } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { styles } from "../components/Styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext, ProfileContext } from "../services/ContextProvider";

export default function Home() {
  const user = useContext(AuthContext);
  const profile = useContext(ProfileContext);

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
              <Text style={styles.totalPen}>GHc 20,561</Text>
              <Text style={styles.greetSub2}>as @ 20/2/2021</Text>
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
          <View style={styles.recentCard}>
            <Icon
              type="MaterialCommunityIcons "
              name="arrow-bottom-right-bold-outline"
              style={styles.topUpIcon}
            />
            <View style={styles.recentTitle}>
              <Text style={styles.recentTitleText}>Wallet Top Up</Text>
              <Text style={{ fontSize: 12 }}>Momo Payment</Text>
            </View>
            <View style={styles.recentAmount}>
              <Text style={styles.recentTitleText2}>+Ghc 100.00</Text>
              <Text style={{ fontSize: 12, alignSelf: "flex-end" }}>
                30/2/21
              </Text>
            </View>
          </View>
          <View style={styles.recentCard}>
            <Icon
              type="MaterialCommunityIcons "
              name="arrow-bottom-right-bold-outline"
              style={styles.topUpIcon}
            />
            <View style={styles.recentTitle}>
              <Text style={styles.recentTitleText}>Wallet Top Up</Text>
              <Text style={{ fontSize: 12 }}>Momo Payment</Text>
            </View>
            <View style={styles.recentAmount}>
              <Text style={styles.recentTitleText2}>+Ghc 20.00</Text>
              <Text style={{ fontSize: 12, alignSelf: "flex-end" }}>
                3/3/21
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
