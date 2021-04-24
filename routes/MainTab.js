import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import Icon from "react-native-vector-icons/FontAwesome5";
import Pension from "../screens/Pension";
import Profile from "../screens/Profile";
import Faq from "../screens/Faq";
import WalletStack from "./WalletStack";

export default function MainTab() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "house-user" : "house-user";
            } else if (route.name === "Pension") {
              iconName = focused ? "piggy-bank" : "piggy-bank";
            } else if (route.name === "Faq") {
              iconName = focused ? "question-circle" : "question-circle";
            } else if (route.name === "Wallet") {
              iconName = focused ? "wallet" : "wallet";
            } else if (route.name === "Profile") {
              iconName = focused ? "user-circle" : "user-circle";
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={24} color={color} />;
          },
        })}
        tabBarOptions={{
          lazy: true,
          scrollEnabled: true,
          inactiveTintColor: "#888",
          activeTintColor: "#dd4400",
          // activeBackgroundColor: "null",
          inactiveBackgroundColor: "",
          labelPosition: "below-icon",
          labelStyle: {
            fontSize: 11,
            marginBottom: 4,
            color: "#444",
          },
          style: {
            borderTopWidth: 0.3,
            borderTopColor: "#dd4400",
            backgroundColor: "#fff",
            paddingVertical: 5,
            height: 52,
          },
          swipeEnabled: true,
          animationEnabled: true,
        }}
        initialRouteName="Pension"
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Wallet" component={WalletStack} />
        <Tab.Screen name="Pension" component={Pension} />
        <Tab.Screen name="Faq" component={Faq} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
