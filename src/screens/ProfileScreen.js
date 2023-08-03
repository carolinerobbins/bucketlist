import React, { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Switch, Text, View, Button } from "react-native";
import { useColorScheme } from "nativewind";
import { getAuth, signOut, updateEmail } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { UserContext } from '../utils/UserContext'

const ProfileScreen = ({ navigation }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailChange = (email) => {
    updateEmail(auth.currentUser, "user@example.com")
      .then(() => {
        //change email
      })
      .catch((error) => {
        //catch errors
      });
  };

  useEffect(() => {
    console.log(user)
  },[]);

  return (
    <SafeAreaView className="flex-1 dark:bg-slate-800">
      <View className="items-center justify-center m-4">
        <Text className="text-3xl font-bold dark:text-slate-50">Profile</Text>
      </View>
      <View className="flex-row mb-2 ml-2">
        <Text className="text-lg dark:text-slate-50">Toggle Dark Mode: </Text>
        <Switch
          value={colorScheme === "dark"}
          onChange={toggleColorScheme}
          trackColor={{ true: "#778da9", false: "#e0e1dd" }}
        />
      </View>
      {user && (
        <View className="mb-2 ml-2">
          <Text className="text-lg dark:text-slate-50">
            Name: {user.first} {user.last}
          </Text>
          <Text className="text-lg dark:text-slate-50">
            Email: {user.email}
          </Text>
          <Text className="text-lg dark:text-slate-50">
            Home Airport: {user.iata}
          </Text>
        </View>
      )}
      <Button title="Sign Out" onPress={() => handleSignOut()} />
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  );
};
export default ProfileScreen;
