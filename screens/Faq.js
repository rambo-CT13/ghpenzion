import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import RoundShape from "../components/RoundShape";
import { styles } from "../components/Styles";

export default function Faq() {
  const [question1, setquestion1] = useState(false);
  const [question2, setquestion2] = useState(false);
  const [question3, setquestion3] = useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <RoundShape shapeColor="#fff" />
        <Text style={[styles.loginHead]}>Faq</Text>
        <View style={styles.sectionP20}>
          <View style={styles.faqView}>
            <Text style={styles.faqHead}>How to top up your Wallet?</Text>
            <Text style={styles.faqExcerpt}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            {question1 && (
              <Text style={styles.faqMore}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Est
                ullamcorper eget nulla facilisi etiam dignissim diam.{" "}
              </Text>
            )}
            <TouchableOpacity
              onPress={() => {
                setquestion1(!question1);
              }}
            >
              <Text style={styles.faqBtn}>
                {question1 ? "View Less" : "View More"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.faqView}>
            <Text style={styles.faqHead}>How to request Withdrawal?</Text>
            <Text style={styles.faqExcerpt}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            {question2 && (
              <Text style={styles.faqMore}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Est
                ullamcorper eget nulla facilisi etiam dignissim diam.{" "}
              </Text>
            )}
            <TouchableOpacity
              onPress={() => {
                setquestion2(!question2);
              }}
            >
              <Text style={styles.faqBtn}>
                {question2 ? "View Less" : "View More"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.faqView}>
            <Text style={styles.faqHead}>How to Contact Support?</Text>
            <Text style={styles.faqExcerpt}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            {question3 && (
              <Text style={styles.faqMore}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Est
                ullamcorper eget nulla facilisi etiam dignissim diam.{" "}
              </Text>
            )}
            <TouchableOpacity
              onPress={() => {
                setquestion3(!question3);
              }}
            >
              <Text style={styles.faqBtn}>
                {question3 ? "View Less" : "View More"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
