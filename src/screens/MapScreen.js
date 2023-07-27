import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, StatusBar } from "react-native";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  arrayUnion,
  updateDoc,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const MapScreen = ({ navigation }) => {
  const [added, setAdded] = useState([]);
  const [visited, setVisited] = useState([]);
  const db = getFirestore();

  const getMarkers = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      const addedDestinations = userDoc.data().added || [];
      const visitedDestinations = userDoc.data().visited || [];

      const destinationsRef = collection(db, "destinations");

      const addedQuery = query(
        destinationsRef,
        where("__name__", "in", addedDestinations)
      );

      const addedSnapshot = await getDocs(addedQuery);
      const addedMarkers = addedSnapshot.docs.map((doc) => doc.data());

      const visitedQuery = query(
        destinationsRef,
        where("__name__", "in", visitedDestinations)
      );
      const visitedSnapshot = await getDocs(visitedQuery);
      const visitedMarkers = visitedSnapshot.docs.map((doc) => doc.data());

      return [addedMarkers, visitedMarkers];
    } catch (error) {
      console.error("Error fetching destinations:", error);
      return [];
    }
  };

  useEffect(() => {
    getMarkers("NStFWjztTjbeSivO95euaNBlrdO2")
      .then((data) => {
        setAdded(data[0]);
        setVisited(data[1]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <SafeAreaView className="flex-1 justify-center  dark:bg-slate-800">
      <View className='items-center'>
      <Text className="text-3xl font-bold mb-2 dark:text-slate-50">My BucketList</Text>
      <Text className="text-md dark:text-slate-50">Green: I've been here! </Text>
      <Text className="text-md dark:text-slate-50">Blue: I want to go here!</Text>
      </View>
      <MapView
        style={{ flex: 1, height: '80%', margin: 10 }}
        initialRegion={{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 180,
          longitudeDelta: 180,
        }}
        provider={PROVIDER_GOOGLE}
      >
        {added.map((destination) => (
          <Marker
            key={destination.name}
            coordinate={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
            pinColor={"blue"}
          />
        ))}
        {visited.map((destination) => (
          <Marker
            key={destination.name}
            coordinate={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
            pinColor={"green"}
          />
        ))}
      </MapView>
    </SafeAreaView>
  );
};
export default MapScreen;
