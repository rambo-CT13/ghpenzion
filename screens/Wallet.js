import React, { useCallback, useMemo, useRef, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { styles } from "../components/Styles";
import { useIsFocused } from "@react-navigation/native";
import {
  BottomSheetModalProvider,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Withdraw from "../components/Withdraw";
import { ProfileContext } from "../services/ContextProvider";

export default function Wallet({ navigation }) {
  const profile = useContext(ProfileContext);
  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
  }
  // ref
  const withdrawModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["50%", "75%", "90%"], []);

  // callbacks

  const withdrawPress = useCallback(() => {
    withdrawModalRef.current?.present();
  }, []);

  return (
    <BottomSheetModalProvider>
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
                  <TouchableOpacity onPress={withdrawPress}>
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
                  onPress={withdrawPress}
                >
                  <Text style={styles.gradBtn}>Withdraw</Text>
                </TouchableOpacity>
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
        {/* Withdraw Modal */}
        <BottomSheetModal
          ref={withdrawModalRef}
          index={1}
          snapPoints={snapPoints}
          style={{ backgroundColor: "#dd4400", borderRadius: 50 }}
        >
          <Withdraw uid={profile?.id} />
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}
