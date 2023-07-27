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
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ navigation }) => {
  const [mapRegion, setmapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  // const [added, setAdded] = useState([]);
  // const [visited, setVisited] = useState([]);
  // const db = getFirestore();

  // const getMarkers = async (userId) => {
  //   try {
  //     const userRef = doc(db, "users", userId);
  //     const userDoc = await getDoc(userRef);

  //     const addedDestinations = userDoc.data().added || [];
  //     const visitedDestinations = userDoc.data().visited || [];

  //     return [addedDestinations, visitedDestinations];
  //   } catch (error) {
  //     console.error("Error fetching destinations:", error);
  //     return [];
  //   }
  // };

  // useEffect(() => {
  //   getMarkers("NStFWjztTjbeSivO95euaNBlrdO2")
  //     .then((data) => {
  //       setAdded(data[0]);
  //       setVisited(data[1]);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);

  return (
      <SafeAreaView className="flex-1">
        <Text>This is the map view.</Text>
      <MapView
        style={{ alignSelf: 'stretch', height: '70%' }}
        region={mapRegion}
      />
    </SafeAreaView>
  );
};
export default MapScreen;
