import React, { useState, useContext } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Loading from "../components/Loading";
import { styles } from "../components/Styles";
import { ProfileContext } from "../services/ContextProvider";

export default function Pension() {
  const [show, setShow] = useState(false);
  const [sort, setSort] = useState(false);
  const profile = useContext(ProfileContext);
  if (profile) {
    return (
      <View style={[styles.container, { backgroundColor: "#fff" }]}>
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
                <Text style={styles.greetSub} numberOfLines={1}>
                  Here's the details of your pension plan.
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
            <View style={[styles.whiteView]}>
              <Text style={styles.penLabel}>Organization</Text>
              <View style={styles.penOrg}>
                <Image
                  style={styles.orgLogo}
                  source={{
                    uri:
                      "https://firebasestorage.googleapis.com/v0/b/user-app-6a3a7.appspot.com/o/1519880397906.png?alt=media&token=dceaae9a-4a4c-4f17-8d3c-70df59b98925",
                  }}
                  resizeMode="cover"
                ></Image>
                <Text style={styles.penHead} numberOfLines={1}>
                  Social Security and National Insurance Trust
                </Text>
              </View>
              <Text style={styles.penLabel}>SSNIT ID</Text>
              <Text style={styles.penHead}>
                {profile?.SnnitNumber ? SnnitNumber : "Not Available Yet"}
              </Text>
              <Text style={styles.penLabel}>Reference Number</Text>
              <Text style={styles.penHead}>
                {profile?.id ? profile?.id : "Not Available"}
              </Text>
              {show ? (
                <View>
                  <Text style={styles.penLabel}>Contribution</Text>
                  <Text style={styles.penHead}>
                    Ghc {profile?.contribution}
                  </Text>

                  <Text style={styles.penLabel}>Pension Status</Text>
                  <Text style={styles.penHead}>
                    {profile?.status ? "Approved" : "Pending Approval"}
                  </Text>
                </View>
              ) : null}

              <TouchableOpacity
                style={styles.moreOpacity}
                onPress={() => setShow(!show)}
              >
                {show ? (
                  <Icon
                    type="MaterialCommunityIcons "
                    name="chevron-up"
                    style={styles.moreIcon}
                  />
                ) : (
                  <Icon
                    type="MaterialCommunityIcons "
                    name="chevron-down"
                    style={styles.moreIcon}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.activityRow}>
            <Text style={styles.activityText}>Activities</Text>
            <TouchableOpacity
              onPress={() => {
                setSort(!sort);
              }}
            >
              <Icon
                type="MaterialCommunityIcons "
                name="sort"
                style={styles.activityIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.section}>
            {sort && (
              <View style={styles.sortMenu}>
                <Text>By Date</Text>
                <Text>By Date</Text>
                <Text>By Date</Text>
                <Text>By Date</Text>
                <Text>By Date</Text>
              </View>
            )}
            <View style={styles.recentCard}>
              <Icon
                type="MaterialCommunityIcons "
                name="arrow-top-left-bold-outline"
                style={styles.redTopUpIcon}
              />
              <View style={styles.recentTitle}>
                <Text style={styles.recentTitleText}>
                  Contribution For Feb 2021
                </Text>
                <Text style={{ fontSize: 12 }}>Momo Payment</Text>
              </View>
              <View style={styles.recentAmount}>
                <Text style={styles.recentTitleText2}>+Ghc 50.00</Text>
                <Text style={{ fontSize: 12, alignSelf: "flex-end" }}>
                  10/3/21
                </Text>
              </View>
            </View>
            <View style={styles.recentCard}>
              <Icon
                type="MaterialCommunityIcons "
                name="arrow-top-left-bold-outline"
                style={styles.redTopUpIcon}
              />
              <View style={styles.recentTitle}>
                <Text style={styles.recentTitleText}>
                  Contribution for Jan 2021
                </Text>
                <Text style={{ fontSize: 12 }}>Momo Payment</Text>
              </View>
              <View style={styles.recentAmount}>
                <Text style={styles.recentTitleText2}>+Ghc 50.00</Text>
                <Text style={{ fontSize: 12, alignSelf: "flex-end" }}>
                  10/2/21
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return <Loading />;
  }
}
