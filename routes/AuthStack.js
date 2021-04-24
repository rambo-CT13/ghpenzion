import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Get_Started from "../screens/Get_Started";
import About from "../screens/About";
import AppForm from "../screens/AppForm";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

export default function AuthStack({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Get Started"
      >
        <Stack.Screen name="Get Started" component={Get_Started} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={SignUp} />
        <Stack.Screen name="Application Form" component={AppForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
