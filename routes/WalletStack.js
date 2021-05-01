import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Wallet from "../screens/Wallet";
import Deposit from "../screens/Deposit";
import Withdraw from "../screens/Withdraw";
const Stack = createStackNavigator();

export default function WalletStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Wallet"
    >
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="Deposit" component={Deposit} />
      <Stack.Screen name="Withdraw" component={Withdraw} />
    </Stack.Navigator>
  );
}
