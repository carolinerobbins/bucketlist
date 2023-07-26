import React, {useState, useEffect} from 'react'
import {  SafeAreaView, Text, View, StatusBar } from "react-native";
import { getFirestore, collection, getDocs, getDoc, doc, arrayUnion, updateDoc, setDoc, query, where } from "firebase/firestore";

const MapScreen = ({navigation}) => {
  const [added, setAdded] = useState([]);
  const [visited, setVisited] = useState([]);
  const db = getFirestore();

  const getMarkers = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      const addedDestinations = userDoc.data().added || [];
      const visitedDestinations = userDoc.data().visited || [];

      return [addedDestinations, visitedDestinations];
    } catch (error) {
      console.error("Error fetching destinations:", error);
      return [];
    }
  };

  useEffect(() => {
    getMarkers('NStFWjztTjbeSivO95euaNBlrdO2')
      .then((data) => {
        setAdded(data[0]);
        setVisited(data[1]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
    <SafeAreaView className="flex-1 items-center dark:bg-slate-800">
    <Text className = "text-lg dark:text-slate-50">This is the map screen</Text>
    </SafeAreaView>
    </>
  );
};
export default MapScreen;