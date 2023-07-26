import React, {useState, useEffect} from 'react'
import { ScrollView, Text, View, SafeAreaView } from "react-native";
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import ListCard from '../features/ListCard';
import {getNonStop} from '../apis/flights';

const ListScreen = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nonstop, setNonstop] = useState([]);

  const getAdded = async (userId) => {
    try {
      const db = getFirestore();
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      const addedDestinations = userDoc.data().added || [];

      const destinationsRef = collection(db, "destinations");
      const querySnapshot = await getDocs(destinationsRef);

      const destinationsArray = [];
      querySnapshot.forEach((doc) => {
        const destinationData = doc.data();
        if (addedDestinations.includes(doc.id)) {
          destinationsArray.push({
            id: doc.id,
            ...destinationData,
          });
        }
      });
      return destinationsArray;
    } catch (error) {
      console.error("Error fetching destinations:", error);
      return [];
    }
  };

  useEffect(() => {
    getNonStop('SFO')
      .then((data) => {
        setNonstop(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    getAdded('NStFWjztTjbeSivO95euaNBlrdO2')
      .then((destinationsData) => {
        console.log(nonstop);
        const updatedList = destinationsData.map((destination) => ({
          ...destination,
          nonstop: nonstop.includes(destination.iata),
        }));
        console.log(updatedList);
        setList(updatedList);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [nonstop]);

  return (
    <SafeAreaView className="flex-1 items-center dark:bg-slate-800">
      <Text className="text-2xl mb-2 dark:text-slate-50">My BucketList</Text>
      <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      >
      {loading ? (
        <Text>List is loading...</Text>
      ) : (
        list.map((destination) => (
              <ListCard key={destination.id} destination={destination}/>
            )
        ))
      }
      </ScrollView>
    </SafeAreaView>
  );
}
export default ListScreen;