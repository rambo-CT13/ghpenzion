import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { enableScreens } from "react-native-screens";
import Loading from "./components/Loading";
import { styles } from "./components/Styles";
import AuthStack from "./routes/AuthStack";
import MainTab from "./routes/MainTab";
import {
  AuthContext,
  ProfileContext,
  TransactionContext,
} from "./services/ContextProvider";
import { auth, db } from "./services/Firebase";
enableScreens();

export default function App() {
  const [user, setUser] = useState({});
  const [initializing, setInitializing] = useState(true);
  const [loaded, setloaded] = useState(false);
  const [profile, setProfile] = useState({});
  const [transactions, setTransactions] = useState({});

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    if (initializing) setInitializing(false);
    setUser(user);
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    db.collection("Transactions")
      .orderBy("time", "desc")
      .onSnapshot(function (querySnapshot) {
        const posts = [];
        querySnapshot.forEach(function (doc) {
          const post = doc.data();
          post.id = doc.id;
          posts.push(post);
        });
        setTransactions(posts);
      });
    (error) => {
      alert(error);
    };
  }, []);

  useEffect(() => {
    db.collection("users")
      .doc(user?.uid)
      .onSnapshot((doc) => {
        setProfile(doc.data());
        setloaded(true);
      });
  }, [user]);

  if (initializing) return <Loading />;
  if (user) {
    return (
      <ProfileContext.Provider value={profile}>
        <AuthContext.Provider value={user}>
          {loaded ? (
            <View style={[styles.container]}>
              <TransactionContext.Provider value={transactions}>
                <MainTab />
              </TransactionContext.Provider>
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
