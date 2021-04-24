import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { enableScreens } from "react-native-screens";
import Loading from "./components/Loading";
import { styles } from "./components/Styles";
import AuthStack from "./routes/AuthStack";
import MainTab from "./routes/MainTab";
import { AuthContext, ProfileContext } from "./services/ContextProvider";
import { auth, db } from "./services/Firebase";
enableScreens();

export default function App() {
  const [user, setUser] = useState({});
  const [initializing, setInitializing] = useState(true);
  const usersRef = db.collection("users");
  const [loaded, setloaded] = useState(true);

  const [profile, setProfile] = useState({});
  const unique = user && user.uid;

  function asyncCall() {
    const result = usersRef.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const id = doc.data().id;
        if (id === unique) {
          setProfile(doc.data());
          setloaded(true);
        }
      });
    });
  }

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    if (initializing) setInitializing(false);
    setUser(user, [asyncCall()]);
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  console.log(profile);
  if (initializing) return null;
  if (user) {
    return (
      <ProfileContext.Provider value={profile}>
        <AuthContext.Provider value={user}>
          {loaded ? (
            <View style={[styles.container]}>
              <MainTab />
              <StatusBar style="light" />
            </View>
          ) : (
            <Loading />
          )}
        </AuthContext.Provider>
      </ProfileContext.Provider>
    );
  } else {
    return <AuthStack />;
  }
}
